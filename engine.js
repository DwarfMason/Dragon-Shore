//TODO: вынести Scene, SceneObject и State в отдельный файл
//TODO: всё, что связано с текстурами и тайлами -- тоже

let game = null;//new GameState();
let menu = null;
let credits = null;
let leaderboards = null; //TODO
let settings = null; //TODO
let gameOver = null;//new GameOverState();

function getAsset(fileName) {
    const ASSETS_PATH = "assets/";
    return ASSETS_PATH + fileName;
}

class Scene {
    constructor(canvas) {               // разве scene != canvas ?
        //this.canvas = canvas;         //Юра, и зачем ты это пишешь если не используем
        this.ctx = canvas.getContext("2d");
        this.state = null;
        this.eventList = {}
    }
    setState(state) {
        //remove old handlers
        for (let oldEvent in this.eventList) {
            console.log("Remove old handlers", oldEvent, this.eventList[oldEvent]);
            if (this.eventList.hasOwnProperty(oldEvent) && this.eventList[oldEvent] !== null) {
                window.removeEventListener(oldEvent, this.eventList[oldEvent]);
            }
        }
        this.eventList = {};
        //and set new
        this.state = state;
        let events = this.state.events;
        for (let event in events) {
            console.log("Add new handlers", event, events[event]);
            if (events.hasOwnProperty(event) && events[event] !== null) {
                this.eventList[event] = e => {
                    events[event].call(this.state, this, e);
                };
                window.addEventListener(event, this.eventList[event]);
            }
        }
    }
    getState() {
        return this.state;
    }
    update() {
        this.state.update(this.ctx);
    }
}

class State {
    constructor(){}
    get events() {
        return {};
    }
    update(context){

    }
}

class CreditsState extends State {
    constructor() {
        super();
    }
    keyHandler(scene, event) {
        scene.setState(menu );
        scene.update();
    }
    get events() {
        return {
            keyup: this.keyHandler,
        }
    }
    update(context){
        context.clearRect(0, 0, 960, 600);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Credits", 470, 40);
        context.font = "36px manaspc";
        context.fillText("Press any key to continue...", 470, 580);

        context.textAlign = "left";
        context.font = "24px manaspc";

        context.fillText("Made by:", 10, 65);
        context.fillText("Balashenko Igor (DwarfMason)", 10, 100);
        context.fillText("Yury Kurlykov (t1meshift)", 10, 130);
        context.fillText("Andrey Osadchii (smgks)", 10, 160);
        super.update(context);
    }
}

class MenuState extends State {
    constructor() {
        super();
        this.menuPos = 0;
        this.menuImgs = [];
        this.menuStates = [game, leaderboards, settings, credits];
        for (let i = 0; i < 4; ++i) {
            let imgPath = getAsset(`menu${i}.png`);
            let image = new Image();
            image.src = imgPath;
            this.menuImgs.push(image);
        }
    }
    keyHandler(scene, event) {
        switch(event.keyCode) {
            case 38: //arrow up
                this.menuPos--;
                break;
            case 40: //arrow down
                this.menuPos++;
                break;
            case 13:
                if (this.menuStates[this.menuPos] !== null) {

                    switch (this.menuPos){
                        case 0:
                            scene.setState(game);
                            game.pushMessage("game started");
                            break;
                        case 1:
                            alert("Not yet implemented!");
                            break;
                        case 2:
                            alert("Not yet implemented!");
                            break;
                        case 3:
                            scene.setState(credits);
                            break;
                    }
                } else {
                    alert("Not yet implemented!");
                }
                break;

        }
        scene.update();
    }
    get events() {
        return {
            keyup: this.keyHandler,
        }
    }
    update(context){
        context.fillStyle = "black";
        context.fillRect(0, 0, 1000, 650);

        console.log("menuPos", this.menuPos);
        if (this.menuPos < 0)
            this.menuPos = 3;
        if (this.menuPos > 3)
            this.menuPos = 0;
        console.log("menuPos", this.menuPos);
        context.drawImage(this.menuImgs[this.menuPos], 0, 0);
        super.update(context);
    }
}

class RMenu{                                                            //right menu
    constructor(baffsList){
        this.name = mainHero.name;
        this.HPmax = mainHero.maxHP;
        this.HPcurrent = mainHero.hp;
        this.MPmax = mainHero.maxMP;
        this.MPcurrent = mainHero.mp;
        this.baffs = baffsList;             //array
    }
}

class GameState extends State {
    constructor(ctx, rMenu, dialog = 0) {
        super();
        this.offsetX = 0;
        this.offsetY = 0;
        this.ctx = ctx;
        this.messages = this.messages = ["","","","","","","","",""];
        this.map = dungeonGeneration.generateCave();
        this.rMenu = rMenu;
    }
    setPlayerStatstoRMenu(rMenu){
        this.rMenu = rMenu;
    }
    SetNewMap(){
        this.map = dungeonGeneration.generateCave();
    }
    pushMessage(text){
        this.messages[7] = this.messages[6];
        this.messages[6] = this.messages[5];
        this.messages[5] = this.messages[4];
        this.messages[4] = this.messages[3];
        this.messages[3] = this.messages[2];
        this.messages[2] = this.messages[1];
        this.messages[1] = this.messages[0];

        this.messages[0] = text;
        this.update();
        //alert(this.messages);
    }
    drowRMenu(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 1000, 650);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(805,5,190,475);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(807,7,186,471);

        this.ctx.fillStyle = "white";
        this.ctx.font  = "24px manaspc";
        this.ctx.fillText(this.rMenu.name, 815, 35);
        this.ctx.fillText("HP:" + this.rMenu.HPcurrent + '/' + this.rMenu.HPmax ,820,70);
        this.ctx.fillText("MP:" + this.rMenu.MPcurrent + '/' + this.rMenu.MPmax ,820,100);
        this.ctx.font  = "12px manaspc";
        this.ctx.fillText("-status:", 820, 120);
        for (let i = 0; i < this.rMenu.baffs.length; ++i) {
            this.ctx.fillText(this.rMenu.baffs[i], 820, 140 + (+20 * +i));
        }

    }
    drowDMenu(){
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(5,485,990,160);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(7,487,986,156);

        this.ctx.fillStyle = "white";
        this.ctx.font  = "18px manaspc";

        this.ctx.fillText(this.messages[0],10,505);      //0
        this.ctx.fillText(this.messages[1],10,525-1);      //1
        this.ctx.fillText(this.messages[2],10,545-2);      //2
        this.ctx.fillText(this.messages[3],10,565-3);      //3
        this.ctx.fillText(this.messages[4],10,585-4);      //4
        this.ctx.fillText(this.messages[5],10,605-5);      //5
        this.ctx.fillText(this.messages[6],10,625-5);      //6
        this.ctx.fillText(this.messages[7],10,645-7);      //7

    }

    clearScene() {
        //this.ctx.fillStyle = "black";
        this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    }

    updateMap(){
        for (let y = 0; y < this.map.length;++y){
            for (let x = 0; x < this.map[y].length;++x) {

                this.ctx.imageSmoothingEnabled= false;

                let ts = this.map[y][x].tileSet;
                this.ctx.drawImage(ts.image, ts.getTilePos(this.map[y][x].id), 0, +ts.tileSize, +ts.tileSize,
                    x * +   this.map[y][x].size, y * +this.map[y][x].size, +this.map[y][x].size, +this.map[y][x].size);

            }
        }
        //alert(this.map);
    }

    update(){
        this.clearScene();

        this.drowRMenu();
        this.drowDMenu();
        this.updateMap();
    }
}


credits = new CreditsState();
game = new GameState(document.getElementById("gameBoard").getContext("2d"), new RMenu(["in pain","blindness","fear"]));
menu = new MenuState();

let canvas = document.getElementById("gameBoard");
let scene = new Scene(canvas);



scene.setState(menu);
scene.update();
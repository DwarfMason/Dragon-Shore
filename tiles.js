//TODO: вынести Scene, SceneObject и State в отдельный файл
//TODO: всё, что связано с текстурами и тайлами -- тоже

let mainMenu = null;
let game = null;//new GameState();
let leaderboards = null; //TODO
let settings = null; //TODO
let credits = null;//new CreditsState();
let gameOver = null;//new GameOverState();

function getAsset(fileName) {
    const ASSETS_PATH = "assets/";
    return ASSETS_PATH + fileName;
}

class TileSet {
    constructor(tilesetPath, tileSize) {
        this.path = tilesetPath;
        this.tileSize = tileSize;
        this.image = new Image();
        this.image.src = this.path;
    }
    getTilePos(tileId) {
        return tileId*this.tileSize;
    }

}

class Texture {
    constructor(tileSet, tileId, textureSize){
        this.tileSet = tileSet;
        this.id = tileId;
        this.size = textureSize;
    }
    draw(x, y, context) {
        let ts = this.tileSet;
        context.drawImage(ts.image, ts.getTilePos(this.id), 0, ts.tileSize, ts.tileSize,
            x*this.size, y*this.size, this.size, this.size);
    }
}

class SceneObject {
    constructor(texture, x, y) {
        this.texture = texture;
        this.x = x;
        this.y = y;
    }
    draw(context) {
        this.texture.draw(this.x, this.y, context);
    }
}

class Scene {
    constructor(canvas) {
        this.canvas = canvas;
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
                    scene.setState(this.menuStates[this.menuPos]);
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
class GameState extends State {
    constructor(startMenu, dialog = 0) {
        super();
    }
    clearScene(context) {
        context.clearRect(0, 0, context.width, context.height);
        context.fillStyle = "black";
        context.fillRect(0, 0, 1000, 650);
        context.fillStyle = 'white';
        context.fillRect(805,5,190,475);
        context.fillStyle = "black";
        context.fillRect(807,7,186,471);

        context.fillStyle = 'white';
        context.fillRect(5,485,990,160);
        context.fillStyle = "black";
        context.fillRect(7,487,986,156);
    }
}
class CreditsState extends State {
    constructor() {
        super();
    }
    keyHandler(scene, event) {
        scene.setState(mainMenu);
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

game = new GameState(null);
credits = new CreditsState();
mainMenu = new MenuState();

let canvas = document.getElementById("gameBoard");
let scene = new Scene(canvas);
scene.setState(mainMenu);
scene.update();

/*
class EMain {
    constructor(startMenu, dialog = 0){
        this.scene = document.getElementById("gameWindow").getContext('2d');

        this.clearScene();

        this.messages = ["","","","","","","","",""];
        this.lastarr = [];
        this.lastsizeX = 0;
        this.lastsizeY = 0;
        this.playerStruct = new RightMenu("Veto",17,15,40,2,["in pain","blindness","fear"]);
        this.drawMenu(startMenu);
    }

    clearScene() {
        this.scene.clearRect(0, 0, this.scene.width, this.scene.height);
        this.scene.fillStyle = "black";
        this.scene.fillRect(0, 0, 1000, 650);
        this.scene.fillStyle = 'white';
        this.scene.fillRect(805,5,190,475);
        this.scene.fillStyle = "black";
        this.scene.fillRect(807,7,186,471);

        this.scene.fillStyle = 'white';
        this.scene.fillRect(5,485,990,160);
        this.scene.fillStyle = "black";
        this.scene.fillRect(7,487,986,156);
    }

    //use this
    drawMenu(menuLayout) {
        this.clearScene();
        this.scene.drawImage(menuLayout.texture, 0, 0);
    }

    //use this
    updateMapPoints(arr, sizeX = 50, sizeY =30) {
        this.lastarr = arr;
        this.lastsizeX = sizeX;
        this.lastsizeY = sizeY;

        this.clearScene();
        for (let i = 0;i < sizeY; ++i){
            for (let j = 0; j <sizeX; ++j) {
                //let menu = new Texture("testpng.png",60,60);
                arr[i][j].draw(this.scene);
                this.scene.drawImage(arr[i][j].texture, arr[i][j].x*16, arr[i][j].y*16);
            }
        }

        this.updateRMenu();
        this.updateDMenu();
    }

    update(){
        this.updateMapPoints(this.lastarr,this.lastsizeX,this.lastsizeY);
    }
    //use this
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
    }

    updateRMenu(){
        this.scene.fillStyle = "white";
        this.scene.font  = "24px manaspc";
        this.scene.fillText(this.playerStruct.name, 815, 35);
        this.scene.fillText(this.playerStruct.HPcurrent + '/' + this.playerStruct.HPmax ,820,70);
        this.scene.fillText(this.playerStruct.MPcurrent + '/' + this.playerStruct.MPmax ,820,100);
        //this.scene.fillText("MP:15/17",820,100);
        this.scene.font  = "12px manaspc";
        let arr=["pidor","chlen vo rtu","kabluk v zjope", "yura pidor" , "voya mamka"];
        for (let i = 0; i < this.playerStruct.buffs.length; ++i) {
            this.scene.fillText(this.playerStruct.buffs[i], 820, 120 + (+20 * +i));
        }
    }

    //use this
    changePLayerStruct(struct){
        this.playerStruct = struct;
        this.updateRMenu();
        this.update();
    }

    updateDMenu(){          //down menu
        this.scene.fillText(this.messages[0],10,505);      //0
        this.scene.fillText(this.messages[1],10,525);      //1
        this.scene.fillText(this.messages[2],10,545);      //2
        this.scene.fillText(this.messages[3],10,565);      //3
        this.scene.fillText(this.messages[4],10,585);      //4
        this.scene.fillText(this.messages[5],10,605);      //5
        this.scene.fillText(this.messages[6],10,625);      //6
        this.scene.fillText(this.messages[7],10,645);      //7
        this.scene.fillStyle = "white";
        this.scene.font  = "18px manaspc";
    }

}

class RightMenu {
    constructor(name, HPmax, HPcurrent, MPmax, MPcurrent, buffsList){
        this.name = name;
        this.HPmax = HPmax;
        this.HPcurrent = HPcurrent;
        this.MPmax = MPmax;
        this.MPcurrent = MPcurrent;
        this.buffs = buffsList;
    }
}

let menu = new Texture("testpng.png",60,60);
let main = new EMain(menu);

var garr = [];
for (let i=0; i <30; ++i) {
    let temparr = [];
    for(let j=0; j <50; ++j){
        let temp = new SceneObject("testpng.png",j,i);
        temparr.push(temp);
    }
    garr.push(temparr);
}

main.updateMapPoints(garr);

main.pushMessage("ti umer raz");
main.pushMessage("ti umer dwa");
main.pushMessage("ti umer tri");
main.changePLayerStruct(new RightMenu("Veto",20,17,40,6,["in pain","blindness","fear"]));
*/
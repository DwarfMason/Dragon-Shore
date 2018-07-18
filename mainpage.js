class MainTexture{
    constructor(imageURL, w, h){
        this.texture = new Image();
        this.texture.src = imageURL;
        this.w = w;
        this.h = h;
    }
}

class SObject extends MainTexture{  //SceneObject
    constructor(imageURL,x,y){
        super(imageURL,16, 16);
        this.posX = x;
        this.posY = y;
    }

}

class STerrain extends SObject{
    constructor(imageURL,x,y, isMovable){
        super(imageURL, x, y);
        this.isMovable = isMovable;
    }
}

class RMenu{                                                            //rigth menu
    constructor(name, HPmax, HPcurrent, MPmax, MPcurrent, baffsList){
        this.name = name;
        this.HPmax = HPmax;
        this.HPcurrent = HPcurrent;
        this.MPmax = MPmax;
        this.MPcurrent = MPcurrent;
        this.baffs = baffsList;             //array
    }
}

function getMap() {
    let dungeonHeight = 30;
    let dungeonWidth = 50;

    let map = new Array(dungeonHeight);
    for (let i = 0; i < dungeonHeight; i++) {
        map[i] = new Array(dungeonWidth);
    }

    for (let i = 0; i < dungeonHeight; i++)
        for (let j = 0; j < dungeonWidth; j++)
            map[i][j] = '*';

    let startX = Math.floor(Math.random() * (dungeonWidth-2))+1;
    let startY = Math.floor(Math.random() * (dungeonHeight-2))+1;
    let exitX = 0;
    let exitY = 0;
    let maxFloorTiles = dungeonHeight*dungeonWidth / 10;
    let floorTilesCount = 0;

    map[startY][startX] = '<';


    for (let i = 0; i < 4; i++) {
        let currentX = startX;
        let currentY = startY;
        floorTilesCount = 0;
        while (floorTilesCount < maxFloorTiles) {

            let direction = Math.floor(Math.random() * 4);

            switch (direction) {
                case 0:
                    if (currentX - 2 >= 0) {
                        currentX--;
                        if (map[currentY][currentX] != '.' && map[currentY][currentX] != '<') {
                            map[currentY][currentX] = '.';
                            floorTilesCount++;
                        }
                    }
                    break;
                case 1:
                    if (currentX + 2 < dungeonWidth) {
                        currentX++;
                        if (map[currentY][currentX] != '.' && map[currentY][currentX] != '<') {
                            map[currentY][currentX] = '.';
                            floorTilesCount++;
                        }
                    }
                    break;
                case 2:
                    if (currentY - 2 >= 0) {
                        currentY--;
                        if (map[currentY][currentX] != '.' && map[currentY][currentX] != '<') {
                            map[currentY][currentX] = '.';
                            floorTilesCount++;
                        }
                    }
                    break;
                case 3:
                    if (currentY + 2 < dungeonHeight) {
                        currentY++;
                        if (map[currentY][currentX] != '.' && map[currentY][currentX] != '<') {
                            map[currentY][currentX] = '.';
                            floorTilesCount++;
                        }
                    }
                    break;
            }
        }
        if (i === 3){
            exitX = currentX;
            exitY = currentY;
        }
    }


    map[exitY][exitX] = '>';
    return map;
}

class EMain{    //Engine

    constructor(startMenu, dialog = 0){
        this.scene = document.getElementById("gameWindow").getContext('2d');

        this.clearScene();

        this.messages = ["","","","","","","","",""];
        this.lastarr = [];
        this.lastsizeX = 0;
        this.lastsizeY = 0;
        this.playerStruct = new RMenu("Veto",17,15,40,2,["in pain","blindness","fear"]);
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
    updateMapPoints(map, sizeX = 50, sizeY =30) {
        this.lastarr = map;
        this.lastsizeX = sizeX;
        this.lastsizeY = sizeY;

        this.clearScene();

        const FONT_SIZE = 8;
        const CELL_SIZE = 16;

        function getCharX(charCode) {
            return charCode * FONT_SIZE;
        }

        let ctx = this.scene;
        ctx.imageSmoothingEnabled= false;
        let tiles = new Image();
        tiles.addEventListener('load', function () {
            console.log(tiles, ctx);
            map.forEach((a, y) => {
                let z = "";
                a.forEach((b, x) => {
                    z += b;
                    switch (b) {
                        case '*':
                            ctx.drawImage(tiles, getCharX(42), 0, FONT_SIZE, FONT_SIZE,
                                x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                            break;
                        case '<':
                            ctx.drawImage(tiles, getCharX(60), 0, FONT_SIZE, FONT_SIZE,
                                x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                            break;
                        case '.':
                            ctx.drawImage(tiles, getCharX(46), 0, FONT_SIZE, FONT_SIZE,
                                x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                            break;
                        case '>':
                            ctx.drawImage(tiles, getCharX(62), 0, FONT_SIZE, FONT_SIZE,
                                x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                            break;
                    }
                });
                console.log(z);
            });
        }, false);

        tiles.src = "assets/tileset.png";

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
        this.scene.font  = "12px manaspc";
        for (let i = 0; i < this.playerStruct.baffs.length; ++i) {
            this.scene.fillText(this.playerStruct.baffs[i], 820, 120 + (+20 * +i));
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


let menu = new MainTexture("assets/menu0.png",60,60);
let main = new EMain(menu);

main.updateMapPoints(getMap());

main.pushMessage("ti umer raz");
main.pushMessage("ti umer dwa");
main.pushMessage("ti umer tri");
main.changePLayerStruct(new RMenu("Veto",20,17,40,6,["in pain","blindness","fear"]));
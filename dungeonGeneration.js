let dungeonHeight = 28;
let dungeonWidth = 48;

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

document.body.onload = function() {
	// draw field
    const FONT_SIZE = 8;
    const CELL_SIZE = 16;

    function getCharX(charCode) {
        return charCode * FONT_SIZE;
    }

    let canvas = document.getElementById("gameBoard");
    let ctx = canvas.getContext("2d");
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
}








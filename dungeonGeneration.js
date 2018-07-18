let dungeonSize = 19;

let map = new Array(dungeonSize);
for (let i = 0; i < dungeonSize; i++) {
    map[i] = [];
}

for (let i = 0; i < dungeonSize; i++)
    for (let j = 0; j < dungeonSize; j++)
        map[i][j] = '*';

let currentStartX = Math.floor(Math.random() * (dungeonSize-1))+1;
let currentStartY = Math.floor(Math.random() * (dungeonSize-1))+1;
let maxFloorTiles = dungeonSize**2/10;
let floorTilesCount = 0;

map[currentStartX][currentStartY] = '>';


for (let i = 0; i < 4; i++) {
    let currentX = currentStartX;
    let currentY = currentStartY;
    floorTilesCount = 0;
    while (floorTilesCount < maxFloorTiles) {

        let direction = Math.floor(Math.random() * 4);

        switch (direction) {
            case 0:
                if (currentX - 2 >= 0) {
                    currentX--;
                    if (map[currentX][currentY] != '.' && map[currentX][currentY] != '>') {
                        map[currentX][currentY] = '.';
                        floorTilesCount++;
                    }
                }
                break;
            case 1:
                if (currentX + 2 < dungeonSize) {
                    currentX++;
                    if (map[currentX][currentY] != '.' && map[currentX][currentY] != '>') {
                        map[currentX][currentY] = '.';
                        floorTilesCount++;
                    }
                }
                break;
            case 2:
                if (currentY - 2 >= 0) {
                    currentY--;
                    if (map[currentX][currentY] != '.' && map[currentX][currentY] != '>') {
                        map[currentX][currentY] = '.';
                        floorTilesCount++;
                    }
                }
                break;
            case 3:
                if (currentY + 2 < dungeonSize) {
                    currentY++;
                    if (map[currentX][currentY] != '.' && map[currentX][currentY] != '>') {
                        map[currentX][currentY] = '.';
                        floorTilesCount++;
                    }
                }
                break;
        }
    }
}
document.body.onload = function() {
	// draw field
    const FONT_SIZE = 8;
    const CELL_SIZE = 24;

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
                if (b === '*') {
                    ctx.drawImage(tiles, getCharX(42), 0, FONT_SIZE, FONT_SIZE,
                        x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
                } else if (b === '>') {
                    ctx.drawImage(tiles, getCharX(62), 0, FONT_SIZE, FONT_SIZE,
                        x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
                } else {
                    ctx.drawImage(tiles, getCharX(46), 0, FONT_SIZE, FONT_SIZE,
                        x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            });
            console.log(z);
        });
    }, false);

    tiles.src = "assets/tileset.png";
}








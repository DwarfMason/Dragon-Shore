let dungeonSize = 15;

let map = new Array(dungeonSize);
for (let i = 0; i < dungeonSize; i++) {
    map[i] = [];
}

for (let i = 0; i < dungeonSize; i++)
    for (let j = 0; j < dungeonSize; j++)
        map[i][j] = '*';

let currentStartX = Math.floor(Math.random() * dungeonSize);
let currentStartY = Math.floor(Math.random() * dungeonSize);
let maxFloorTiles = dungeonSize**2/16;
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
                if (currentX - 1 >= 0) {
                    currentX--;
                    if (map[currentX][currentY] != '.' && map[currentX][currentY] != '>') {
                        map[currentX][currentY] = '.';
                        floorTilesCount++;
                    }
                }
                break;
            case 1:
                if (currentX + 1 < dungeonSize) {
                    currentX++;
                    if (map[currentX][currentY] != '.' && map[currentX][currentY] != '>') {
                        map[currentX][currentY] = '.';
                        floorTilesCount++;
                    }
                }
                break;
            case 2:
                if (currentY - 1 >= 0) {
                    currentY--;
                    if (map[currentX][currentY] != '.' && map[currentX][currentY] != '>') {
                        map[currentX][currentY] = '.';
                        floorTilesCount++;
                    }
                }
                break;
            case 3:
                if (currentY + 1 < dungeonSize) {
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
    let canvas = document.getElementById("gameBoard");
    let ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled= false;
    let tiles = new Image();
    tiles.addEventListener('load', function () {
        console.log(tiles, ctx);
        map.forEach((a, i) => {
            let x = "";
            a.forEach((b, j) => {
                x += b;
                if (b === '*') {
                    ctx.drawImage(tiles, 42 * 8, 0, 8, 8, 20 + j * 32, 20 + i * 32, 32, 32);
                } else if (b === '>') {
                    ctx.drawImage(tiles, 62*8, 0, 8, 8, 20 + j * 32, 20 + i * 32, 32, 32);
                } else {
                    ctx.drawImage(tiles, 46*8, 0, 8, 8, 20 + j * 32, 20 + i * 32, 32, 32);
                }
            });
            console.log(x);
        });
    }, false);

    tiles.src = "assets/tileset.png";
}








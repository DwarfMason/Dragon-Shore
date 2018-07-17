let dungeonSize = 15;


var map = new Array(dungeonSize);
for (let i = 0; i < dungeonSize; i++) {
    map[i] = [];
}

for (let i = 0; i < dungeonSize; i++)
    for (let j = 0; j < dungeonSize; j++)
        map[i][j] = '*';

let currentStartX = Math.floor(Math.random() * dungeonSize);
let currentStartY = Math.floor(Math.random() * dungeonSize);
let maxFloorTiles = dungeonSize * dungeonSize / 16;
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

map.forEach(a => console.log(a));









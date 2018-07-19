dungeonGeneration = (()=>{
    function generateCave() {
        let dungeonHeight = 30;
        let dungeonWidth = 50;

        let start = new StartPoint();
        let end = new EndPoint();
        let wall = new Wall();
        let floor = new Floor();


        let map = new Array(dungeonHeight);
        for (let i = 0; i < dungeonHeight; i++) {
            map[i] = new Array(dungeonWidth);
        }

        for (let i = 0; i < dungeonHeight; i++)
            for (let j = 0; j < dungeonWidth; j++)
                map[i][j] = wall;

        let startX = Math.floor(Math.random() * (dungeonWidth-2))+1;
        let startY = Math.floor(Math.random() * (dungeonHeight-2))+1;
        let exitX = 0;
        let exitY = 0;
        let maxFloorTiles = dungeonHeight*dungeonWidth / 10;
        let floorTilesCount = 0;

        map[startY][startX] = start;


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
                            if (map[currentY][currentX] != floor && map[currentY][currentX] != start) {
                                map[currentY][currentX] = floor;
                                floorTilesCount++;
                            }
                        }
                        break;
                    case 1:
                        if (currentX + 2 < dungeonWidth) {
                            currentX++;
                            if (map[currentY][currentX] != floor && map[currentY][currentX] != start) {
                                map[currentY][currentX] = floor;
                                floorTilesCount++;
                            }
                        }
                        break;
                    case 2:
                        if (currentY - 2 >= 0) {
                            currentY--;
                            if (map[currentY][currentX] != floor && map[currentY][currentX] != start) {
                                map[currentY][currentX] = floor;
                                floorTilesCount++;
                            }
                        }
                        break;
                    case 3:
                        if (currentY + 2 < dungeonHeight) {
                            currentY++;
                            if (map[currentY][currentX] != floor && map[currentY][currentX] != start) {
                                map[currentY][currentX] = floor;
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

        map[exitY][exitX] = end;
        return map;
    }
    function generateObjects() {
        //first object is personage
        return [new TestMob(5,5)];
    }
    return {
        generateCave: generateCave,
        generateObjects: generateObjects
    }
})();

let start = new StartPoint();
let end = new EndPoint();
let wall = new Wall();
let floor = new Floor();
let dungeonHeight = 30;
let dungeonWidth = 50;

    dungeonGeneration = (()=>{
    let objects = [];
    function generateCave(dungeonDifficulty) {
        objects = [mainHero];
        dungeonHeight = Math.floor((1+Math.random())*dungeonHeight);
        dungeonWidth = Math.floor((1+Math.random())*dungeonWidth);
        console.log(dungeonHeight, dungeonWidth);




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

        function addEnemy(count){
            let enemyCount = 0;
            while (enemyCount < count){
                let tryX = Math.floor(Math.random() * (dungeonWidth - 2))+1;
                let tryY = Math.floor(Math.random() * (dungeonHeight - 2))+1;
                if (map[tryY][tryX] === floor){
                    let mobNum = Math.floor(Math.random()*2+1);
                    switch (mobNum){
                        case 0: objects.push(new Orc(tryX,tryY));
                                break;
                        case 1: objects.push(new Kobold(tryX, tryY));
                                break;
                    }

                    enemyCount++;
                    console.log(objects);
                }
            }
        }
        addEnemy(Math.floor(depth * (1 + dungeonDifficulty * Math.random()) * Math.floor(Math.random()* 5) + 1));
        return [map,startX,startY];
    }


    function generateObjects() {
        //first object is personage
        return objects;
    }
    return {
        generateCave: generateCave,
        generateObjects: generateObjects
    }
})();

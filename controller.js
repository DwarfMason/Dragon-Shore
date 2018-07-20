class controller{
    constructor(player, map, objects){
        this.player = player;
        this.map = map;
        this.objectsMap = objects;
    }

    checkCollision(scene){
        for (let i = 1;i < this.objectsMap.length; ++i) {
            if((this.player.x === this.objectsMap[i].x) && (this.player.y === this.objectsMap[i].y)){
                if(!this.objectsMap[i].isDead){
                    if (mainHero.initiative >= this.objectsMap[i].initiative)
                        closeBattle(this.player, this.objectsMap[i]);
                    else
                        closeBattle(this.objectsMap[i], this.player);
                    if(this.player.isDead){
                        scene.setState(gameOver);
                        scene.update();
                    }
                    return 1;
                }
            }
        }
        return 0;
    }

    moveR(scene){
        if(this.map[this.player.y][this.player.x + 1].isMovable){
            this.player.x++;
            if(this.checkCollision(scene)){
                this.player.x--;
            }
        }

    }
    moveL(scene){
        if(this.map[this.player.y][this.player.x - 1].isMovable){
            this.player.x--;
            if(this.checkCollision(scene)){
                this.player.x++;
            }
        }

    }
    moveD(scene){
        if(this.map[this.player.y + 1][this.player.x].isMovable){
            this.player.y++;
            if(this.checkCollision(scene)){
                this.player.y--;
            }
        }

    }
    moveU(scene){
        if(this.map[this.player.y - 1][this.player.x].isMovable){
            this.player.y--;

            if(this.checkCollision(scene)){
                this.player.y++;
            }
        }
    }
}
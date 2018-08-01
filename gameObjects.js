
class TileSet {
    constructor(tilesetIndex = 0, tileSize = 8) {
        this.index = tilesetIndex;
        this.tileSize = tileSize;
        this.image = tileSetslist[tilesetIndex];
        this.imageVisited = tileSetsVisetedlist[tilesetIndex];
    }
    getTilePos(tileId) {
        return tileId*this.tileSize;
    }
    changeTileSet(tilesetIndex, tileSize = 8){
        this.index = tilesetIndex;
        this.tileSize = tileSize;
        this.image = tileSetslist[tilesetIndex];
        this.imageVisited = tileSetsVisetedlist[tilesetIndex];
    }
    getCurrentTileIndex(){
        return this.index;
    }
}
const TILE_SET = new TileSet();

class Texture {
    constructor(tileId, tileSet = TILE_SET, textureSize = 16){
        this.tileSet = tileSet;
        this.id = tileId;
        this.size = textureSize;
    }
}
/*  terrain */
class Terrain extends Texture{
    constructor(tileId){
        super(tileId);
        this.isMovable = 0;
        this.seen = false;
    }
}
class Wall extends  Terrain {
    constructor() {
        super(42);      //*
        this.isMovable = 0;
    }
}
class Floor extends  Terrain {
    constructor() {
        super(46);      //.
        this.isMovable = 1;
    }
}
class StartPoint extends  Terrain {
    constructor() {
        super(60);      //<
        this.isMovable = 1;
    }
}
class EndPoint extends  Terrain {
    constructor() {
        super(62);      //>
        this.isMovable = 1;
        this.seen = true;
    }
}
/* end terrain */



class RMenu{                                                            //right menu
    constructor(baffsList = [] ,name = 0, HPmax = 0, HPcurrent = 0, MPmax = 0, MPcurrent = 0){
        this.name = name;
        this.HPmax = HPmax;
        this.HPcurrent = HPcurrent;
        this.MPmax = MPmax;
        this.MPcurrent = MPcurrent;
        this.baffs = baffsList;             //array
    }

}

/* Objects */

class SceneObject extends Texture{
    constructor(id,x, y) {
        super(id);
        this.x = x;
        this.y = y;
    }
}

class TestMob extends SceneObject{
    constructor(x,y){
        super(2,x,y);
        this.rMenu = new RMenu(["qwe","qwe","qwe"]);
    }
}
/*end Objects */

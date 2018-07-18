
class TileSet {
    constructor(tilesetPath = "assets/tileset.png", tileSize = 8) {
        this.path = tilesetPath;
        this.tileSize = tileSize;
        this.image = new Image();
        this.image.src = this.path;
    }
    getTilePos(tileId) {
        return tileId*this.tileSize;
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
class Terrain extends Texture{
    constructor(tileId){
        super(tileId);
    }
}
class Wall extends  Terrain {
    constructor() {
        super(42);      //*
    }
}
class Floor extends  Terrain {
    constructor() {
        super(46);      //.
    }
}
class StartPoint extends  Terrain {
    constructor() {
        super(60);      //<
    }
}
class EndPoint extends  Terrain {
    constructor() {
        super(62);      //>
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

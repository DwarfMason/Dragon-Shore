function getAsset(fileName) {
    const ASSETS_PATH = "assets/";
    return ASSETS_PATH + fileName;
}
let sword = new Image();
sword.src = "assets/sword.png";
//dragon pos 36, 120
let dragon = new Image();
dragon.src = "assets/dragon.png";
//lable pos 203, 0
let dragonLable = new Image();
dragonLable.src = "assets/dragonlable.png";

let tileSetslist = [];

for (let i = 0; i < 2; ++i) {
    let imgPath = getAsset(`tileset${i}.png`);
    let image = new Image();
    image.src = imgPath;
    tileSetslist.push(image);
}
let tileSetsVisetedlist = [];
for (let i = 0; i < 2; ++i) {
    let imgPath = getAsset(`tileset${i}_visited.png`);
    let image = new Image();
    image.src = imgPath;
    tileSetsVisetedlist.push(image);
}

let deathScreenImg = [];
for (let i = 0; i < 5; ++i) {
    let imgPath = getAsset(`you_died${i}.png`);
    let image = new Image();
    image.src = imgPath;
    deathScreenImg.push(image);
}

function getRandomIMG(){
    return deathScreenImg[Math.floor(Math.random() * 5)];
}




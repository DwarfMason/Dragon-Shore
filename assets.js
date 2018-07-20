function getAsset(fileName) {
    const ASSETS_PATH = "assets/";
    return ASSETS_PATH + fileName;
}

let menuImgs = [];
for (let i = 0; i < 4; ++i) {
    let imgPath = getAsset(`menu${i}.png`);
    let image = new Image();
    image.src = imgPath;
    menuImgs.push(image);
}

let gameOverImg = new Image();
gameOverImg.src = getAsset(`you_died${Math.floor(Math.random() * 3)}.png`);



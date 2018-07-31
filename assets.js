function getAsset(fileName) {
    const ASSETS_PATH = "assets/";
    return ASSETS_PATH + fileName;
}

let menuImgs = [];
for (let i = 0; i < 6; ++i) {
    let imgPath = getAsset(`menu${i}.png`);
    let image = new Image();
    image.src = imgPath;
    menuImgs.push(image);
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




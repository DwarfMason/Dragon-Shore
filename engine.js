//TODO: сделать экран с результатами

let game = null;//new GameState();
let menu = null;
let credits = null;
let leaderboards = null; //TODO
let settings = null; //TODO
let gameOver = null;//new GameOverState();
let charCreation = null; // new CharCreationState()
let shop = null; //ShopCreationState;
let help = null;
let description = null;

let depth;

class Scene {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.state = null;
        this.eventList = {};
        this.ctx.imageSmoothingEnabled = false;
    }

    setState(state) {
        //remove old handlers
        for (let oldEvent in this.eventList) {
            console.log("Remove old handlers", oldEvent, this.eventList[oldEvent]);
            if (this.eventList.hasOwnProperty(oldEvent) && this.eventList[oldEvent] !== null) {
                window.removeEventListener(oldEvent, this.eventList[oldEvent]);
            }
        }
        this.eventList = {};
        //and set new
        this.state = state;
        let events = this.state.events;
        for (let event in events) {
            console.log("Add new handlers", event, events[event]);
            if (events.hasOwnProperty(event) && events[event] !== null) {
                this.eventList[event] = e => {
                    events[event].call(this.state, this, e);
                };
                window.addEventListener(event, this.eventList[event]);
            }
        }
    }

    getState() {
        return this.state;
    }

    update() {
        this.state.update(this.ctx);
    }
}

class State {
    constructor() {
    }

    get events() {
        return {};
    }

    update(context) {

    }
}

class CreditsState extends State {
    constructor() {
        super();
    }

    keyHandler(scene, event) {
        scene.setState(menu);
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Credits", 470, 40);
        context.font = "36px manaspc";
        context.fillText("Press any key to continue...", 470, 580);

        context.textAlign = "left";
        context.font = "24px manaspc";

        context.fillText("Made by:", 10, 65);
        context.fillText("Balashenko Igor (DwarfMason)", 10, 100);
        context.fillText("Yury Kurlykov (t1meshift)", 10, 130);
        context.fillText("Andrey Osadchii (smgks)", 10, 160);
        super.update(context);
    }
}

class SettingsState extends State{
    constructor(){
        super();
        //MAX tileSetList == 10
        self.tileSetList = ["standart tileset"];
        self.menuPos = 0

    }
    update(context){
        context.clearRect(0, 0, 1000, 650);

        context.drawImage(dragon,36,120);
        context.drawImage(dragonLable,203,0);

        context.fillStyle = "white";
        context.font = "24px manaspc";

        for (let i = 0; i < self.tileSetList.length; ++i) {
            if(i === TILE_SET.getCurrentTileIndex())
                context.fillStyle = "blue";
            else
                context.fillStyle = "white";
            context.fillText(self.tileSetList[i], 600, 160 + i * 50);
        }
        context.drawImage(sword,490,128 + self.menuPos*50);
        super.update(context);
    }
    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 27: //esc
                scene.setState(menu);
                break;
            case 40: // arrowdown
                if(self.menuPos < (self.tileSetList.length-1))
                    self.menuPos++;
                break;
            case 38: // arrowup
                if(self.menuPos >= 1)
                    self.menuPos--;
                break;
            case 13: // enter
                TILE_SET.changeTileSet(self.menuPos);
                break;
            case 32: // space
                TILE_SET.changeTileSet(self.menuPos);
                break;
        }
        scene.update();
    }

    get events() {
        return {
            keydown: this.keyHandler,
        }
    }
}

class HelpState extends State {
    constructor() {
        super();
    }

    keyHandler(scene, event) {
        scene.setState(game);
        scene.update();
    }

    get events() {
        return {
            keydown: this.keyHandler,
        }
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Help", 470, 40);
        context.font = "36px manaspc";
        context.fillText("Press any key to continue...", 470, 580);

        context.textAlign = "left";
        context.font = "24px manaspc";

        context.fillText("Key bindings:", 10, 65);

        context.fillText("Arrows stay for movement", 10, 100);
        context.fillText("h - use health potion", 10, 130);
        context.fillText("m - mana potion", 10, 160);
        context.fillText("'space' - use magic", 10, 190);
        context.fillText(". or >  - descend (works on ladders >)", 10, 220);
        context.fillText("? - help menu", 10, 250);
        context.fillText("d - description items menu", 10, 280);
        context.fillText("s - call shop", 10, 310);

        super.update(context);
    }
}

class DescriptionState extends State {
    constructor() {
        super();
        this.isWeapon  = false;
        this.isArmor = false;
        this.isMagic = false;
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 13:
                scene.setState(game);
                break;
            case 87: // w - weapon
                this.isWeapon = true;
                break;
            case 65: // a - armor
                this.isArmor = true;
                break;
            case 77: // m - magic
                this.isMagic = true;
        }
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Items description", 470, 40);
        context.font = "36px manaspc";
        context.fillText("Press given keys to get description", 470, 580);
        context.fillText("Press Enter to exit", 470, 625);

        context.textAlign = "left";
        context.font = "24px manaspc";

        context.fillText(`w - ${mainHero.weapon.name} description`, 10, 100);
        context.fillText(`a - ${mainHero.armor.name} description`, 10, 130);
        context.fillText(`m - ${mainHero.magic.name} description`, 10, 160);

        context.fillText(`Your character: ${mainHero.name}`, 525, 100);
        context.fillText(`Strength: ${mainHero.strength}`, 525, 130);
        context.fillText(`Agility: ${mainHero.agility}`, 525, 160);
        context.fillText(`Initiative: ${mainHero.initiative} `, 525, 190);
        context.fillText(`Endurance: ${mainHero.endurance}`, 525, 220);
        context.fillText(`Intelligence: ${mainHero.intelligence}`, 525, 250);

        if(this.isArmor){
            context.font = "24px manaspc";
            context.fillStyle = "yellow";
            context.fillText(`${mainHero.armor.name} - ${mainHero.armor.description}`, 10, 400);
            this.isArmor = !this.isArmor;
        }

        if(this.isWeapon){
            context.font = "24px manaspc";
            context.fillStyle = "yellow";
            context.fillText(`${mainHero.weapon.name} - ${mainHero.weapon.description}`, 10, 400);
            this.isWeapon = !this.isWeapon;
        }

        if(this.isMagic){
            context.font = "24px manaspc";
            context.fillStyle = "yellow";
            context.fillText(`${mainHero.magic.name} - ${mainHero.magic.description}`, 10, 400);
            this.isMagic = !this.isMagic;
        }

        super.update(context);
    }
}

class GameOver extends State {
    constructor() {
        super();
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 13:
                scene.setState(menu);
                menu.dropMenuPos();
        }
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.drawImage(getRandomIMG(), 0, 0);

        context.fillStyle = "white";
        context.font = "24px manaspc";

        context.fillText(`Name: ${mainHero.name}`, 20, 150);
        context.fillText(`Race: ${mainHero.race}`, 20, 180);
        context.fillText(`Depth: ${depth}`, 20, 210);
        context.fillText(`Weapon: ${mainHero.weapon.name}`, 20, 240);
        context.fillText(`Armor: ${mainHero.armor.name}`, 20, 270);
        context.fillText("Press Enter to exit...", 100, 600);
        context.font = "12px manaspc";
        game.drawMessage(`Case of death: ${game.messages[2]}`, 20, 630, context);
        super.update(context);
    }
}

class MenuState extends State {
    constructor() {
        super();
        this.menuPos = 0;
        this.menuImgs = menuImgs;
    }

    dropMenuPos() {
        this.menuPos = 0;
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 38: //arrow up
                this.menuPos--;
                break;
            case 40: //arrow down
                this.menuPos++;
                break;
            case 13:
                switch (this.menuPos) {
                    case 0:
                        scene.setState(charCreation);
                        // scene.setState(game);
                        // game.startGame();
                        break;
                    case 1:
                        //leaderboards
                        scene.setState(new LeaderboardsState(menu));
                        break;
                    case 2:
                        scene.setState(settings);
                        break;
                    case 3:
                        scene.setState(credits);
                        break;
                    case 4:
                        // sign in
                        scene.setState(new SignInState(menu));
                        break;
                    case 5:
                        // sign out
                        let signOutCallback = function (result) {
                            if (result) {
                                scene.setState(menu);
                            } else {
                                scene.setState(new OfflineState(menu));
                            }
                            scene.update();
                        };
                        scene.setState(new LoadingState(logout, this, [], signOutCallback));
                        break;
                    default:
                        alert("Not yet implemented!");
                        break;
                }
        }
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, 1000, 650);

        if (this.menuPos < 0)
            this.menuPos = 5;
        if (this.menuPos > 5)
            this.menuPos = 0;

        context.drawImage(dragon,36,120);
        context.drawImage(dragonLable,203,0);
        switch (this.menuPos) {
            case 0:
                context.drawImage(sword,671,192);
                break;
            case 1:
                context.drawImage(sword,455,255);
                break;
            case 2:
                context.drawImage(sword,578,317);
                break;
            case 3:
                context.drawImage(sword,617,381);
                break;
            case 4:
                context.drawImage(sword,70,530);
                break;
            case 5:
                context.drawImage(sword,478,527);
                break;
        }
        context.fillStyle = "white";
        context.font = "48px manaspc";//61
        context.fillText("Start",796,236);
        context.fillText("Leaderboards",572,297);
        context.fillText("Settings",698,360);
        context.fillText("Credits",733,425);
        context.fillText("Sign-in",195,575);
        context.fillText("Sign-out",595,571);
        if (dbUser) {
            context.font = "16px manaspc";
            context.textAlign = "right";
            context.fillStyle = "white";
            context.fillText(`Welcome, ${dbUser.displayName}`, 995, 21);
        }
        super.update(context);
    }
}

class CharCreationState extends State {
    constructor() {
        super();
        this.isCreated = false;
        this.nameType = false;
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 72: //h
                mainHero = new Player('Human', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;
            case 79: //o
                mainHero = new Player('Orc', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;
            case 77: //m
                mainHero = new Player('Magic wombat', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;
            case 69: //e
                mainHero = new Player('Wood elf', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;
            case 68: //d
                mainHero = new Player('Dwarf', 10, 10, dbUser ? dbUser.displayName : 'UNKNOWN');
                this.isCreated = true;
                break;

            case 13: //Enter
                if (this.isCreated) {
                    this.isCreated = false;
                    scene.setState(game);
                    game.startGame();
                }
        }
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Choose your race:", 470, 40);
        context.font = "24px manaspc";
        context.fillText("Press the following button to choose your hero", 470, 580);
        context.fillText("Press Enter to play", 470, 600);

        context.textAlign = "left";
        context.font = "24px manaspc";

        context.fillText("h - Human", 10, 100);
        context.fillText("o - Orc", 10, 130);
        context.fillText("e - Wood elf", 10, 160);
        context.fillText("m - Magic wombat", 10, 190);
        context.fillText("d - Dwarf", 10, 220);
        super.update(context);
        if (this.isCreated) {
            context.font = "16px manaspc";
            context.fillText(`Your character: ${mainHero.name}`, 650, 100);
            context.fillText(`Strength: ${mainHero.strength}`, 650, 130);
            context.fillText(`Agility: ${mainHero.agility}`, 650, 160);
            context.fillText(`Initiative: ${mainHero.initiative} `, 650, 190);
            context.fillText(`Endurance: ${mainHero.endurance}`, 650, 220);
        }
    }
}

class LeaderboardsState extends State {
    constructor(callbackState) {
        super();
        this.callbackState = callbackState;
        this.scoresPerPage = 10;
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 27: //escape
                scene.setState(this.callbackState);
                break;
        }
        scene.update();
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Leaderboards:", 500, 40);
        context.fillText("Please wait...", 500, 325);
        context.font = "24px manaspc";
        context.fillText("Press Esc to go back", 500, 600);

        getScores(this.scoresPerPage).then(scores => {
            if (scores.length) {
                context.clearRect(0, 100, 1000, 400);
                context.font = "24px manaspc";
                for (let i = 0; i < scores.length; ++i) {
                    let score = scores[i];
                    if (dbUser) {
                        if (score.uid === dbUser.uid) {
                            context.fillStyle = "yellow";
                        }
                    }
                    context.textAlign = "left";
                    context.fillText(`#${i + 1}: ${score.nickname}`, 50, 90 + i * 25, 450);
                    context.textAlign = "right";
                    context.fillText(`${score.depth}`, 950, 90 + i * 25, 450);
                    context.fillStyle = "white";
                }
                context.textAlign = "left";
            } else {
                context.font = "48px manaspc";
                context.textAlign = "center";
                context.fillText("No leaders yet. Be first!", 500, 325);
                context.font = "24px manaspc";
            }
        });
        super.update(context);

    }
}

class SignInState extends State {
    constructor(callbackState, error = null) {
        super();
        this.callbackState = callbackState;
        this.fieldFocus = 0;
        this.fields = [{
            type: "text",
            name: "Email",
            val: "",
        }, {
            type: "text",
            name: "Password",
            val: "",
            hideChars: true,
        }, {
            type: "button",
            name: "Sign-up",
            click: scene => {
                scene.setState(new SignUpState(this.callbackState));
            }
        }];
        this.error = error;
    }

    get events() {
        return {
            keyup: this.keyHandler,
            keypress: this.typeHandler,
        }
    }

    typeHandler(scene, event) {
        if (this.fields[this.fieldFocus].type === "text") {
            if (event.key !== "Enter" && event.key !== "Backspace")
                this.fields[this.fieldFocus].val += event.key;
        }
        scene.update();
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 27: //escape
                scene.setState(this.callbackState);
                break;
            case 8: //backspace
                if (this.fields[this.fieldFocus].type === "text") {
                    this.fields[this.fieldFocus].val =
                        this.fields[this.fieldFocus].val.substr(0, this.fields[this.fieldFocus].val.length - 1);
                }
                break;
            case 38: //arrow up
                this.fieldFocus--;
                break;
            case 40: //arrow down
                this.fieldFocus++;
                break;
            case 32: //space, useful for buttons
                if (this.fields[this.fieldFocus].type === "button") {
                    this.fields[this.fieldFocus].click(scene);
                }
                break;
            case 13:
                let authCallback = (result) => {
                    if (result) {
                        scene.setState(this.callbackState);
                    } else {
                        scene.setState(new SignInState(this.callbackState, "An error has occurred. Try again."));
                    }
                    scene.update();
                };
                let email = this.fields[0].val;
                let pass = this.fields[1].val;
                scene.setState(new LoadingState(login, this, [email, pass], authCallback));
        }
        scene.update();
    }

    update(context) {
        if (this.fieldFocus < 0)
            this.fieldFocus = 0;
        if (this.fieldFocus >= this.fields.length)
            this.fieldFocus = this.fields.length - 1;

        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Sign in:", 470, 40);
        context.font = "24px manaspc";
        if (this.error) {
            context.fillStyle = "red";
            context.fillText(this.error, 470, 540);
            context.fillStyle = "white";

        }
        context.fillText("Press arrows to switch between login and password", 470, 560);
        context.fillText("Press Space while focused on button to click", 470, 580);
        context.fillText("Press Enter to sign in", 470, 600);

        context.strokeStyle = "white";
        context.lineWidth = 2;
        context.textAlign = "left";
        for (let i = 0; i < this.fields.length; ++i) {
            switch (this.fields[i].type) {
                case "text":
                    context.fillText(this.fields[i].name, 202, 130 + (i * 2) * 25, 598);
                    context.beginPath();
                    context.rect(200, 130 + (i * 2) * 25 + 3, 600, 24);
                    context.stroke();
                    let fieldText = this.fields[i].val;
                    if (this.fields[i].hideChars) {
                        fieldText = "*".repeat(this.fields[i].val.length);
                    }
                    if (this.fieldFocus === i) {
                        fieldText += '_';
                    }
                    context.fillText(fieldText, 202, 130 + (i * 2 + 1) * 25 - 2, 598);
                    break;
                case "button":
                    if (this.fieldFocus === i) {
                        context.fillStyle = "yellow";
                    }
                    context.textAlign = "center";
                    context.fillText(this.fields[i].name, 500, 132 + (i * 2) * 25, 598);
                    context.textAlign = "left";
                    context.fillStyle = "white";
                    break;
            }
        }
        super.update(context);
    }
}

class SignUpState extends State {
    constructor(callbackState, error = null) {
        super();
        this.callbackState = callbackState;
        this.fieldFocus = 0;
        this.fields = [{
            type: "text",
            name: "Email",
            val: "",
        }, {
            type: "text",
            name: "Password",
            val: "",
            hideChars: true,
        }, {
            type: "text",
            name: "Nickname",
            val: defaultNickname,
        }];
        this.error = error;
    }

    get events() {
        return {
            keyup: this.keyHandler,
            keypress: this.typeHandler,
        }
    }

    typeHandler(scene, event) {
        if (event.key !== "Enter" && event.key !== "Backspace")
            this.fields[this.fieldFocus].val += event.key;
        scene.update();
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 27: //escape
                scene.setState(this.callbackState);
                break;
            case 8: //backspace
                this.fields[this.fieldFocus].val =
                    this.fields[this.fieldFocus].val.substr(0, this.fields[this.fieldFocus].val.length - 1);
                break;
            case 38: //arrow up
                this.fieldFocus--;
                break;
            case 40: //arrow down
                this.fieldFocus++;
                break;
            case 13:
                let authCallback = function (result) {
                    if (result === true) {
                        scene.setState(this.callbackState);
                    } else {
                        let errorMsg = "An error has occurred. Try again.";
                        switch (result) {
                            case "auth/email-already-in-use":
                                errorMsg = "This email is already in use.";
                                break;
                            case "auth/weak-password":
                                errorMsg = "Your password is too weak.";
                                break;
                        }
                        scene.setState(new SignUpState(this.callbackState, errorMsg));
                    }
                    scene.update();
                }
                let email = this.fields[0].val;
                let pass = this.fields[1].val;
                let nickname = this.fields[2].val;
                scene.setState(new LoadingState(registrate, this, [email, pass, nickname], authCallback));
        }
        scene.update();
    }

    update(context) {
        if (this.fieldFocus < 0)
            this.fieldFocus = 0;
        if (this.fieldFocus >= this.fields.length)
            this.fieldFocus = this.fields.length - 1;

        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Sign up:", 470, 40);
        context.font = "24px manaspc";
        if (this.error) {
            context.fillStyle = "red";
            context.fillText(this.error, 470, 540);
            context.fillStyle = "white";

        }
        context.fillText("Press arrows to switch between fields", 470, 580);
        context.fillText("Press Enter to sign up", 470, 600);

        context.strokeStyle = "white";
        context.lineWidth = 2;
        context.textAlign = "left";
        for (let i = 0; i < this.fields.length; ++i) {
            context.fillText(this.fields[i].name, 202, 130 + (i * 2) * 25, 598);
            context.beginPath();
            context.rect(200, 130 + (i * 2) * 25 + 3, 600, 24);
            context.stroke();
            let fieldText = this.fields[i].val;
            if (this.fields[i].hideChars) {
                fieldText = "*".repeat(this.fields[i].val.length);
            }
            if (this.fieldFocus === i) {
                fieldText += '_';
            }
            context.fillText(fieldText, 202, 130 + (i * 2 + 1) * 25 - 2, 598);
        }
        super.update(context);
    }
}

class LoadingState extends State {
    constructor(promise, promiseCtx, promiseArgs, callback) {
        super();
        this.promise = promise;
        this.ctx = promiseCtx;
        this.args = promiseArgs;
        this.callback = callback;
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";
        context.fillText("Wait for a while...", 470, 300);
        this.promise.apply(this.ctx, this.args).then(result => this.callback.call(this.ctx, result));
    }
}

class OfflineState extends State {
    constructor(callbackState) {
        super();
        this.callbackState = callbackState;
    }

    goBack(scene) {
        scene.setState(this.callbackState);
        scene.update();
    }

    get events() {
        return {
            keydown: this.goBack,
        }
    }

    update(context) {
        //TODO draw offline screen
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "yellow";
        context.font = "36px manaspc";
        context.textAlign = "center";
        context.fillText("You are offline.", 470, 300);
        context.fillText("Check your internet connection and try again.", 470, 340);
        context.fillStyle = "white";
        context.fillText("Press any key to go back...", 470, 600);
        super.update(context);
    }
}

class ShopState extends State {
    constructor() {
        super();
        this.isBought = false;
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 87: //w - weapon
                this.isBought = getRandomWeapon();
                break;
            case 65: //a - armor
                this.isBought = getRandomArmor();
                break;
            case 77: //m - magic
                this.isBought = getRandomMagic();
                break;
            case 80: //p - potion
                this.isBought = getRandomPotion();
                break;
            case 69: //e - endurance
                this.isBought = incStat(3);
                break;
            case 83: //S - strength
                this.isBought = incStat(1);
                break;
            case 73: //i - intelligence
                this.isBought = incStat(4);
                break;
            case 70: //f - agility(fast)
                this.isBought = incStat(2);
                break;
            case 27: //Esc - exit
                scene.setState(game);
                break;
        }
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }

    update(context) {
        context.clearRect(0, 0, 1000, 650);
        context.fillStyle = "white";
        context.font = "48px manaspc";
        context.textAlign = "center";

        context.fillText("Random shop", 500, 40);
        context.fillText(`Your Gold: ${mainHero.gold}`, 500, 600);

        context.font = "24px manaspc";
        context.textAlign = "left";

        context.fillText(`W:Random weapon............${weaponCost}`, 10, 150);
        context.fillText(`A:Random armor.............${armorCost}`, 10, 190);
        context.fillText(`M:Random magic.............${magicCost}`, 10, 230);
        context.fillText(`P:Random potion.............${potionCost}`, 10, 270);
        context.fillText(`S:Strength attr++...........${statCost}`, 10, 310);
        context.fillText(`F:Agility attr++............${statCost}`, 10, 350);
        context.fillText(`E:Endurance attr++..........${statCost}`, 10, 390);
        context.fillText(`I:Intelligence attr++.......${statCost}`, 10, 430);
        if (this.isBought) {
            context.fillText(`Your buy succesful!`, 500, 500);
            this.isBought = !this.isBought;
        }
        super.update(context);
    }
}

class GameState extends State {
    constructor(dialog = 0) {
        super();
        this.offsetX = 0;
        this.offsetY = 0;
        this.map = [[]];
        this.objectsMap = [];
        this.messages = ["", "", "", "", "", "", "", "", ""];
        this.controller = null;
        this.mobController = null;
        this.ctx = null;
        this.fieldHeight = 30;
        this.fieldWidth = 50;
        this.centerY = (this.fieldHeight / 2) >> 0;
        this.centerX = (this.fieldWidth / 2) >> 0;
        this.centerRectH = 11;
        this.centerRectW = 17;
    }

    newCave() {
        let cave = dungeonGeneration.generateCave(depth);
        this.map = cave[0];
        this.objectsMap = dungeonGeneration.generateObjects();
        this.objectsMap[0].x = cave[1];
        this.objectsMap[0].y = cave[2];
        this.controller = new Controller(this.objectsMap[0], this.map, this.objectsMap);
        this.mobController = new MobController(this.map, this.objectsMap);
        let player = this.objectsMap[0];
        this.offsetX = player.x - this.centerX;
        this.offsetY = player.y - this.centerY;
        this.checkOffsetBorders();
        this.calcVisited();
    }

    startGame() {
        depth = 1;
        this.newCave();
        this.messages = ["", "", "", "", "", "", "", "", ""];
        potionCost = 50;
        statCost = 50;
        weaponCost = 150;
        armorCost = 150;
        magicCost = 80;
        this.pushMessage(`(Welcome to the ){white}(${depth} depth!){red}`);
        this.pushMessage(`(To get help press '?'){white}`);
    }

    newLevel() {
        depth++;
        this.newCave();
        this.checkOffsetBorders();
        this.pushMessage(`(Welcome to the ){white}(${depth} depth!){red}`);
    }

    checkOffsetBorders() {
        //checking borders
        let mapW = this.map[0].length;
        let mapH = this.map.length;

        if (this.offsetX + this.fieldWidth > mapW) {
            this.offsetX = mapW - this.fieldWidth;
        }
        if (this.offsetX < 0) {
            this.offsetX = 0;
        }

        if (this.offsetY + this.fieldHeight > mapH) {
            this.offsetY = mapH - this.fieldHeight;
        }
        if (this.offsetY < 0) {
            this.offsetY = 0;
        }
    }

    calcOffset() {
        if (!this.objectsMap) {
            alert("Something wrong happened, please reload the page");
            return;
        }
        let player = this.objectsMap[0];

        let centerRectX = this.offsetX + ((this.fieldWidth - this.centerRectW) / 2) >> 0;
        let centerRectY = this.offsetY + ((this.fieldHeight - this.centerRectH) / 2) >> 0;
        let mapW = this.map[0].length;
        let mapH = this.map.length;

        if (player.x < centerRectX) {
            if (this.offsetX > 0) {
                this.offsetX--;
            }
        }
        if (player.x >= centerRectX + this.centerRectW) {
            if (this.offsetX + this.fieldWidth < mapW) {
                this.offsetX++;
            }
        }

        if (player.y < centerRectY) {
            if (this.offsetY > 0) {
                this.offsetY--;
            }
        }
        if (player.y >= centerRectY + this.centerRectH) {
            if (this.offsetY + this.fieldHeight < mapH) {
                this.offsetY++;
            }
        }
        this.checkOffsetBorders();
    }

    calcVisited() {
        let mapW = this.map[0].length;
        let mapH = this.map.length;
        let player = this.objectsMap[0];
        let startX = Math.max(0, player.x - player.fogRad);
        let startY = Math.max(0, player.y - player.fogRad);
        let endX = Math.min(mapW - 1, player.x + player.fogRad);
        let endY = Math.min(mapH - 1, player.y + player.fogRad);


        for (let y = startY; y <= endY; ++y) {
            for (let x = startX; x <= endX; ++x) {
                if (Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2) <= player.fogRad)
                    this.map[y][x].seen = true;
            }
        }
    }

    isVisibleForPlayer(x, y) {
        let player = this.objectsMap[0];

        return Math.sqrt((x - player.x) ** 2 + (y - player.y) ** 2) <= player.fogRad;
    }

    setNewMap() {
        this.map = dungeonGeneration.generateCave();
        this.objectsMap = dungeonGeneration.generateObjects();
    }

    pushMessage(text) {
        this.messages[7] = this.messages[6];
        this.messages[6] = this.messages[5];
        this.messages[5] = this.messages[4];
        this.messages[4] = this.messages[3];
        this.messages[3] = this.messages[2];
        this.messages[2] = this.messages[1];
        this.messages[1] = this.messages[0];

        this.messages[0] = text;
        if (this.ctx !== null) {
            this.update(this.ctx);
        }

        //alert(this.messages);
    }


    drawRMenu(context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, 1000, 650);
        context.fillStyle = 'white';
        context.fillRect(805, 5, 190, 475);
        context.fillStyle = "black";
        context.fillRect(807, 7, 186, 471);

        context.fillStyle = "white";
        context.font = "24px manaspc";
        if (this.objectsMap[0] !== undefined) {
            context.fillText(this.objectsMap[0].name, 815, 35);
            context.fillText("HP:" + this.objectsMap[0].hp + '/' + this.objectsMap[0].maxHP, 820, 70);
            context.fillText("MP:" + this.objectsMap[0].mp + '/' + this.objectsMap[0].maxMP, 820, 100);
            context.fillText(`Gold:${this.objectsMap[0].gold}`, 820, 130);

            context.font = "16px manaspc";
            context.fillText("Inventory:", 820, 170);

            context.textAlign = "left";

            game.drawMessage(`(HP ){green} (potions: ${mainHero.hpPotions}){white}`, 820, 200, context);
            game.drawMessage(`(MP){blue} ( potions: ${mainHero.mpPotions}){white}`, 820, 220, context);

            game.drawMessage(`(Armor:){#FFB459}`, 820, 300, context);
            context.fillStyle = "white";
            context.fillText(`${mainHero.armor.name}`, 820, 320);

            game.drawMessage(`(Weapon:){#FFB459}`, 820, 350, context);
            context.fillStyle = "white";
            context.fillText(`${mainHero.weapon.name}`, 820, 370);

            game.drawMessage(`(Spell:){#FFB459}`, 820, 400, context);
            context.fillStyle = "white";
            context.fillText(`${mainHero.magic.name}`, 820, 420);

            for (let i = 0; i < this.objectsMap[0].baffs.length; ++i) {
                context.fillText(this.objectsMap[0].baffs[i], 820, 170 + (+20 * +i));
            }
        }


    }

    drawMessage(str, x, y, context, textSize = 0) {
        let lastFillstyle = context.fillStyle;
        if(textSize !== 0){
            context.context.font = `${textSize}px manaspc`;
        }
        // input str = (/* text string */){/* color */}
        let re0 = new RegExp("\\({1}[^\\)]+\\){1}", "g");
        //for getting array of such as ["(text1)","(text2)"]
        let re1 = new RegExp("\\{{1}[^\\}]+\\}{1}", "g");
        //for getting array of such as ["{color1}","{color2}"]
        let match0 = str.match(re0);
        //array off ["(text1)","(text2)"]
        let match1 = str.match(re1);
        //array off ["{color1}","{color2}"]
        if(!((match0 === null) || (match1 === null))){

            let len = 0;

            let re2 = new RegExp("[^\\(\\)]+", "g");
            //for getting text from ["(text1)"] to "text1"
            let re3 = new RegExp("[^\\{\\}]+", "g");
            //for getting text from ["{text1}"] to "text1"

            if (!match0 || !match1) return;

            for (let i = 0; i < match0 == null ? 0 : Math.min(match0.length, match1.length); ++i) {
                if (!match1[i] || !match0[i]) return;
                context.fillStyle = match1[i].match(re3)[0];
                let text = match0[i].match(re2)[0];
                context.fillText(text, x + +len, y);
                len = len + +context.measureText(text).width;
            }
        }
        else {
            context.fillStyle = "white";
            context.fillText(str, x, y);
        }
        context.fillStyle = lastFillstyle
    }


    drawDMenu(context) {
        context.fillStyle = 'white';
        context.fillRect(5, 485, 990, 160);
        context.fillStyle = "black";
        context.fillRect(7, 487, 986, 156);
        context.fillStyle = "white";
        context.font = "18px manaspc";

        this.drawMessage(this.messages[0], 10, 505, context);      //0
        this.drawMessage(this.messages[1], 10, 525 - 1, context);      //1
        this.drawMessage(this.messages[2], 10, 545 - 2, context);      //2
        this.drawMessage(this.messages[3], 10, 565 - 3, context);      //3
        this.drawMessage(this.messages[4], 10, 585 - 4, context);      //4
        this.drawMessage(this.messages[5], 10, 605 - 5, context);      //5
        this.drawMessage(this.messages[6], 10, 625 - 5, context);      //6
        this.drawMessage(this.messages[7], 10, 645 - 7, context);      //7

    }

    clearScene(context) {
        //this.ctx.fillStyle = "black";
        context.clearRect(0, 0, context.width, context.height);
    }

    drawTexture(context, texture, x, y, visible) {
        let ts = texture.tileSet;
        if (visible) {
            context.drawImage(ts.image, ts.getTilePos(texture.id), 0, +ts.tileSize, +ts.tileSize,
                x * +texture.size, y * +texture.size, +texture.size, +texture.size);
        } else if (texture.seen) {
            context.drawImage(ts.imageVisited, ts.getTilePos(texture.id), 0, +ts.tileSize, +ts.tileSize,
                x * +texture.size, y * +texture.size, +texture.size, +texture.size);
        } else {
            context.drawImage(ts.image, 0, 0, +ts.tileSize, +ts.tileSize,
                x * +texture.size, y * +texture.size, +texture.size, +texture.size);
        }
    }

    updateMap(context) {
        let startY = this.offsetY;
        let endY = startY + this.fieldHeight - 1;
        let startX = this.offsetX;
        let endX = startX + this.fieldWidth - 1;

        for (let y = startY; y <= endY; ++y) {
            for (let x = startX; x <= endX; ++x) {
                this.drawTexture(context, this.map[y][x], x - startX, y - startY, this.isVisibleForPlayer(x, y));
            }
        }
        for (let i = 0; i < this.objectsMap.length; ++i) {
            let objX = this.objectsMap[i].x;
            let objY = this.objectsMap[i].y;

            if (objX >= startX && objX <= endX) {
                if (objY >= startY && objY <= endY) {
                    if (!this.objectsMap[i].isDead && this.isVisibleForPlayer(objX, objY))
                        this.drawTexture(context, this.objectsMap[i], objX - startX, objY - startY, true);
                }
            }
        }
        //alert(this.map);
    }

    update(context) {
        this.ctx = context;
        super.update(context);
        this.clearScene(context);

        this.drawRMenu(context);
        this.drawDMenu(context);
        this.updateMap(context);
    }

    keyHandler(scene, event) {
        switch (event.keyCode) {
            case 38: //arrow up
                this.controller.moveU(scene);
                this.mobController.move(scene);
                break;
            case 40: //arrow down
                this.controller.moveD(scene);
                this.mobController.move(scene);
                break;
            case 37://arrow left
                this.controller.moveL(scene);
                this.mobController.move(scene);
                break;
            case 39://arrow r
                this.controller.moveR(scene);
                this.mobController.move(scene);
                break;
            case 72://h - health
                this.controller.drinkHP();
                this.mobController.move(scene);
                break;
            case 77://m - mana
                this.controller.drinkMP();
                this.mobController.move(scene);
                break;
            case 190://>
                this.controller.enter();
                break;
            case 83: // s - shop
                scene.setState(shop);
                break;
            case 191: // /(?) - help
                scene.setState(help);
                break;
            case 68: // d - description
                scene.setState(description);
                break;
            case 32: // space - magic
                this.controller.useSpell(scene);
                break;
        }
        this.calcOffset();
        this.calcVisited();
        scene.update();
    }

    get events() {
        return {
            keyup: this.keyHandler,
        }
    }
}

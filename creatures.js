//TODO Унесите кубики в основной модуль, мне они нужны для многого.

function rollD4(diceCount) {                     //Тут много функций на одно и то же, но так вызывать удобнее
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * 4) + 1;
    }
    return total;
}

function rollD6(diceCount) {
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * 6) + 1;
    }
    return total;
}

function rollD8(diceCount) {
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * 8) + 1;
    }
    return total;
}

function rollD12(diceCount) {
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * 12) + 1;
    }
    return total;
}

function rollD100(diceCount) {
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * 100) + 1;
    }
    return total;
}


class Creature {
    constructor() {
        this.posX = 0;
        this.posY = 0;
        this.race = 0;
        this.hp = 0;
        this.mp = 0;
        this.attack = 0;
        this.armor = 0;
        this.agility = 0;
        this.initiative = 0;
        this.items = [];
        this.level = 0;
    }
}

class Player extends Creature {
    constructor(race, startX, startY) {
        super();
        switch (race) {
            case 'human':
                this.strength = rollD6(3);
                this.agility = rollD6(3);
                this.endurance = rollD6(3);
                this.intelligence = rollD6(3);
                this.maxExp = 100;
                break;
            case 'orc':
                this.strength = rollD6(3) + 5;
                this.agility = rollD6(3) - 2;
                this.endurance = rollD6(3) + 2;
                this.intelligence = rollD6(3) - 3;
                this.maxExp = 200;
                break;
            case 'magic wombat':
                this.strength = rollD6(3) - 5;
                this.agility = rollD6(3) + 2;
                this.endurance = rollD6(3) - 2;
                this.intelligence = rollD6(3) + 5;
                this.maxExp = 150;
                break;
        }
        this.race = race;
        this.posX = startX;
        this.posY = startY;
        this.hp = this.endurance / 10 + 4;
        this.mp = this.intelligence / 10;
        this.initiative = this.agility / 10 + 8;
        this.level = 1;
    }
}




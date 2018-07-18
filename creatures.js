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

function closeBattle(first, second){
    console.log(first.name, 'bumped with', second.name,'!');
    if (first.agility/10 + rollD6(2) > 6 + second.agility/10){
        let damage = Math.floor(Math.random()*6) + rollD4(1) - first.weapon.value + second.armor.value - 3;
        damage > 0? (()=>{second.hp -= damage;
                console.log(first.name, 'attacked', second.name, 'with his', first.weapon.name,'for',
                    damage, 'damage!');})():
            (()=>{damage = 0; console.log(first.name, 'didn`t even scratch', second.name,'!')})();
        if (second.hp <= 0) {
            console.log(second.name, 'is dead!');
            second = false;
            return;
        }
    }else
    {
        console.log(first.name, 'missed', second.name,'!');
    }
    if (second.agility/10 + rollD6(2) > 6 + first.agility/10){
        let damage = Math.floor(Math.random()*7) + rollD4(1) - second.weapon.value + first.armor.value - 3;
        damage > 0? (()=>{first.hp -= damage;
                console.log(second.name, 'attacked', first.name, 'with his', second.weapon.name,'for',
                    damage, 'damage!');})():
            (()=>{damage = 0; console.log(second.name, 'didn`t hurt', first.name,'!')})();
        if (first.hp <= 0) {
            console.log(first.name, 'is dead!');
            first = false;
            return;
        }
    }else
    {
        console.log(second.name, 'missed', first.name,'!');
    }
}


class Creature {
    constructor() {
        this.posX = 0;
        this.posY = 0;
        this.race = 0;
        this.hp = 0;
        this.mp = 0;
        this.attack = 0;
        this.armor = {
            name: "Homemade poor clothes",
            type: "light",
            value: 1,
        };
        this.weapon = {
            name: "rusty dagger",
            type: "one hand",
            value: 1,
        };
        this.agility = 0;
        this.initiative = 0;
        this.items = [this.weapon, this.armor];
        this.level = 0;
        this.name = 'none';
    }
}

class Player extends Creature {
    constructor(race, startX, startY, name) {
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
        this.hp = Math.floor(this.endurance / 10) + 4;
        this.mp = Math.floor(this.intelligence / 10) + 1;
        this.maxHP = this.hp;
        this.maxMP = this.mp;
        this.attack = this.strength / 10;
        this.initiative = this.agility / 10 + 8;
        this.level = 1;
        this.name = name;
    }
}

//var orc = new Player('orc', 10, 10, 'green orc');
var mainHero = new Player('human', 10, 10, 'hero');

//mainHero.initiative >= orc.initiative? closeBattle(mainHero, orc): closeBattle(orc, mainHero);
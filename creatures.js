//TODO Унесите кубики в основной модуль, мне они нужны для многого.

function rollDice(diceVal, diceCount) {                     //Тут много функций на одно и то же, но так вызывать удобнее
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * diceVal) + 1;
    }
    return total;
}


function closeBattle(first, second){
    console.log(first.name, 'bumped with', second.name,'!');
    if (first.agility/10 + rollDice(6,2) > 6 + second.agility/10){
        let damage = rollDice(first.weapon.diceVal, first.weapon.diceCount) - second.armor.value + first.attack;
        var crit = (rollDice(20, 1) > 18) && (((first.weapon.diceVal - 1) *first.weapon.diceCount) <= damage);
        crit? damage += damage: damage;
        damage > 0? (()=>{second.hp -= damage;
                console.log(first.name, 'attacked', second.name, 'with his', first.weapon.name,'for',
                    damage, 'damage!', crit? 'crit!':' ');})():
            (()=>{damage = 0; console.log(first.name, 'didn`t even scratch', second.name,'!')})();
        if (second.hp <= 0) {
            console.log(second.name, 'is dead!');
            first.gold += second.gold;
            second = null; //Это удалить побежденный обьект;
            return;
        }
    }else
    {
        console.log(first.name, 'missed', second.name,'!');
    }
    if (second.agility/10 + rollDice(6,2) > 6 + first.agility/10){
        let damage = rollDice(second.weapon.diceVal, second.weapon.diceCount) - first.armor.value + second.attack;
        var crit = (rollDice(20, 1) > 18) && (((second.weapon.diceVal - 1) *second.weapon.diceCount) <= damage);
        crit? damage += damage: damage;
        damage > 0? (()=>{first.hp -= damage;
                console.log(second.name, 'attacked', first.name, 'with his', second.weapon.name,'for',
                    damage, 'damage!', crit? 'crit!':' ');})():
            (()=>{damage = 0; console.log(second.name, 'didn`t hurt', first.name,'!')})();
        if (first.hp <= 0) {
            console.log(first.name, 'is dead!');
            second.gold += first.gold;
            first = null;
            return;
        }
    }else
    {
        console.log(second.name, 'missed', first.name,'!');
    }
}


class Creature extends SceneObject{
    constructor(id) {
        super(id,0,0);
        this.race = 0;
        this.hp = 0;
        this.mp = 0;
        this.attack = 0;
        this.armor = {
            name: "Homemade poor clothes",
            type: "light",
            value: 2,
        };
        this.weapon = {
            name: "rusty dagger",
            type: "one hand",
            value: 0,
            diceVal: 4,
            diceCount: 1,
        };
        this.agility = 0;
        this.initiative = 0;
        this.items = [this.weapon, this.armor];
        this.level = 0;
        this.name = 'none';
        this.gold = 0;
    }
}

class Player extends Creature {
    constructor(race, startX, startY, name) {
        super(2);
        switch (race) {
            case 'human':
                this.strength = rollDice(6, 3);
                this.agility = rollDice(6, 3)+1;
                this.endurance = rollDice(6, 3)+1;
                this.intelligence = rollDice(6, 3);
                this.maxExp = 100;
                break;
            case 'orc':
                this.strength = rollDice(6, 3) + 5;
                this.agility = rollDice(6, 3) - 4;
                this.endurance = rollDice(6, 3) + 1;
                this.intelligence = rollDice(6, 3) - 3;
                this.maxExp = 200;
                break;
            case 'magic wombat':
                this.strength = rollDice(6, 3) - 2;
                this.agility = rollDice(6, 3) + 2;
                this.endurance = rollDice(6, 3) - 2;
                this.intelligence = rollDice(6, 3) + 4;
                this.maxExp = 150;
                break;
        }
        this.race = race;
        this.x = startX;
        this.y = startY;
        this.hp = Math.floor(this.endurance / 10) + 4;
        this.mp = Math.floor(this.intelligence / 10) + 1;
        this.maxHP = this.hp;
        this.maxMP = this.mp;
        this.attack = Math.floor(this.strength / 10);
        this.initiative = this.agility / 10 + 8;
        this.level = 1;
        this.name = name;
        this.baffs = [];
    }
}

class Orc extends Creature{
    constructor (startX, startY){
        super(79);
        this.name = "Green orc";
        this.strength = rollDice(6, 3) + 2;
        this.agility = rollDice(6, 3) - 4;
        this.endurance = rollDice(6, 3) + 1;
        this.attack = Math.floor(this.strength / 10);
        this.x = startX;
        this.y = startY;
        this.hp = Math.floor(this.endurance / 10) + 4;
        this.initiative = this.agility / 10 + 8;
        this.gold = Math.floor(Math.random()*15) - 3;
    }
}

let mainHero = null;


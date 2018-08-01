

class Creature extends SceneObject {
    constructor(id) {
        super(id, 0, 0);
        this.race = 0;
        this.hp = 0;
        this.mp = 0;
        this.attack = 0;
        this.armor = armor[0];
        this.weapon = weapons[0];
        this.agility = 0;
        this.initiative = 0;
        this.name = 'none';
        this.gold = 0;
        this.isDead = 0;
        this.color = "white";
        this.fogRad = 5;
    }
}

class Player extends Creature {
    constructor(race, startX, startY, name) {
        super(2);
        switch (race) {
            case 'Human':
                this.strength = rollDice(6, 3);
                this.agility = rollDice(6, 3) + 12;
                this.endurance = rollDice(6, 3) + 12;
                this.intelligence = rollDice(6, 3);
                break;
            case 'Orc':
                this.strength = rollDice(6, 3) + 15;
                this.agility = Math.min(rollDice(6, 3) - 6, 3);
                this.endurance = rollDice(6, 3) + 13;
                this.intelligence = Math.max(rollDice(6, 3) - 3, 3);
                break;
            case 'Magic wombat':
                this.strength = Math.min(rollDice(6, 3) - 5);
                this.agility = rollDice(6, 3) + 15;
                this.endurance = Math.max(rollDice(6, 3) - 5, 3);
                this.intelligence = rollDice(6, 3) + 17;
                break;
            case 'Wood elf':
                this.strength = rollDice(6, 3) + 13;
                this.agility = rollDice(6, 3) + 15;
                this.endurance = Math.max(rollDice(6, 3) - 6, 3);
                this.intelligence = rollDice(6, 3);
                break;
            case 'Dwarf':
                this.strength = rollDice(6,3) + 17;
                this.agility = rollDice(6,3) - 5;
                this.endurance = rollDice(6,3) + 15;
                this.intelligence = 0;
        }
        this.race = race;
        this.x = startX;
        this.y = startY;
        this.maxHP = Math.floor(this.endurance / 10) + 4;
        this.maxMP = Math.floor(this.intelligence / 10) + 1;
        this.hp = this.maxHP;
        this.mp = this.maxMP;
        this.attack = Math.floor(this.strength / 10);
        this.initiative = this.agility / 10 + 8;
        this.name = name;
        this.baffs = [];
        this.hpPotions = 3;
        this.mpPotions = 3;
        this.gold = 999;
        this.color = "yellow";
    }

    update(){
        this.initiative = this.agility / 10 + 8;
        this.attack = Math.floor(this.strength / 10);
        this.maxHP = Math.floor(this.endurance / 10) + 4;
        this.maxMP = Math.floor(this.intelligence / 10) + 1;
    }
}

class Mob extends Creature{
    constructor(id){
        super(id);
    }
    move(map){
        return [0,0];
    }
}

class Orc extends Mob {
    constructor(startX, startY, weaponID, armorID) {
        super(79);
        this.name = "Green orc";
        this.strength = rollDice(6, 3) + 2 + depth;
        this.agility = rollDice(6, 3) - 4 + depth;
        this.endurance = rollDice(6, 3) + 1 + depth;
        this.attack = Math.floor(this.strength / 10);
        this.x = startX;
        this.y = startY;
        this.hp = Math.floor(this.endurance / 10) + 4;
        this.initiative = this.agility / 10 + 8;
        this.gold = Math.floor(Math.random() * (17 + depth)) + 3;
        this.weapon = weapons[weaponID];
        this.armor = armor[armorID];
        this.color = "green";
        this.left = 1;
    }
    move(map){
        let lastx = this.x;
        let lasty = this.y;
        if(this.left === 1){
            if (!map[this.y][this.x-1].isMovable) {
                this.left = 0;
            }else{
                this.x--;
            }
        }else{
            if (!map[this.y][this.x+1].isMovable) {
                this.left = 1;
            }else{
                this.x++;
            }
        }
        return [lastx,lasty];
    }
}

class Kobold extends Mob {
    constructor(startX, startY, weaponID, armorID) {
        super(75);
        this.name = "little kobold";
        this.strength = rollDice(6, 3) - 5 + depth;
        this.agility = rollDice(6, 3) + 5 + depth;
        this.endurance = rollDice(6, 3) - 5 + depth;
        this.attack = Math.floor(this.strength / 10);
        this.x = startX;
        this.y = startY;
        this.hp = Math.floor(this.endurance / 10) + 4;
        this.initiative = this.agility / 10 + 8;
        this.gold = Math.floor(Math.random() * (13 + depth)) + 3;
        this.weapon = weapons[weaponID];
        this.armor = armor[armorID];
        this.color = "violet";
        this.up = 1;
    }
    move(map){
        let lastx = this.x;
        let lasty = this.y;
        if(this.up === 1){
            if (!map[this.y-1][this.x].isMovable) {
                this.up = 0;
            }else{
                this.y--;
            }
        }else{
            if (!map[this.y+1][this.x].isMovable) {
                this.up = 1;
            }else{
                this.y++;
            }
        }
        return [lastx,lasty];
    }
}

class Gargoyle extends Mob {
    constructor(startX, startY, weaponID, armorID) {
        super(71);
        this.name = "Stone Gargoyle";
        this.strength = rollDice(6, 3) + 2 + depth;
        this.agility = rollDice(6, 3) + 1 + depth;
        this.endurance = rollDice(6, 3) +5 + depth;
        this.attack = Math.floor(this.strength / 10);
        this.x = startX;
        this.y = startY;
        this.hp = Math.floor(this.endurance / 10) + 4;
        this.initiative = this.agility / 10 + 8;
        this.gold = Math.floor(Math.random() * (20 + depth)) + 3;
        this.weapon = weapons[weaponID];
        this.armor = armor[armorID];
        this.color = "#FFB459";
        this.leftUp = 1;
    }
    move(map){
        let lastx = this.x;
        let lasty = this.y;
        if(this.leftUp === 1){
            if (!map[this.y - 1][this.x - 1].isMovable) {
                this.leftUp = 0;
            }else{
                this.y--;
                this.x--;
            }
        }else{
            if (!map[this.y + 1][this.x + 1].isMovable) {
                this.leftUp = 1;
            }else{
                this.y++;
                this.x++;
            }
        }
        return [lastx,lasty];
    }
}

class Minotaur extends Mob {
    constructor(startX, startY, weaponID, armorID) {
        super(77);
        this.name = "Blind minotaur";
        this.strength = rollDice(6, 3) + 30 + depth;
        this.agility = rollDice(6, 3) - 5 + depth;
        this.endurance = rollDice(6, 3) + 5 + depth;
        this.attack = Math.floor(this.strength / 10);
        this.x = startX;
        this.y = startY;
        this.hp = Math.floor(this.endurance / 10) + 4;
        this.initiative = this.agility / 10 + 5;
        this.gold = Math.floor(Math.random() * 100) + 40;
        this.weapon = weapons[weaponID];
        this.armor = armor[armorID];
        this.color = "brown";
    }
    move(map){
        let lastx = this.x;
        let lasty = this.y;
        let dir = Math.floor(Math.random()*4);
        switch (dir){
            case 0: if(map[this.y-1][this.x].isMovable){
                        this.y--;
                        break;}
                    else
                        dir++;

            case 1: if(map[this.y+1][this.x].isMovable){
                this.y++;
                break;}
            else
                dir++;

            case 2: if(map[this.y][this.x-1].isMovable){
                this.x--;
                break;}
            else
                dir++;

            case 3: if(map[this.y][this.x+1].isMovable){
                this.x++;
                break;}
            else
                dir++;
        }
        return [lastx,lasty];
    }
}

let mainHero = null;




class Creature extends SceneObject {
    constructor(id) {
        super(id, 0, 0);
        this.race = 0;
        this.hp = 0;
        this.mp = 0;
        this.attack = 0;
        this.armor = {
            name: "Poor clothes",
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
            case 'human':
                this.strength = rollDice(6, 3);
                this.agility = rollDice(6, 3) + 2;
                this.endurance = rollDice(6, 3) + 2;
                this.intelligence = rollDice(6, 3);
                break;
            case 'orc':
                this.strength = rollDice(6, 3) + 5;
                this.agility = Math.min(rollDice(6, 3) - 4, 3);
                this.endurance = rollDice(6, 3) + 3;
                this.intelligence = Math.min(rollDice(6, 3) - 3, 3);
                break;
            case 'magic wombat':
                this.strength = rollDice(6, 3) - 5;
                this.agility = rollDice(6, 3) + 5;
                this.endurance = Math.min(rollDice(6, 3) - 5, 3);
                this.intelligence = rollDice(6, 3) + 10;
                break;
            case 'Wood elf':
                this.strength = rollDice(6, 3) + 3;
                this.agility = rollDice(6, 3) + 10;
                this.endurance = Math.min(rollDice(6, 3) - 6, 3);
                this.intelligence = rollDice(6, 3);
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
        this.name = name;
        this.baffs = [];
        this.hpPotions = 3;
        this.mpPotions = 3;
        this.color = "yellow";
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
    constructor(startX, startY) {
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
        this.gold = Math.floor(Math.random() * 15) + 3;
        this.color = "green";
        this.left = 1;
    }
    move(map){
        let lastx = this.x;
        let lasty = this.y;
        if(this.left == 1){
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
    constructor(startX, startY) {
        super(75);
        this.name = "little kobold";
        this.strength = rollDice(6, 3) - 5;
        this.agility = rollDice(6, 3) + 5;
        this.endurance = rollDice(6, 3) - 5;
        this.attack = Math.floor(this.strength / 10);
        this.x = startX;
        this.y = startY;
        this.hp = Math.floor(this.endurance / 10) + 4;
        this.initiative = this.agility / 10 + 8;
        this.gold = Math.floor(Math.random() * 10) + 3;
        this.color = "violet";
        this.up = 1;
    }
    move(map){
        let lastx = this.x;
        let lasty = this.y;
        if(this.up == 1){
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

class Dragon extends Mob {
    constructor(startX, startY) {
        super(68);
        this.name = "Red dragon";
        this.strength = rollDice(6, 3) + 30;
        this.agility = rollDice(6, 3) - 10;
        this.endurance = rollDice(6, 3) + 5;
        this.attack = Math.floor(this.strength / 10);
        this.x = startX;
        this.y = startY;
        this.hp = Math.floor(this.endurance / 10) + 4;
        this.initiative = this.agility / 10 + 5;
        this.gold = Math.floor(Math.random() * 100) + 3;
        this.color = "Red";
        this.up = 1;
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


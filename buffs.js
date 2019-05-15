class Buff {
    constructor(name, length, type, owner){
        this.name = name;
        this.length = length;
        this.owner = owner;
        this.type = type;
    }

    effect(){
        return 0;
    }
}

class Bleed extends Buff{
    constructor(length, owner){
        super("Bleeding", length, "chaotic", owner);
    }
    effect(){
        if (this.length > 0){
            this.owner.hp --;
            this.length--;
            game.pushMessage(`(You are bleeding!){red}`);
        }
    }
}

class marsBless extends Buff{
    constructor(length, owner){
        super("Mars blessed", length, "good", owner);
        if (owner !== null) {
            this.bonus = 5;
            this.owner.attackBuff += this.bonus;
            this.owner.update();
        }
    }

    effect(){
        if (this.length > 0){
            this.length--;
            if (this.length === 0) {
                this.owner.attackBuff -= this.bonus;
                this.owner.update();
            }
        }
    }
}

buffs = [
    new Bleed(null, null),
    new marsBless(null, null),
];

class Buff {
    constructor(name, length, type, color, owner) {
        this.name = name;
        this.length = length;
        this.owner = owner;
        this.type = type;
        this.color = color;
    }

    effect() {
        return 0;
    }
}

class Bleed extends Buff {
    constructor(length, owner) {
        super("Bleeding", length, "damaging", "red", owner);
    }

    effect() {
        if (this.length > 0) {
            if (this.owner.hp > 1)
                this.owner.hp--;
            this.length--;
            game.pushMessage(`(You are bleeding!){red}`);
        }
    }
}

class marsBless extends Buff {
    constructor(length, owner) {
        super("Mars blessed", length, "good", "yellow", owner);
        if (owner !== null) {
            this.bonus = 5;
            this.owner.attackBuff += this.bonus;
            this.owner.update();
        }
    }

    effect() {
        if (this.length > 0) {
            this.length--;
            if (this.length === 0) {
                this.owner.attackBuff -= this.bonus;
                this.owner.update();
            }
        }
    }
}

class Apathy extends Buff {
    constructor(length, owner) {
        super("in a bad mood", length, "evil", "cyan", owner);
        if (owner !== null) {
            this.bonus = 3;
            this.owner.agilityBuff -= this.bonus;
            this.owner.update();
        }
    }

    effect() {
        if (this.length > 0) {
            this.length--;
            if (this.length === 0) {
                this.owner.attackBuff += this.bonus;
                this.owner.update();
            }
        }
    }
}

class Heal extends Buff {
    constructor(length, owner) {
        super("completely healed", length, "good", "green", owner);
        if (owner !== null) {
            this.owner.hp = this.owner.maxHP;
            this.owner.update();
            this.length = 0;
        }
    }

    effect() {
        return;
    }
}

class Luck extends Buff {
    constructor(length, owner) {
        super("even more rich", length, "good", "yellow", owner);
        if (owner !== null) {
            this.owner.gold += 100;
            this.owner.update();
            this.length = 0;
        }
    }

    effect() {
        return;
    }
}

class WrathOfSeth extends Buff {
    constructor(length, owner) {
        super("feeling the wrath", length, "good", "red", owner);
        if (owner !== null) {
            this.savedHP = this.owner.hp;
            this.bonus = 5;
            this.owner.attackBuff += this.bonus;
            this.owner.update();
        }
    }
    effect() {
        if (this.length > 0) {
            this.length--;
            this.owner.hp = this.savedHP;
            if (this.length === 0) {
                this.savedHP = 0;
                this.owner.attackBuff -= this.bonus;
                this.owner.update();
            }
        }
    }
}

buffs = [
    new Bleed(null, null),
    new marsBless(null, null),
    new Apathy(null, null),
    new Heal(null, null),
    new Luck(null, null),
    new WrathOfSeth(null, null),
];

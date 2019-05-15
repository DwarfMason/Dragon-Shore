class buff {
    constructor(name, length, owner){
        this.name = name;
        this.length = length;
        this.owner = owner;
    }

    effect(){
        return 0;
    }
}

class Bleed extends buff{
    constructor(name, length, owner){
        super(name, length, owner);
    }
    effect(){
        if (this.length > 0){
            this.owner.hp --;
            this.length--;
            game.pushMessage('(You are bleeding!){red}');
            console.log('Я сосал');
        }
    }
}

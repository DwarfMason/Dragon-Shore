let armor = new Array(7);
let weapons = new Array(7);
let spells = new Array(3);

class Armor{
    constructor(name, value, description){
        this.name = name;
        this.value =  value;
        this.description = description;
    }

    onEquip(mainHero){
        return 0;
    }


    onChange(mainHero){
        return 0;
    }
}

class PoorClothes extends Armor{
    constructor(){
        super('Poor clothes', 2, 'It smells like your cat!');
    }
}

class LeatherPants extends Armor{
    constructor(){
        super('Leather pants', 3, 'Because you did not have money for the shirt');
    }

    onEquip(mainHero){
        mainHero.gold >= 50? this.value += 3: this.value;
    }
}

class LeatherSet extends Armor{
    constructor(){
        super('Leather set', 5, 'Ok, maybe you are not so poor');
    }
}

class RockPlate extends Armor{
    constructor(){
        super('Rock plate', 6, 'Haters gonna say - it is heavy');
    }

    onEquip(mainHero){
        mainHero.endurance += 10;
    }

    onChange(mainHero){
        mainHero.endurance -= 10;
    }
}

class CodeShirt extends Armor{
    constructor(){
        super('Code shirt', 7, 'It is quit boring to make this descriptions.');
    }

    onEquip(mainHero){
        mainHero.intelligence += 15;
    }

    onChange(mainHero){
        mainHero.intelligence -= 10;
    }
}

class Cuirass extends Armor{
    constructor(){
        super('Steel cuirass', 8, 'I really like it`s sound of ignoring damage!');
    }
}

class DragonArmor extends Armor{
    constructor(){
        super('Dragon`s armor', 10, 'Greenpeace is in fury!');
    }

    onEquip(mainHero){
        mainHero.endurance += 10;
    }
}




class Weapon{
    constructor(name, value, diceVal, diceCount, description){
        this.name = name;
        this.value =  value;
        this.diceVal = diceVal;
        this.diceCount = diceCount;
        this.description = description;
    }

    onEquip(mainHero){
        return 0;
    }

    onChange(mainHero){
        return 0;
    }
}

class RustyDagger extends Weapon {
    constructor() {
        super('Rusty dagger', 0, 4, 1, 'Seems like it was lost a couple ages ago');
    }
}

class BrokenSword extends Weapon{
    constructor(){
        super('Broken sword', 0, 6, 1, 'Looks like somebody chewed it');
    }
     onEquip(mainHero){
        mainHero.agility >= 25? this.value += 3: this.value++;
     }
}

class DaddySword extends Weapon{
    constructor(){
        super('Daddy`s sword +1', 1, 6, 1, 'At least you know, that it deals damage');
    }
}

class Rock extends Weapon{
    constructor() {
        super('Rock', 0, 4, 2, 'It helps you feel concentratedly');
    }

    onEquip(mainHero){
        mainHero.intelligence += 5;
    }

    onChange(mainHero){
        mainHero.intelligence -= 5;
    }
}

class BalancedSword extends Weapon{
    constructor(){
        super('Balanced sword +3', 3, 6, 1, 'Finally! Good weapon!');
    }
}

class HardMace extends Weapon{
    constructor(){
        super('Hard mace', 2, 8, 1, 'It is quite heavy, but you can get on well with it.');
    }

    onEquip(mainHero){
        mainHero.endurance >= 20? mainHero.strength += 5: mainHero.strength;
    }
}

class BloodyHammer extends Weapon{
    constructor(){
        super('Bloody hammer', 0, 12, 1, 'You are proud with it. It killed someone!');
    }

    onEquip(mainHero){
        mainHero.magic = spells[1];
    }
}




class Magic {
   constructor(name,cost, radius, description){
       this.cost = cost;
       this.radius = radius;
       this.description = description;
       this.name = name;
   }

    useSpell(scene){
        return 0;
    }
}

class RandomWipeSpell extends Magic {
    constructor() {
        super("Wipe spell",2, 0, "This spell kills random beast");
    }

    useSpell() {
        let isFind = false;
        let tries = 0;
        if (mainHero.mp >= this.cost) {
            while (tries < game.objectsMap.length) {
                let mobNum = Math.floor(Math.random() * (game.objectsMap.length - 1)) + 1;
                if (!game.objectsMap[mobNum].isDead) {
                    game.objectsMap[mobNum].isDead = 1;
                    game.pushMessage(`(You hear terrifying howl){red}`);
                    mainHero.mp -= this.cost;
                    return;
                }else
                    tries++;
            }
            game.pushMessage(`(Spell did not work!){white}`);
        } else
            game.pushMessage(`(You do not have enough mana!){blue}`);
    }
}

class EnemyCountSpell extends Magic{
    constructor(){
        super("Magic compass" ,1, 0, "Just to be sure you killed everyone!");
    }

    useSpell(){
        let counter = 0;
        if (mainHero.mp >= this.cost) {
            for (let i = 1; i < game.objectsMap.length; i++)
                if(!game.objectsMap[i].isDead) counter++;
                game.pushMessage(`(There are ){white}(${counter}){red} ( enemies here){white}`);
                mainHero.mp -= this.cost;
        }else
            game.pushMessage(`(You do not have enough mana!){blue}`);
    }
}

class MidasSpell extends Magic{
    constructor(){
        super("Midas ring" ,3, 0, "Gold >> life");
    }
    useSpell(){
        if (mainHero.mp >= this.cost && mainHero.hp > 2) {
            let gold = rollDice(20,1);
            mainHero.mp -= this.cost;
            mainHero.hp -= 2;
            mainHero.gold += gold;
            game.pushMessage(`(You should be mad to hurt yourself for ){white} (${gold} coins){yellow}`);
        }else
            game.pushMessage(`(You cannot do that!){red}`);
    }
}


weapons[0] =  new RustyDagger();
weapons[1] =  new BrokenSword();
weapons[2] =  new DaddySword();
weapons[3] =  new Rock();
weapons[4] =  new BalancedSword();
weapons[5] =  new HardMace();
weapons[6] =  new BloodyHammer();

armor[0] = new PoorClothes();
armor[1] = new LeatherPants();
armor[2] = new LeatherSet();
armor[3] = new RockPlate();
armor[4] = new CodeShirt();
armor[5] = new Cuirass();
armor[6] = new DragonArmor();

spells[0] = new EnemyCountSpell();
spells[1] = new RandomWipeSpell();
spells[2] = new MidasSpell();

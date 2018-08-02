let weapons = null;
let armor = null;
let spells = null;

class Armor{
    constructor(name, value, description, tier) {
        this.name = name;
        this.value =  value;
        this.description = description;
        this.tier = tier;
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
        super('Poor clothes', 2, 'It smells like your cat!', 0);
    }
}

class LeatherPants extends Armor{
    constructor(){
        super('Leather pants', 3, 'Because you did not have money for the shirt', 1);
    }

    onEquip(mainHero){
        mainHero.gold >= 50? this.value += 3: this.value;
    }
}

class LeatherSet extends Armor{
    constructor(){
        super('Leather set', 5, 'Ok, maybe you are not so poor', 1);
    }
}

class RockPlate extends Armor{
    constructor(){
        super('Rock plate', 6, 'Haters gonna say - it is heavy', 1);
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
        super('Code shirt', 7, 'It is quit boring to make this descriptions.', 2);
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
        super('Steel cuirass', 8, 'I really like it`s sound of ignoring damage!', 2);
    }
}

class DragonArmor extends Armor{
    constructor(){
        super('Dragon`s armor', 10, 'Greenpeace is in fury!', 3);
    }

    onEquip(mainHero){
        mainHero.endurance += 10;
    }
}




class Weapon{
    constructor(name, value, diceVal, diceCount, description, tier) {
        this.name = name;
        this.value =  value;
        this.diceVal = diceVal;
        this.diceCount = diceCount;
        this.description = description;
        this.tier = tier;
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
        super('Rusty dagger', 0, 4, 1, 'Seems like it was lost a couple ages ago', 0);
    }
}

class BrokenSword extends Weapon{
    constructor(){
        super('Broken sword', 0, 6, 1, 'Looks like somebody chewed it', 1);
    }
     onEquip(mainHero){
        mainHero.agility >= 25? this.value += 3: this.value++;
     }
}

class DaddySword extends Weapon{
    constructor(){
        super('Daddy`s sword +1', 1, 6, 1, 'At least you know, that it deals damage', 1);
    }
}

class Rock extends Weapon{
    constructor() {
        super('Rock', 0, 4, 2, 'It helps you feel concentratedly', 1);
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
        super('Balanced sword +3', 3, 6, 1, 'Finally! Good weapon!', 2);
    }
}

class HardMace extends Weapon{
    constructor(){
        super('Hard mace', 2, 8, 1, 'It is quite heavy, but you can get on well with it.', 2);
    }

    onEquip(mainHero){
        mainHero.endurance >= 20? mainHero.strength += 5: mainHero.strength;
    }
}

class BloodyHammer extends Weapon{
    constructor(){
        super('Bloody hammer', 0, 12, 1, 'You are proud with it. It killed someone!', 3);
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

class MindVision extends Magic{
    constructor(){
        super("Mind Vision", 1, 0, "Yes, you think absolutely right");
    }

    useSpell(){
        if (mainHero.mp >= this.cost) {
            let closest = null;
            let dest = 1e100;
            game.objectsMap.forEach((item, i, arr)=>{
                let d = (mainHero.x - item.x)**2 + (mainHero.y - item.y)**2;
                if (d < dest && item != mainHero) {
                    closest = item;
                    dest = d;
                }
            });

            if (closest != null){
                game.pushMessage(`(I feel somebody with:){white} ( ${closest.strength}){red}( strength ){white}` +
                `(and ){white}(${closest.agility}){green}( agility){white} (${closest.initiative > mainHero.initiative? 
                    ` You will strike first`:` You will strike second`}){green}`);
            }else
                game.pushMessage(`(You are a weak sorcerer, or everyone dead){white}`);
            mainHero.mp -= this.cost;
        }else
            game.pushMessage(`(You do not have enough mana!){blue}`);
    }
}


weapons = [
    new RustyDagger(),
    new BrokenSword(),
    new DaddySword(),
    new Rock(),
    new BalancedSword(),
    new HardMace(),
    new BloodyHammer(),
];

armor = [
    new PoorClothes(),
    new LeatherPants(),
    new LeatherSet(),
    new RockPlate(),
    new CodeShirt(),
    new Cuirass(),
    new DragonArmor(),
];

spells = [
    new EnemyCountSpell(),
    new RandomWipeSpell(),
    new MidasSpell(),
    new MindVision(),
];

let maxTier = weapons[weapons.length - 1].tier;

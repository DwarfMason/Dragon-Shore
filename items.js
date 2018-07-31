let armor = new Array(7);
let weapons = new Array(7);

class Armor{
    constructor(name, value, description){
        this.name = name;
        this.value =  value;
        this.description = description;
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
}

weapons[0] =  new Weapon('Rusty dagger', 0, 4, 1, 'Seems like it was lost a couple ages ago');
weapons[1] =  new Weapon('Broken sword', 0, 6, 1, 'Looks like somebody chewed it');
weapons[2] =  new Weapon('Daddy`s sword +1', 1, 6, 1, 'At least you know, that it deals damage');
weapons[3] =  new Weapon('Rock', 0, 4, 2, 'For some reason it is more comfortable than sword');
weapons[4] =  new Weapon('Balanced sword +3', 3, 6, 1, 'Finally! Good weapon!');
weapons[5] =  new Weapon('Hard mace', 2, 8, 1, 'It is quite heavy, but you can get on well with it.');
weapons[6] =  new Weapon('Bloody hammer', 0, 12, 1, 'You are proud with it. It killed someone!');

armor[0] = new Armor('Poor clothes', 2, 'It smells like your cat!');
armor[1] = new Armor('Leather pants', 3, 'Because you did not have money for the shirt');
armor[2] = new Armor('Leather set', 5, 'Ok, maybe you are not so poor');
armor[3] = new Armor('Rock plate', 6, 'Haters gonna say - it is heavy');
armor[4] = new Armor('Code shirt', 7, 'It is quit boring to make this descriptions.');
armor[5] = new Armor('Steel cuirass', 8, 'I really like it`s sound of ignoring damage!');
armor[6] = new Armor('Dragon`s armor', 10, 'Greenpeace is in fury!');
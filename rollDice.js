let potionCost;
let statCost;
let weaponCostSame;
let armorCostSame;
let armorCostUp;
let weaponCostUp;
let magicCost;

function rollDice(diceVal, diceCount) {
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * diceVal) + 1;
    }
    return total;
}

function getRandomPotion() {
    if (mainHero.gold >= potionCost) {
        let pot = rollDice(2, 1);
        pot === 1 ? mainHero.hpPotions++ : mainHero.mpPotions++;
        mainHero.gold -= potionCost;
        potionCost += 10;
        return true;
    }
    return false;
}

function incStat(a) {
    if (mainHero.gold >= statCost) {
        switch (a){
            case 1: mainHero.strength++;
                        break;
            case 2: mainHero.agility++;
                            break;
            case 3: mainHero.endurance++;
                              break;
            case 4: mainHero.intelligence++;
                              break;
        }
        mainHero.update();
        mainHero.gold -= statCost;
        statCost += 25;
        return true;
    }
    return false;
}

function getRandomWeapon(tier) {
    if (tier === maxTier) {
        return false;
    }

    if (mainHero.weapon.tier === tier) {
        if (mainHero.gold < weaponCostSame) return false;

        let choice = [];

        for (let i = 0; i < weapons.length; i++)
            if (weapons[i].tier === tier) choice.push(weapons[i]);

        mainHero.weapon.onChange(mainHero);
        mainHero.weapon = choice[Math.floor(Math.random() * choice.length)];
        mainHero.weapon.onEquip(mainHero);
        mainHero.update();
        mainHero.gold -= weaponCostSame;
        weaponCostSame += 10;
        return true;
    }
    if (mainHero.gold < weaponCostUp) return false;

    let choice = [];

    for (let i = 0; i < weapons.length; i++)
        if (weapons[i].tier === tier) choice.push(weapons[i]);

    mainHero.weapon.onChange(mainHero);
    mainHero.weapon = choice[Math.floor(Math.random() * choice.length)];
    mainHero.weapon.onEquip(mainHero);
    mainHero.update();
    mainHero.gold -= weaponCostUp;
    weaponCostUp += 150;
    return true;

}

function getRandomArmor(tier) {
    if (tier === maxTier) {
        return false;
    }

    if (mainHero.armor.tier === tier) {
        if (mainHero.gold < armorCostSame) return false;

        let choice = [];

        for (let i = 0; i < armor.length; i++)
            if (armor[i].tier === tier) choice.push(armor[i]);

        mainHero.armor.onChange(mainHero);
        mainHero.armor = choice[Math.floor(Math.random() * choice.length)];
        mainHero.armor.onEquip(mainHero);
        mainHero.update();
        mainHero.gold -= armorCostSame;
        armorCostSame += 10;
        return true;
    }
    if (mainHero.gold < armorCostUp) return false;

    let choice = [];

    for (let i = 0; i < armor.length; i++)
        if (armor[i].tier === tier) choice.push(armor[i]);

    mainHero.armor.onChange(mainHero);
    mainHero.armor = choice[Math.floor(Math.random() * choice.length)];
    mainHero.armor.onEquip(mainHero);
    mainHero.update();
    mainHero.gold -= armorCostUp;
    armorCostUp += 150;
    return true;

}

function getRandomMagic(){
    if (mainHero.gold >= magicCost) {
        mainHero.magic = spells[Math.floor(Math.random()*spells.length)];
        mainHero.update();
        mainHero.gold -= magicCost;
        magicCost += 50;
        return true;
    }
    return false;
}

function closeBattle(first, second) {
    if (first.isDead || second.isDead)
        return;

    game.pushMessage(`(${first.name}){${first.color}}( bumped with ){white}(${second.name}){${second.color}}( !){white}`);
    if (first.agility / 10 + rollDice(6, 2) > 6 + second.agility / 10) {
        let damage = rollDice(first.weapon.diceVal, first.weapon.diceCount) - second.armor.value + first.attack;
        let crit = (rollDice(20, 1) > 18) && (((first.weapon.diceVal - 1) * first.weapon.diceCount) <= damage);
        crit ? damage += damage : damage;
        damage > 0 ? (() => {
                second.hp -= damage;
                game.pushMessage(
                    `(${first.name} ){${first.color}}(attacked ){white}(${second.name} )` +
                    `{${second.color}}(with his ${first.weapon.name} for ` +
                    `${damage} damage! ){white}${(crit ? '(crit!){red}' : ' ')}`);
            })() :
            (() => {
                damage = 0;
                game.pushMessage(`(${first.name} ){${first.color}}` +
                                `(did not even scratch ){white}` +
                                `(${second.name}){${second.color}}(!){white}`)
            })();
        if (second.hp <= 0) {
            game.pushMessage(`(${second.name}){${second.color}}( is dead!){red}`);
            first.gold += second.gold;
            game.pushMessage(`(${first.name} gained ){white}(${second.gold}){#ffd700}( gold!){white}`);
            let potionRoll = rollDice(20,1);
            if(potionRoll > 18 && !mainHero.isDead) {
                mainHero.hpPotions++;
                game.pushMessage(`(You have found){white} (a health potion){green}`)
            }
            second.isDead = 1;
            return;
        }
    } else {
        game.pushMessage(`(${first.name}){${first.color}}( missed ){green}(${second.name}){${second.color}}( !){green}`);
    }
    if (second.agility / 10 + rollDice(6, 2) > 6 + first.agility / 10) {
        let damage = rollDice(second.weapon.diceVal, second.weapon.diceCount) - first.armor.value + second.attack;
        var crit = (rollDice(20, 1) > 18) && (((second.weapon.diceVal - 1) * second.weapon.diceCount) <= damage);
        crit ? damage += damage : damage;
        damage > 0 ? (() => {
                first.hp -= damage;
                game.pushMessage(
                    `(${second.name}){${second.color}}( attacked ){white}` +
                    `(${first.name}){${first.color}}( with his ${second.weapon.name} for ){white}` +
                    `(${damage} damage! ){white}${(crit ? '(crit!){red}' : ' ')}`);
            })() :
            (() => {
                damage = 0;
                game.pushMessage(`(${second.name}){${second.color}}` +
                                 `( did not hurt ){white}` +
                                 `(${first.name}){${first.color}}(!){white}`)
            })();
        if (first.hp <= 0) {
            game.pushMessage(`(${first.name} ){${first.color}}(is dead!){red}`);
            second.gold += first.gold;
            game.pushMessage(`(${second.name} gained ){white}(${first.gold}){#ffd700}( gold!){white}`);
            let potionRoll = rollDice(20,1);
            if(potionRoll > 18 && !mainHero.isDead) {
                mainHero.hpPotions++;
                game.pushMessage(`(You have found){white} (a health potion){green}`)
            }
            first.isDead = 1;
            return;
        }
    } else {
        game.pushMessage(`(${second.name}){${second.color}}( missed ){green}(${first.name}){${first.color}}( !){green}`);
    }
}


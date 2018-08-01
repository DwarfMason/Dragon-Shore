let potionCost;
let statCost;
let weaponCost;
let armorCost;

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
        potionCost += Math.floor(0.25*potionCost);
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
        statCost += Math.floor(0.25*statCost);
        console.log(mainHero.agility);
        return true;
    }
    return false;
}

function getRandomWeapon() {
    if (mainHero.gold >= weaponCost) {
        mainHero.weapon = weapons[Math.floor(Math.random()*weapons.length)];
        mainHero.update();
        mainHero.gold -= weaponCost;
        weaponCost += Math.floor(0.25*weaponCost);
        return true;

    }
    return false;
}

function getRandomArmor() {
    if (mainHero.gold >= armorCost) {
        mainHero.armor = armor[Math.floor(Math.random()*armor.length)];
        mainHero.update();
        mainHero.gold -= armorCost;
        armorCost += Math.floor(0.25*armorCost);
        return true;

    }
    return false;
}

function closeBattle(first, second) {
    game.pushMessage(`(${first.name}){${first.color}}( bumped with ){white}(${second.name}){${second.color}}( !){white}`);
    if (first.agility / 10 + rollDice(6, 2) > 6 + second.agility / 10) {
        let damage = rollDice(first.weapon.diceVal, first.weapon.diceCount) - second.armor.value + first.attack;
        var crit = (rollDice(20, 1) > 18) && (((first.weapon.diceVal - 1) * first.weapon.diceCount) <= damage);
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
            game.pushMessage(`(${second.name} gained ){white}(${second.gold}){#ffd700}( gold!){white}`);
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
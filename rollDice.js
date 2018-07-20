
function rollDice(diceVal, diceCount) {                     //Тут много функций на одно и то же, но так вызывать удобнее
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
        total += Math.floor(Math.random() * diceVal) + 1;
    }
    return total;
}


function closeBattle(first, second) {
    console.log(first.name, 'bumped with', second.name, '!');
    if (first.agility / 10 + rollDice(6, 2) > 6 + second.agility / 10) {
        let damage = rollDice(first.weapon.diceVal, first.weapon.diceCount) - second.armor.value + first.attack;
        var crit = (rollDice(20, 1) > 18) && (((first.weapon.diceVal - 1) * first.weapon.diceCount) <= damage);
        crit ? damage += damage : damage;
        damage > 0 ? (() => {
                second.hp -= damage;
                game.pushMessage(
                    `${first.name} attacked ${second.name} with his ${first.weapon.name} for ` +
                    `${damage} damage! ${(crit ? 'crit!' : ' ')}`);
            })() :
            (() => {
                damage = 0;
                game.pushMessage(`${first.name} did not even scratch ${second.name}!`)
            })();
        if (second.hp <= 0) {
            game.pushMessage(`${second.name} is dead!`);
            first.gold += second.gold;
            game.pushMessage(`You gained ${second.gold} gold!`);
            second.isDead = 1; //Это удалить побежденный обьект;
            return;
        }
    } else {
        console.log(first.name, 'missed', second.name, '!');
    }
    if (second.agility / 10 + rollDice(6, 2) > 6 + first.agility / 10) {
        let damage = rollDice(second.weapon.diceVal, second.weapon.diceCount) - first.armor.value + second.attack;
        var crit = (rollDice(20, 1) > 18) && (((second.weapon.diceVal - 1) * second.weapon.diceCount) <= damage);
        crit ? damage += damage : damage;
        damage > 0 ? (() => {
                first.hp -= damage;
                game.pushMessage(
                    `${second.name} attacked ${first.name} with his ${second.weapon.name} for ` +
                    `${damage} damage! ${(crit ? 'crit!' : ' ')}`);
            })() :
            (() => {
                damage = 0;
                game.pushMessage(`${second.name} did not hurt ${first.name}!`)
            })();
        if (first.hp <= 0) {
            game.pushMessage(`${first.name} is dead!`);
            second.gold += first.gold;
            game.pushMessage(`You gained ${first.gold} gold!`);
            first.isDead = 1;
            return;
        }
    } else {
        game.pushMessage(`${second.name} missed ${first.name}!`);
    }
}
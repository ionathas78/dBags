

function DiceBag({ initD4s = true, initD6s = true, initD8s = true, initD10s = true, initD12s = true, initD20s = true }) {
    const d4Rolls = [];
    const d6Rolls = [];
    const d8Rolls = [];
    const d10Rolls = [];
    const d12Rolls = [];
    const d20Rolls = [];

    if (initD4s) {
        let numberOfSides = 4;
        let diceArray = initDiceArray(numberOfSides);
        d4Rolls.push(...diceArray);
    }
    if (initD6s) {
        let numberOfSides = 6;
        let diceArray = initDiceArray(numberOfSides);
        d6Rolls.push(...diceArray);
    }
    if (initD8s) {
        let numberOfSides = 8;
        let diceArray = initDiceArray(numberOfSides);
        d8Rolls.push(...diceArray);
    }
    if (initD10s) {
        let numberOfSides = 10;
        let diceArray = initDiceArray(numberOfSides);
        d10Rolls.push(...diceArray);
    }
    if (initD12s) {
        let numberOfSides = 12;
        let diceArray = initDiceArray(numberOfSides);
        d12Rolls.push(...diceArray);
    }
    if (initD20s) {
        let numberOfSides = 20;
        let diceArray = initDiceArray(numberOfSides);
        d20Rolls.push(...diceArray);
    }

    function nextDie(numberOfSides, numberOfDice) {
        let returnArray = [];
        let arr;

        switch (numberOfSides) {
            case 4:
                arr = d4Rolls;
                break;
            case 6:
                arr = d6Rolls;
                break;
            case 8:
                arr = d8Rolls;
                break;
            case 10:
                arr = d10Rolls;
                break;
            case 12:
                arr = d12Rolls;
                break;
            case 20:
                arr = d20Rolls;
                break;
            default:
        }

        if (arr.length < numberOfDice) {
            let diceArray = initDiceArray(numberOfSides, Math.floor(numberOfDice / numberOfSides) + 1);
            arr.push(...diceArray);
        }

        for (let i = 0; i < numberOfDice; i++) {
            returnArray.push(arr.pop());
        }
        return returnArray;
    }

    function nextD100(numberOfDice) {
        let returnArray = [];
        if (d10Rolls.length < numberOfDice * 2) {
            let diceArray = initDiceArray(10);
            d10Rolls.push(...diceArray);
        }

        for (let i = 0; i < numberOfDice; i++) {
            let firstDigit = d10Rolls.pop();
            let secondDigit = d10Rolls.pop();

            if (firstDigit == 10 && secondDigit != 10) {
                firstDigit = 0;
            }
            if (secondDigit == 10) {
                secondDigit = 0;
            }

            returnArray.push(parseInt(firstDigit.toString() + secondDigit.toString()));
        }
        return returnArray;
    }

    return {
        d4: function(X = 1) {return nextDie(4, X)},
        d6: function(X = 1) {return nextDie(6, X)},
        d8: function(X = 1) {return nextDie(8, X)},
        d10: function(X = 1) {return nextDie(10, X)},
        d12: function(X = 1) {return nextDie(12, X)},
        d20: function(X = 1) {return nextDie(20, X)},
        d100: function(X = 1) {return nextD100(X)}
    }
}

function initDiceArray(numberOfSides, iterations = -1) {
    let returnArray = [];
    if (iterations < 1) {
        iterations = numberOfSides;
    }
    for (let i = 0; i < iterations; i++) {
        for (let j = 1; j <= numberOfSides; j++) {
            returnArray.push(j);
        }
        while (Math.random() > 0.5) {
            returnArray.push(Math.floor(Math.random() * numberOfSides) + 1)
        }
        returnArray.sort((a, b) => Math.random() - 0.5);
    }
    return returnArray;
}
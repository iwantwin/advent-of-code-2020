const input = document.getElementsByTagName('pre')[0].innerHTML;
const inputLines = input.split('\n');
const preambleLength = 25;

const setOfValidCombinations = [];
inputLines.forEach(inputLine => {
    const currentNumber = parseInt(inputLine, 10);
    if (!isNaN(currentNumber)) {
        if (setOfValidCombinations.length === preambleLength) {
            let foundValidCombination = false;
            for (let it = 0; it < setOfValidCombinations.length; it++) {
                const possibleCombinationNumber = setOfValidCombinations[it];
                const requiredOtherCombinationNumber = (currentNumber - possibleCombinationNumber);
                if (setOfValidCombinations.indexOf(requiredOtherCombinationNumber) !== -1) {
                    foundValidCombination = true;
                    break;
                }
            }
            if (!foundValidCombination) {
                console.warn('Number found that was nót the sum of the previous ' + preambleLength + ' items:', currentNumber);
            }

            setOfValidCombinations.shift();
        }
        setOfValidCombinations.push(currentNumber);
    }
});
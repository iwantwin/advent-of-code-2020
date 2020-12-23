const input = document.getElementsByTagName('pre')[0].innerHTML;
const inputLines = input.split('\n');
const preambleLength = 25;

let firstIncorrectNumber = undefined;
const setOfValidCombinations = [];
inputLines.forEach(inputLine => {
    const currentNumber = parseInt(inputLine, 10);
    if (!isNaN(currentNumber) && firstIncorrectNumber === undefined) {
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
                firstIncorrectNumber = currentNumber;
            }

            setOfValidCombinations.shift();
        }
        setOfValidCombinations.push(currentNumber);
    }
});

let contiguousNumbers = [];
let contiguousSumFound = false;
for (let mainIt = 0; mainIt < inputLines.length; mainIt++) {
    const mainNumber = parseInt(inputLines[mainIt], 10);
    if (!isNaN(mainNumber)) {
        const contiguousRange = [mainNumber];
        let contiguousSum = mainNumber;
        for (let subIt = (mainIt + 1); subIt < inputLines.length; subIt++) {
            const subNumber = parseInt(inputLines[subIt], 10);
            if (!isNaN(subNumber)) {
                contiguousRange.push(subNumber);
                contiguousSum += subNumber;
                if (contiguousSum === firstIncorrectNumber) {
                    contiguousSumFound = true;
                    contiguousNumbers = contiguousRange;
                    break;
                } else if( contiguousSum >= firstIncorrectNumber ) {
                    break;
                }
            }
        }
        if (contiguousSumFound) {
            break;
        }
    }
}
if (contiguousSumFound) {
    console.log('Sum found in range: ', contiguousNumbers);

    const orderedRange = contiguousNumbers.sort((a, b) => {
        return a - b;
    });
    const encryptionWeakNess = orderedRange[0] + orderedRange[orderedRange.length - 1];

    console.log('Encryption weakness: ', encryptionWeakNess);
}
const fs = require('fs');
const input = fs.readFileSync('day10part2-input.txt', {encoding: 'utf-8'});

const inputLines = input.split('\n').map(inputLine => parseInt(inputLine, 10)).filter(inputLine => !isNaN(inputLine)).sort((a, b) => a - b);

const outletJolts = 0;
const highestJoltAdapter = inputLines[inputLines.length - 1];

function determineDistinctivePathsForOptions(options) {
    const result = {
        completed: options.completed,
        checking: {}
    };
    const checkingKeys = Object.keys( options.checking );
    for (let it = 0; it < checkingKeys.length; it++) {
        const option = parseInt(checkingKeys[it], 10);
        const distinctArrangementsSoFar = parseInt(options.checking[option], 10);

        const possibleNextAdapters = inputLines.filter(inputLine => {
            return (inputLine > option && inputLine <= (option + 3));
        });
        possibleNextAdapters.forEach(possibleNextAdapter => {
            if (possibleNextAdapter === highestJoltAdapter) {
                result.completed += distinctArrangementsSoFar;
            } else {
                if( !result.checking.hasOwnProperty( possibleNextAdapter ) ) {
                    result.checking[ possibleNextAdapter ] = 0;
                }
                result.checking[ possibleNextAdapter ] += distinctArrangementsSoFar;
            }
        });
    }
    if (Object.keys( result.checking ).length === 0) {
        return result;
    } else {
        return determineDistinctivePathsForOptions(result);
    }
}

const data = {
    completed: 0,
    checking: {}
};
data.checking[outletJolts] = 1;
const result = determineDistinctivePathsForOptions(data);
console.log(result.completed);
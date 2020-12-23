const input = document.getElementsByTagName('pre')[0].innerHTML;
const inputLines = input.split('\n').map(inputLine => parseInt(inputLine, 10)).filter(inputLine => !isNaN(inputLine)).sort((a, b) => a - b);

const differences = {
    1: 0,
    2: 0,
    3: 0
};
for( let it = 0; it < inputLines.length; it++ ) {
    const inputLine = inputLines[it];
    if( it === 0 ) {
        differences[inputLine]++;
    }
    if( ( it + 1 ) !== inputLines.length ) {
        const nextInputLine = inputLines[it + 1];
        const diff = nextInputLine - inputLine;
        differences[diff]++;
    } else {
        differences[3]++;
    }
}
console.log( differences[1] * differences[3] );
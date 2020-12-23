const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');

const linesExecuted = [];
let accumulator = 0;

function handleCommand( lineNumber ) {
    if( linesExecuted.indexOf( lineNumber ) === -1 ) {
        linesExecuted.push( lineNumber );
    } else {
        throw new Error( 'Infinite loop detected' );
    }

    const line = inputLines[lineNumber];
    const [command, value] = line.split(' ');
    if( command === 'acc' ) {
        accumulator = eval(accumulator.toString()  + value);
        handleCommand(lineNumber + 1 );
    } else if( command === 'nop' ) {
        handleCommand(lineNumber + 1 );
    } else if( command === 'jmp' ) {
        handleCommand(eval ( lineNumber.toString() + value ) );
    }
}

try {
    handleCommand(0);
} catch(e) {
    console.log('Just before the infinite loop was detected, the accumulator had the value: ', accumulator);
}
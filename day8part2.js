const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');

function runProgram(lineToTurn, newCommand) {
    const linesExecuted = [];
    const commandsExecuted = [];
    let accumulator = 0;

    function handleCommand(lineNumber) {
        let line = inputLines[lineNumber];

        if (lineToTurn === lineNumber) {
            line = newCommand;
        }

        if (linesExecuted.indexOf(lineNumber) === -1) {
            linesExecuted.push(lineNumber);
            commandsExecuted.push({lineNumber, line});
        } else {
            throw new Error('Infinite loop detected');
        }

        const [command, value] = line.split(' ');
        if (command === 'acc') {
            accumulator = eval(accumulator.toString() + value);
            handleCommand(lineNumber + 1);
        } else if (command === 'nop') {
            handleCommand(lineNumber + 1);
        } else if (command === 'jmp') {
            handleCommand(eval(lineNumber.toString() + value));
        }
    }

    try {
        handleCommand(0);
        return {
            result: true,
            linesExecuted,
            commandsExecuted,
            accumulator
        };
    } catch (e) {
        return {
            result: false,
            linesExecuted,
            commandsExecuted,
            accumulator
        };
    }
}

function getInstructions(attemptsToFix, commandsExecuted) {
    let skippedValidCommands = 0;
    for (let it = (commandsExecuted.length - 1); it >= 0; it--) {
        const commandExecuted = commandsExecuted[it];
        const [command, value] = commandExecuted.line.split(' ');
        if (command === 'jmp') {
            if (skippedValidCommands === attemptsToFix) {
                return {
                    line: commandExecuted.lineNumber,
                    command: 'nop ' + value
                };
            } else {
                skippedValidCommands++;
            }
        }
    }
    for (let it = (commandsExecuted.length - 1); it >= 0; it--) {
        const commandExecuted = commandsExecuted[it];
        const [command, value] = commandExecuted.line.split(' ');
        if (command === 'nop') {
            if (skippedValidCommands === attemptsToFix) {
                return {
                    line: commandExecuted.lineNumber,
                    command: 'jmp ' + value
                };
            } else {
                skippedValidCommands++;
            }
        }
    }
    return undefined;
}

const initialResults = runProgram();
let attemptsToFix = 0;
let solutionFound = false;
let attemptsLeft = true;
while (solutionFound === false && attemptsLeft === true) {
    attemptsToFix++;

    const nextAttemptInstructions = getInstructions(attemptsToFix, initialResults.commandsExecuted);
    if (nextAttemptInstructions === undefined) {
        attemptsLeft = false;
    } else {
        const results = runProgram(nextAttemptInstructions.line, nextAttemptInstructions.command);
        if (results.result === true) {
            solutionFound = true;
            console.log('Program fixed by changing line ', nextAttemptInstructions.line, ' to ', nextAttemptInstructions.command);
            console.log('After running successfully, the accumulator was ', results.accumulator);
        }
    }
}
if (solutionFound === false && attemptsLeft === false) {
    console.log('Program failed to find solution');
}
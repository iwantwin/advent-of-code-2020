const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');
const bagDefinitions = {};
inputLines.forEach(inputLine => {
    const [definition, contentStatement] = inputLine.split('contain');
    if (definition !== undefined && contentStatement !== undefined) {
        const bagName = definition.substring(0, definition.indexOf(' bag'));

        bagDefinitions[bagName] = [];

        const contents = contentStatement.split(',');
        contents.forEach((content) => {
            content = content.trim();
            const amountAndName = content.substring(0, content.indexOf(' bag'));
            const regex = /([0-9]*)([^0-9]*)/g;
            const matches = regex.exec(amountAndName);
            if (matches !== null) {
                bagDefinitions[bagName].push({
                    name: matches[2].trim(),
                    amount: parseInt(matches[1], 10)
                });
            } else {
                console.error('oops! mistake in regex?');
            }
        });
    }
});
console.log(bagDefinitions);

const lookingForBagsThatCanContainBag = 'shiny gold';
const bagsFound = [];
let bagsChecking = [];
let bagsToCheck = [lookingForBagsThatCanContainBag];

function checkBags() {
    if( bagsToCheck.length > 0 ) {
        bagsChecking = bagsToCheck;
        bagsToCheck = [];

        for( const bagName in bagDefinitions ) {
            if( bagDefinitions.hasOwnProperty(bagName) && bagsFound.indexOf( bagName ) === -1 ) {
                const bagContents = bagDefinitions[bagName];
                const matchingContent = bagContents.some( bagContent => bagsChecking.indexOf( bagContent.name ) !== -1 );
                if( matchingContent && bagsFound.indexOf( bagName ) === -1 ) {
                    bagsFound.push( bagName );
                    bagsToCheck.push( bagName );
                }
            }
        }

        checkBags();
    }
}

debugger;
checkBags();
console.log( bagsFound );
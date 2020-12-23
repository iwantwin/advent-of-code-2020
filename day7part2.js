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
                const contentBagName = matches[2].trim();
                if (contentBagName !== 'no other') {
                    bagDefinitions[bagName].push({
                        name: contentBagName,
                        amount: parseInt(matches[1], 10)
                    });
                }
            } else {
                console.error('oops! mistake in regex?');
            }
        });
    }
});
const checkingHowManyBagsTotalInsideForBag = 'shiny gold';

function checkTotalBagsInside(bagName) {
    let count = 0;
    bagDefinitions[bagName].forEach(content => {
        count = count + content.amount + ( checkTotalBagsInside(content.name) * content.amount );
    });
    return count;
}

console.log(checkTotalBagsInside(checkingHowManyBagsTotalInsideForBag));
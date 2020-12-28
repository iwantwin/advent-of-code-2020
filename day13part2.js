const input = document.getElementsByTagName('pre')[0].innerHTML;
const [earliestTimestamps, busList] = input.split('\n');
const bussesData = busList.split(',').map((bus, index) => {
    return {
        bus: parseInt(bus, 10),
        minutesAfterTimestamp: index,
        incrementFactor: Math.floor( index / bus )
    };
}).filter(line => !isNaN(line.bus));

let timeStamp = 1;
let timeStampIncrement = 1;
for (let it = 0; it < bussesData.length; it++) {
    const busData = bussesData[it];
    while (true) {
        let amountOfDeparturesAfterTimestamp = Math.floor( timeStamp / busData.bus ) - busData.incrementFactor;
        let minutesUntilDeparture = busData.bus - (timeStamp % busData.bus);
        if (minutesUntilDeparture === busData.bus) {
            minutesUntilDeparture = 0;
        }
        minutesUntilDeparture = minutesUntilDeparture + (busData.incrementFactor * busData.bus);
        if ( amountOfDeparturesAfterTimestamp > 0 && minutesUntilDeparture === busData.minutesAfterTimestamp) {
            timeStampIncrement = timeStampIncrement * busData.bus;
            break;
        } else {
            timeStamp += timeStampIncrement;
        }
    }
}
console.log(timeStamp);
const input = document.getElementsByTagName('pre')[0].innerHTML;
const [earliestTimestamps, busList] = input.split('\n');
const earliestDeparturePerBus = busList.split(',').filter(bus => bus !== 'x').map( bus => {
    return {
        bus,
        earliestDeparture: bus - (earliestTimestamps % bus)
    };
} ).sort( (a,b) => a.earliestDeparture - b.earliestDeparture );

const firstOption = earliestDeparturePerBus[0];
console.log( firstOption.bus * firstOption.earliestDeparture );
const input = document.getElementsByTagName('pre')[0].innerHTML;
const inputLines = input.split('\n').filter(row => row.length > 0);

let waypointNorth = 1;
let waypointEast = 10;

let shipNorth = 0;
let shipEast = 0;

inputLines.forEach((command, index) => {
    const mutation = command.substr(0, 1);
    const amount = parseInt(command.substr(1), 10);

    let newWaypointNorth = waypointNorth;
    let newWaypointEast = waypointEast;

    switch (mutation) {
        case 'N':
            newWaypointNorth += amount;
            break;
        case 'E':
            newWaypointEast += amount;
            break;
        case 'W':
            newWaypointEast -= amount;
            break;
        case 'S':
            newWaypointNorth -= amount;
            break;
        case 'R':
            switch( amount ) {
                case 90:
                    newWaypointNorth = 0 - waypointEast;
                    newWaypointEast = waypointNorth;
                    break;
                case 180:
                    newWaypointNorth = 0 - waypointNorth;
                    newWaypointEast =  0 - waypointEast
                    break;
                case 270:
                    newWaypointNorth = waypointEast;
                    newWaypointEast = 0 - waypointNorth;
                    break;
            }
            break;
        case 'L':
            switch( amount ) {
                case 90:
                    newWaypointNorth = waypointEast;
                    newWaypointEast = 0 - waypointNorth;
                    break;
                case 180:
                    newWaypointNorth = 0 - waypointNorth;
                    newWaypointEast = 0 - waypointEast;
                    break;
                case 270:
                    newWaypointNorth = 0 - waypointEast;
                    newWaypointEast = waypointNorth;
                    break;
            }
            break;
        case 'F':
            shipNorth = shipNorth + ( waypointNorth * amount );
            shipEast = shipEast + ( waypointEast * amount );
            break;
    }
    waypointNorth = newWaypointNorth;
    waypointEast = newWaypointEast;
});

console.log('manhattan position: ', Math.abs(shipNorth) + Math.abs(shipEast));
const input = document.getElementsByTagName('pre')[0].innerHTML;
const inputLines = input.split('\n').filter(row => row.length > 0);

let north = 0;
let east = 0;
let rotation = 90;

inputLines.forEach((command) => {
    const mutation = command.substr(0, 1);
    const amount = parseInt(command.substr(1), 10);

    switch (mutation) {
        case 'N':
            north += amount;
            break;
        case 'E':
            east += amount;
            break;
        case 'W':
            east -= amount;
            break;
        case 'S':
            north -= amount;
            break;
        case 'R':
            rotation = (rotation + amount) % 360;
            break;
        case 'L':
            rotation = (rotation - amount) % 360;
            break;
        case 'F':
            if (rotation === 0) {
                north += amount;
            } else if (rotation === 90) {
                east += amount;
            } else if (rotation === 180) {
                north -= amount;
            } else if (rotation === 270) {
                east -= amount;
            }
            break;
    }
    if( rotation < 0 ) {
        rotation += 360;
    }
});

console.log('manhattan position: ', Math.abs(north) + Math.abs(east));
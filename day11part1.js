const input = document.getElementsByTagName('pre')[0].innerHTML;
const inputLines = input.split('\n').map(inputLine => inputLine.split('')).filter(row => row.length > 0);

const maxRows = inputLines.length;
const maxColumns = inputLines[0].length;
const maxSeats = maxRows * maxColumns;

const SeatStatus = {
    Empty: 'L',
    Occupied: '#',
    Floor: '.'
}

function getSeatStatus(floorPlan, row, column) {
    if (row >= 0 && row < maxRows && column >= 0 && column < maxColumns) {
        return floorPlan[row][column];
    } else {
        return undefined;
    }
}

function isOccupiedSeat(floorPlan, row, column) {
    return getSeatStatus(floorPlan, row, column) === '#';
}

function getNrOccupiedAdjacentSeats(floorPlan, row, column) {
    return [
        (/*leftTop*/ isOccupiedSeat(floorPlan, row - 1, column - 1) ? 1 : 0),
        (/*top*/ isOccupiedSeat(floorPlan, row - 1, column) ? 1 : 0),
        (/*rightTop*/ isOccupiedSeat(floorPlan, row - 1, column + 1) ? 1 : 0),
        (/*left*/ isOccupiedSeat(floorPlan, row, column - 1) ? 1 : 0),
        (/*right*/ isOccupiedSeat(floorPlan, row, column + 1) ? 1 : 0),
        (/*leftBottom*/ isOccupiedSeat(floorPlan, row + 1, column - 1) ? 1 : 0),
        (/*bottom*/ isOccupiedSeat(floorPlan, row + 1, column) ? 1 : 0),
        (/*rightBottom*/ isOccupiedSeat(floorPlan, row + 1, column + 1) ? 1 : 0),
    ].reduce((acc, currentValue) => {
        return acc + currentValue;
    }, 0);
}

function applyRules(floorPlan, round) {
    const resultingFloorPlan = [...floorPlan.map(row => [...row])];
    let didAnySeatChange = false;
    for (let it = 0; it < maxSeats; it++) {
        const row = Math.floor(it / maxColumns);
        const column = it % maxColumns;

        const status = getSeatStatus(floorPlan, row, column);
        const amountOccupiedSeatsAround = getNrOccupiedAdjacentSeats(floorPlan, row, column);
        switch (status) {
            case SeatStatus.Empty:
                if (amountOccupiedSeatsAround === 0) {
                    resultingFloorPlan[row][column] = SeatStatus.Occupied;
                    didAnySeatChange = true;
                }
                break;
            case SeatStatus.Occupied:
                if (amountOccupiedSeatsAround >= 4) {
                    resultingFloorPlan[row][column] = SeatStatus.Empty;
                    didAnySeatChange = true;
                }
                break;
        }
    }
    if (didAnySeatChange) {
        // console.log('round ' + round + ':\n', resultingFloorPlan.map( row => row.join('')) );
        return applyRules(resultingFloorPlan, (round + 1))
    } else {
        return {
            round,
            occupiedSeats: floorPlan.reduce((acc, current) => {
                return acc + (current.filter(seat => seat === SeatStatus.Occupied).length)
            }, 0)
        };
    }
}

const result = applyRules(inputLines, 1);
console.log(result);
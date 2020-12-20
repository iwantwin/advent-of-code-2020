function decryptBoardingPass( boardingPass ) {
  function getSeatId( row, column ) {
    return (row * 8) + column;
  }
  
  function determinePosition( positionSequence, amountOfPositions, lowerChar ) {
     let minRow = 1
     let maxRow = amountOfPositions
     
     const positionCharacters = positionSequence.split('');
     positionCharacters.forEach( positionChar => {
       const rowsLeft = ((maxRow - minRow) + 1);
       if( positionChar === lowerChar ) {
         maxRow = (minRow + (rowsLeft / 2)) - 1;
       } else {
         minRow = (maxRow - (rowsLeft / 2)) + 1;
       }
     } );
     
     return minRow - 1;
  }
  
  const row = determinePosition( boardingPass.substr( 0,7 ), 128, 'F' );
  const column = determinePosition( boardingPass.substr( 7,3 ), 8, 'L' );
  const seatId = getSeatId( row, column );
  return {
    row: row,
    column: column,
    seatId: seatId
  };
}

// Given test cases
// console.log( 'BFFFBBFRRR', decryptBoardingPass('BFFFBBFRRR') );
// console.log( 'FFFBBBFRRR', decryptBoardingPass('FFFBBBFRRR') );
// console.log( 'BBFFBBFRLL', decryptBoardingPass('BBFFBBFRLL') );

const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');
let boardingPassWithHighestSeatId = undefined;
inputLines.forEach( inputLine => {
  const boardingPass = decryptBoardingPass( inputLine );
  if( boardingPassWithHighestSeatId === undefined || boardingPassWithHighestSeatId.seatId < boardingPass.seatId ) {
    boardingPassWithHighestSeatId = boardingPass;
  }
} );
console.log( boardingPassWithHighestSeatId.seatId );

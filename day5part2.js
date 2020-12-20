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

const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');
const boardingPasses = inputLines.map( inputLine => decryptBoardingPass( inputLine ) );
const foundSeatIds = boardingPasses.map( boardingPass => boardingPass.seatId );
for( let it = 0; it < foundSeatIds.length; it++ ) {
  const seatId = foundSeatIds[it];
  if( foundSeatIds.indexOf( seatId + 1 ) === -1 && foundSeatIds.indexOf( seatId + 2 ) !== -1 ) {
    console.log( seatId + 1 );
    break;
  }
}

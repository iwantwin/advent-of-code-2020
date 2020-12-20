const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');

function traverse( startingPositionHeight, startingPositionWdith, moveDown, moveRight ) {
  const newPositionHeight = startingPositionHeight + moveDown;
  const newPositionWidth = startingPositionWdith + moveRight;
  let hasTree = false;

  if( inputLines.length >= newPositionHeight ) {
    const heightLine = inputLines[ newPositionHeight - 1 ];
    const positions = heightLine.split('');
    const position = positions[ ( (newPositionWidth -1) % positions.length) ];
    hasTree = position !== undefined && position === '#';
  }
  
  return {
    height: newPositionHeight,
    width: newPositionWidth,
    hasTree: hasTree
  };
}

function findTreesForTrajectory( patternDown, patternRight ) {
  let positionHeight = 1;
  let positionWidth = 1;
  const height = inputLines.length;

  let treesEncountered = 0;
  while( positionHeight <= inputLines.length ) {
    const res = traverse( positionHeight, positionWidth, patternDown, patternRight );
     if( res.hasTree ) {
       treesEncountered++;
     }
     positionHeight = res.height;
     positionWidth = res.width;
  }
  return treesEncountered;
}

const trajectories = [
  [1,1],
  [1,3],
  [1,5],
  [1,7],
  [2,1]
];
let result = 0;
trajectories.forEach( ( [patternDown, patternRight] ) => {
  const treesOnTrajectory = findTreesForTrajectory( patternDown, patternRight );
  if( result === 0 ) {
    result = treesOnTrajectory;
  } else {
    result = ( result * treesOnTrajectory );
  }
} );
console.log(result);

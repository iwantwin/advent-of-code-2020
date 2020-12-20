// Test code
/** const inputLines = [
  '..##.........##.........##.........##.........##.........##.......',
  '#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..',
  '.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.',
  '..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#',
  '.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.',
  '..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....',
  '.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#',
  '.#........#.#........#.#........#.#........#.#........#.#........#',
  '#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...',
  '#...##....##...##....##...##....##...##....##...##....##...##....#',
  '.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#'
]; */

const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');

let positionHeight = 1;
let positionWidth = 1;
const height = inputLines.length;

function traverse( startingPositionHeight, startingPositionWdith, moveDown, moveRight ) {
  const newPositionHeight = startingPositionHeight + moveDown;
  const newPositionWidth = startingPositionWdith + moveRight;
  let hasTree = false;

  if( inputLines.length >= newPositionHeight ) {
    const heightLine = inputLines[ newPositionHeight - 1 ];
    const positions = heightLine.split('');
    const position = positions[ ( (newPositionWidth -1) % positions.length) ];
    hasTree = position !== undefined && position === '#';
    
//  // Replace map
//  positions[ ( (newPositionWidth -1) % positions.length) ] =  hasTree ? 'X' : 'O';
//  inputLines[ newPositionHeight - 1 ] = positions.join('');
  }
  
  return {
    height: newPositionHeight,
    width: newPositionWidth,
    hasTree: hasTree
  };
}

let treesEncountered = 0;
while( positionHeight <= inputLines.length ) {
  const res = traverse( positionHeight, positionWidth, 1, 3 );
   if( res.hasTree ) {
     treesEncountered++;
   }
   positionHeight = res.height;
   positionWidth = res.width;
}
console.log( treesEncountered );
// console.log('outputMap');
// console.log( inputLines.join('\n') );

const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');
const allGroups = [];
let groupAnswers = 'abcdefghijklmnopqrstuvwxyz'.split('');
inputLines.forEach( inputLine => {
  if( inputLine === '' ) {
    allGroups.push( groupAnswers );
    groupAnswers = 'abcdefghijklmnopqrstuvwxyz'.split('');
  } else {
    const personAnswers = inputLine.split("");
    for( let it = (groupAnswers.length - 1); it >= 0; it-- ) {
      const groupAnswer = groupAnswers[it];
      if( personAnswers.indexOf(groupAnswer) === -1 ) {
        groupAnswers.splice( it, 1 );
      }
    }
  }
} );

let totalAnswerCount = 0;
allGroups.forEach( group => {
  totalAnswerCount += group.length;
} );
console.log( totalAnswerCount );

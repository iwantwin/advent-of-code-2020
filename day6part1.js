const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');
const allGroups = [];
let groupAnswers = [];
inputLines.forEach( inputLine => {
  if( inputLine === '' ) {
    allGroups.push( groupAnswers );
    groupAnswers = [];
  } else {
    const personAnswers = inputLine.split("");
    personAnswers.forEach( personAnswer => {
      if( groupAnswers.indexOf(personAnswer) === -1 ) {
        groupAnswers.push( personAnswer );
      }
    } );
  }
} );

if( groupAnswers.length > 0 ) {
  allGroups.push( groupAnswers );
}
let totalAnswerCount = 0;
allGroups.forEach( group => {
  totalAnswerCount += group.length;
} );
console.log( totalAnswerCount );

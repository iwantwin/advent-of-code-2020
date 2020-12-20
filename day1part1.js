function findAnswerFromItems( expectedAnswer, expenses ) {
  for( let it = 0; it < expenses.length; it++ ) {
    const expense = parseInt(expenses[it], 10);
    const requiredAnswer = expectedAnswer - expense;
    if( expenses.indexOf( requiredAnswer.toString(), it ) !== -1 ) {
      return (expense * requiredAnswer);
    }
  }
}

const expectedAnswer = 2020;
const expenses = document.getElementsByTagName('pre')[0].innerHTML.split('\n');
console.log( findAnswerFromItems( expectedAnswer, expenses ) );

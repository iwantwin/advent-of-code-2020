const expectedAnswer = 2020;
const expectedParts = 3;
const expenses = document.getElementsByTagName('pre')[0].innerHTML.split('\n');

function findExpensesTotalling( expectedAnswer, expenses, expectedParts ) {
  expenses = expenses.map( expense => parseInt( expense, 10 ) );
  expenses.sort();
  
  for( let it = 0; it < expenses.length; it++ ) {
    const expense = expenses[it];
    if ( expense <= expectedAnswer ) {
      if( expectedParts > 2 ) {
        const answer = findExpensesTotalling( expectedAnswer - expense, expenses.slice( it + 1 ), expectedParts - 1 );
        if( answer !== undefined ) {
          return answer * expense;
        }
      } else {
        const requiredExpense = expectedAnswer - expense;
        if( expenses.indexOf( requiredExpense ) !== -1 ) {
          return expense * requiredExpense;
        }
      }
    }
  }
  return undefined;
}

console.log( findExpensesTotalling( expectedAnswer, expenses, expectedParts ) );

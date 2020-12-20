let result = 0;
const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');
inputLines.forEach( inputLine => {
  const [policy, password] = inputLine.split(':').map( part => part.trim() );
  const [allowedOccurences, letter] = policy.split(' ').map( part => part.trim() );
  const [min, max] = allowedOccurences.split('-');
  const policyRegex = new RegExp( letter , 'g' );
    if( password ) {
      const occurences = (password.match( policyRegex ) || []).length;

      if( occurences, occurences >= min && occurences <= max  ) {
        result++;
      }
    }
} );
console.log( result );

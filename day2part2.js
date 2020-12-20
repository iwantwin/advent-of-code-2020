let result = 0;
const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');
inputLines.forEach( inputLine => {
  if( inputLine.trim() !== '' ) {
      const [policy, password] = inputLine.split(':').map( part => part.trim() );
      const [positions, letter] = policy.split(' ').map( part => part.trim() );
      const [firstPosition, secondPosition] = positions.split('-').map( position => parseInt( position, 10 ) );
      const passwordChars = password.split('');
      if( 
        (passwordChars[ firstPosition - 1 ] === letter || passwordChars[ secondPosition -1 ] === letter)
        && !(passwordChars[ firstPosition - 1 ] === letter && passwordChars[ secondPosition -1 ] === letter)
      ) {
        result++;
      }
  }
} );
console.log( result );

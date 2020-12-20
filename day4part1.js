const inputLines = document.getElementsByTagName('pre')[0].innerHTML.split('\n');

const validPassports = [];
const invalidPassports = [];

function validatePassport( passport ) {
   const requiredFields = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ];
   for( let it = 0; it < requiredFields.length; it++ ) {
      const requiredField = requiredFields[it];
      if( !passport.hasOwnProperty(requiredField) ) {
        return false;
      }
   }
   return true;
}

let passport = {};
inputLines.forEach( inputLine => {
  if( inputLine.trim() ===  '' ) {
    if( Object.keys( passport ).length > 0 ) {
      if( validatePassport( passport ) ) {
         validPassports.push(passport);
      } else {
         invalidPassports.push(passport);
      }
    }
    passport = {};
  } else {
    const keyValuePairs = inputLine.split(' ');
    keyValuePairs.forEach( keyValuePair => {
      const [key, value] = keyValuePair.split(':');
      passport[key] = value;
    } );
  }
} );

console.log( validPassports.length );

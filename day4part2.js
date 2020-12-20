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
   
   const byr = parseInt( passport.byr, 10 );
   if( byr < 1920  || byr  > 2002 ) {
     return false;
   }
   const iyr = parseInt( passport.iyr, 10 );
   if( iyr < 2010  || iyr  > 2020 ) {
     return false;
   }
   const eyr = parseInt( passport.eyr, 10 );
   if( eyr < 2020  || eyr  > 2030 ) {
     return false;
   }
   const measureUnit = passport.hgt.substr(-2);
   const height = parseInt( passport.hgt.substring( 0, passport.hgt.length - measureUnit.length ), 10 );
   if( 
      ( measureUnit === 'cm' && (height < 150  || height  > 193) )
      || ( measureUnit === 'in' && (height < 59  || height  > 76) )
      || ( measureUnit !== 'cm' && measureUnit !== 'in' )
   ) {
     return false;
   }
   if( !(/#[0-9a-f]{6}/g.test( passport.hcl )) ) {
      return false;
   }
   if( ['amb', 'blu', 'brn', 'gry', 'grn',  'hzl',  'oth'].indexOf( passport.ecl ) === -1 ) {
     return false;
   }
   if( !( /^[0-9]{9}$/g.test( passport.pid ) ) ) {
     return false;
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

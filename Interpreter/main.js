"use strict";

const { parseProgram, parseExpression } = require("../include/parser.js");
const {
  interpExpression,
  interpStatement,
  interpProgram,
} = require("./interpreter.js");

const program = `
  let n = 20;

  let a = 1;
  let b = 1; 

  while (n > 0) {
    let c = b;

    b = b + a;

    a = c;

    n = n - 1;
  }

  print(b);
`;

const st = interpProgram(parseProgram("let x = undefined;").value);

const result = parseProgram(program);

if (result.ok) {
  try {
    const state = interpProgram(result.value);
    console.log(`Program successfully terminated: ${JSON.stringify(state)}`);
  } catch (e) {
    console.log("Runtime Error: " + e);
  }
} else {
  console.log("Parsing Error: " + result.message);
}

let x = false;
if(-5) {
  console.log("got here")
  x = true;
} else{
   x = false;
  }
  console.log(x);

//if(3 > 4){return 5;} else {return 6;}

// let x = false;
// let y = true;
// console.log((x - y) / 100005);

// if (5 && 0) {
//   console.log("hi");
// }

//console.log(2 && 1)

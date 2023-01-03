"use strict";

const assert = require("assert");
const { parseExpression, parseProgram } = require("../include/parser.js");
const {
  interpExpression,
  interpStatement,
  interpProgram,
} = require("./interpreter.js");

test("1: interpExpression interprets multiplication with a variable", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x * 2").value);
  assert(r === 20);
});

test("2: interpExpression interprets addition with a variable", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x + 2").value);
  assert(r === 12);
});

test("3: interpExpression interprets subtraction with a variable", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x - 2").value);
  assert(r === 8);
});

test("4: interpExpression interprets division with a variable", () => {
  const r = interpExpression({ x: 2.0 }, parseExpression("x / 2").value);
  assert(r === 1);
});

test("5: interpExpression interprets does not work with two different types", () => {
  assert.throws(
    () => interpExpression({ x: "Hi" }, parseExpression("x + 2").value),
    Error
  );
});

test("6: interpExpression interprets greater than with a variable", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x > 2").value);
  assert(r);
});

test("7: interpExpression interprets less than with a variable", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x < 2").value);
  assert(r === false);
});

test("8: interpExpression interprets logical and comparison operators correctly", () => {
  const r = interpExpression(
    { x: 10 },
    parseExpression("x > 9 && x === 10").value
  );
  assert(r);
});

test("9: interpExpression interprets logical and comparison operators correctly", () => {
  const r = interpExpression(
    { x: 10 },
    parseExpression("x < 9 || x === 10").value
  );
  assert(r);
});

test("10: Equality operator works for different types", () => {
  const r = interpExpression({ x: true }, parseExpression("x === 10").value);
  assert(r === false);
});

test("11: Equality operator works for boolean types", () => {
  const r = interpExpression({ x: true }, parseExpression("x === false").value);
  assert(r === false);
});

test("12: Equality operator works for number types", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x === 9").value);
  assert(r === false);
});

test("13: Arithmetic operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: 1 }, parseExpression("x + true").value),
    /Types are not the same for operation./
  );
});

test("14: Arithmetic operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: true }, parseExpression("x + true").value),
    /Types are not the same for operation./
  );
});

test("15: Arithmetic operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: 1 }, parseExpression("x - true").value),
    /Types are not the same for operation./
  );
});

test("16: Arithmetic operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: false }, parseExpression("x - true").value),
    /Types are not the same for operation./
  );
});

test("17: Arithmetic operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: 1 }, parseExpression("x / true").value),
    /Types are not the same for operation./
  );
});

test("18: Arithmetic operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: true }, parseExpression("x / true").value),
    /Types are not the same for operation./
  );
});

test("19: Arithmetic operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: 1 }, parseExpression("x * true").value),
    /Types are not the same for operation./
  );
});

test("20: Arithmetic operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: true }, parseExpression("x * true").value),
    /Types are not the same for operation./
  );
});

test("21: Greater/Less than operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: 0 }, parseExpression("x > true").value),
    /Types are not the same for operation./
  );
});

test("22: Greater/Less than operator throws error for different types/boolean types", () => {
  assert.throws(
    () => interpExpression({ x: true }, parseExpression("x < true").value),
    /Types are not the same for operation./
  );
});

test("23: Logical operator throws error for different types/number types", () => {
  assert.throws(
    () => interpExpression({ x: 1 }, parseExpression("x || true").value),
    /Types are not the same for operation./
  );
});

test("24: Logical operator throws error for different types/number types", () => {
  assert.throws(
    () => interpExpression({ x: 1 }, parseExpression("x || 10").value),
    /Types are not the same for operation./
  );
});

test("25: Logical operator throws error for different types/number types", () => {
  assert.throws(
    () => interpExpression({ x: 0 }, parseExpression("x && 10").value),
    /Types are not the same for operation./
  );
});

test("26: Logical operator throws error for different types/number types", () => {
  assert.throws(
    () => interpExpression({ x: 0 }, parseExpression("x && true").value),
    /Types are not the same for operation./
  );
});

test("27: Invalid operator should throw an error", () => {
  assert.throws(
    () => interpExpression({ x: 5.5, y: 0 }, parseExpression(" x >= y ").value),
    /Expression is not read by parser./
  );
});

test("28: interpProgram interprets basic declaration then assignment", () => {
  const st = interpProgram(parseProgram("let x = 10; x = 20;").value);
  assert(st.x === 20);
});

test("29: interpProgram interprets if-else statement correctly", () => {
  const st = interpProgram(
    parseProgram("let x = 10; if (x === 10) { x = 2; } else { x = 20;}").value
  );
  assert(st.x === 2);
});

test("30: interpProgram interprets while loop correctly", () => {
  const st = interpProgram(
    parseProgram("let x = 8; let y = 2; while (x < 10) {y = y + 1; x = x + 1;}")
      .value
  );
  assert(st.x === 10);
  assert(st.y === 4);
});

test("31: interpProgram interprets while loop with negative numbers correctly", () => {
  const st = interpProgram(
    parseProgram(
      "let x = -6; let y = -2; while (x < -3) {y = y + 1; x = x + 1;}"
    ).value
  );
  assert(st.x === -3);
  assert(st.y === 1);
});

test("32: interpProgram interprets scoping for if-else correctly", () => {
  const st = interpProgram(
    parseProgram("let x = true; if (x) { x = false; let x = 10; } else {}")
      .value
  );
  assert(st.x === false);
});

test("33: interpProgram interprets scoping for while loop correctly", () => {
  const st = interpProgram(
    parseProgram("let x = true; while (x) { x = false; let x = 10; } ").value
  );
  assert(st.x === false);
});

test("34: interpProgram interprets conditional correctly", () => {
  const st = interpProgram(
    parseProgram(" let x = 4; if(5 > 8){ x = true; } else { x = false;} ").value
  );
  assert(st.x === false);
});

test("35: interpProgram should not read a return, error should be thrown", () => {
  assert.throws(
    () =>
      interpProgram(
        parseProgram(" if(5 > 8){ return 2;} else { return 1;} ").value
      ),
    /Stmts is not an array, unable to parse./
  );
});

test("36: Should throw an error for unreadable statement", () => {
  assert.throws(
    () =>
      interpStatement(
        {},
        parseProgram(" 15 if(x){return 8;} else{print(3);}").value
      ),
    /Statement is not read by parser./
  );
});

test("37: Should throw an error for unreadable statement", () => {
  assert.throws(
    () => interpStatement({}, parseProgram(" 15 ").value),
    /Statement is not read by parser./
  );
});

test("38: Should throw an error for undefined statement", () => {
  assert.throws(
    () =>
      interpProgram(
        parseProgram(" if(x) { print(8);} else { print(3); }").value
      ),
    /Variable not found in state./
  );
});

test("39: Should throw an error when initializing a variable twice", () => {
  assert.throws(
    () => interpProgram(parseProgram("let x = 3; let x = 5;").value),
    /Variable is already in state, cannot initialize twice./
  );
});

test("40: Should throw an error when initializing a variable twice within scoping", () => {
  assert.throws(
    () =>
      interpProgram(
        parseProgram(" let x = 0; while(x < 10){ let x = 3; let x = 11;}").value
      ),
    /Variable is already in state, cannot initialize twice./
  );
});

test("41: interpProgram throws an error for decimal values", () => {
  assert.throws(
    () => interpProgram(parseProgram("let x = 2.5; ").value),
    /Stmts is not an array, unable to parse./
  );
});

test("42: interpProgram works correctly with number for while loop condition", () => {
  const st = interpProgram(
    parseProgram("let x = 5; while(0) { x = x - 1; } ").value
  );
  assert(st.x === 5);
});

test("43: interpProgram works correctly with number for if-else condition", () => {
  const st = interpProgram(
    parseProgram("let x = false; if(3) { x = true; } else{ x = false; } ").value
  );
  assert(st.x === true);
});

test("44: interpProgram throws an error for unreadable variable type", () => {
  assert.throws(
    () => interpProgram(parseProgram("let x = undefined;").value),
    /Variable not found in state./
  );
});

test("45: interpProgram throws an error for unreadable variable type", () => {
  assert.throws(
    () => interpProgram(parseProgram("let x = null;").value),
    /Variable not found in state./
  );
});

test("46: interpProgram throws an error for unreadable variable type", () => {
  assert.throws(
    () => interpProgram(parseProgram("let a = [1,2,3,4,5];").value),
    /Stmts is not an array, unable to parse./
  );
});

test("47: interpProgram should throw an error if a number is used in variable name", () => {
  assert.throws(
    () => interpProgram(parseProgram("let 1xy = 5;").value),
    /Stmts is not an array, unable to parse./
  );
});

test("48: interPogram can read fractions and produces deciamls", () => {
  const st = interpProgram(parseProgram("let x = 9 / 2;").value);
  assert(st.x === 4.5);
  assert(st.x === 9 / 2);
});

test("49: interpExpression can produce infinity when dividing by 0", () => {
  const r = interpExpression({ x: 5 }, parseExpression(" x / 0 ").value);
  assert(r === Infinity);
});


test("30: interpProgram interprets while loop correctly", () => {
  const st = interpProgram(parseProgram("let x = 8; let y = 1; let z = 4; let c = 3; if (x === 9) { let y = 4; if (y === 2 ) {let x = 3;} else {z = 3;}} else { let d = 0; let y = 2; if (y === 2 ) { y = 4; x = 0; let x = 7; x = 5; c = 6;} else {z = 3; let z = 8;}}").value);
  console.log(st);
  assert(st.x === 0);
  assert(st.y === 1);
  assert(st.z === 4);
  assert(st.c === 6);
});


// test("Complicated Test #1", () => {
//   const st = interpProgram( parseProgram("let x = true; if(x){ x = false; let x = 10; } else{ print(false); }").value);
//     assert(!st.x)
// });

// test("Complicated Test #2", () => {
//   const st = interpProgram(parseProgram("let x = -2; x = x - 7; while( x < 6 && x > -15) { x = (2 * x) + 10; }").value);
//   assert(st.x === 6)
// });

// test("Complicated Test #3", () => {
//   const st = interpProgram(parseProgram("let x = -2; x = x - 7; while( x < 6 && x > -15) { x = (2 * x) + 10; }").value);
//   assert(st.x === 6)
// });

test("Complicated Test #4", () => {
  const st = interpProgram(parseProgram("let i = -1; let g = 4; let h = 5; while(i === -1){g = g + 1; if(h < 10){ h = h + 1;} else { i = i - 1;} if(i < -5){ i = 100;} else{print(i);}}").value);
  console.log(st);
  assert(st.i === -2)
  assert(st.h === 10)
  assert(st.g === 10)

});

test("Complicated Test #4", () => {
  const st = interpProgram(parseProgram("let i = 0; if(i === 0){ i = 5; let i = 7; if(i < 4){i = -3;} else {i = -5;}} else{ i = 3; let i = 8; if(i < 4){ i = -10;} else{i = -13;}}").value);
  console.log(st);
  assert(st.i === 5)

});

// test("Complicated Test #4", () => {
//   const st = interpProgram(parseProgram("let i = 0; if(i === 0) { i = 5; let i = 0; if (i === 0 ) {let i= 6; let i = 3;} else{i = 3;}} else {let i = 2;}").value);
//   console.log(st);
//   assert(st.i === 5)

// });




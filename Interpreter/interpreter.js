"use strict";

const { assignment } = require("../include/ast");
const assert = require("assert");

//interpExpression(state: State, expr: Expr): number | boolean
function interpExpression(state, expr) {
  // TODO
  if (expr === undefined) {
    throw new Error("Expression is not read by parser.");
  }
  switch (expr.kind) {
    case "boolean": {
      return expr.value;
    }
    case "number": {
      return expr.value;
    }
    case "variable": {
      return getValue(state, expr.name);
    }
    case "operator": {
      let e1 = interpExpression(state, expr.e1);
      let e2 = interpExpression(state, expr.e2);
      if (
        ((expr.op === "+" ||
          expr.op === "-" ||
          expr.op === "/" ||
          expr.op === "*" ||
          expr.op === ">" ||
          expr.op === "<") &&
          !(typeof e1 === typeof e2 && typeof e1 === "number")) ||
        ((expr.op === "||" || expr.op === "&&") &&
          !(typeof e1 === typeof e2 && typeof e1 === "boolean"))
      ) {
        throw new Error("Types are not the same for operation.");
      }
      switch (expr.op) {
        case "+": {
          return e1 + e2;
        }
        case "-": {
          return e1 - e2;
        }
        case "/": {
          return e1 / e2;
        }
        case "*": {
          return e1 * e2;
        }
        case "&&": {
          return e1 && e2;
        }
        case "||": {
          return e1 || e2;
        }
        case "===": {
          return e1 === e2;
        }
        case ">": {
          return e1 > e2;
        }
        case "<": {
          return e1 < e2;
        }
        default: {
          throw new Error("Operation is invalid or not read by parser.");
        }
      }
    }
    default: {
      throw new Error("No valid expression found or not read by parser.");
    }
  }
}

//interpStatement(state: State, stmt: Stmt): State
function interpStatement(state, stmt) {
  // TODO
  if (stmt === undefined) {
    throw new Error("Statement is not read by parser.");
  }
  switch (stmt.kind) {
    case "let": {
      if (!(stmt.name in state)) {
        setValue(state, stmt.name, interpExpression(state, stmt.expression));
      } else {
        throw new Error(
          "Variable is already in state, cannot initialize twice."
        );
      }
      break;
    }
    case "assignment": {
      let temp = state;
      temp = scopeCheck(stmt.name, temp);
      setValue(temp, stmt.name, interpExpression(temp, stmt.expression));
      break;
    }
    case "if": {
      let newScope = {};
      newScope["o.s."] = state;
      if (interpExpression(state, stmt.test)) {
        interpBlock(newScope, stmt.truePart);
      } else {
        interpBlock(newScope, stmt.falsePart);
      }
      break;
    }
    case "while": {
      let newScope = {};
      newScope["o.s."] = state;
      while (interpExpression(state, stmt.test)) {
        interpBlock(newScope, stmt.body);
        newScope = { "o.s.": state };
      }
      break;
    }
    case "print": {
      console.log(interpExpression(state, stmt.expression));
      break;
    }
    default: {
      throw new Error("No valid statement found.");
    }
  }
  return state;
}

//interpProgram(stmts: Stmt[]): State
function interpProgram(stmts) {
  // TODO
  if (Array.isArray(stmts)) {
    return interpBlock({}, stmts);
  } else {
    throw new Error("Stmts is not an array, unable to parse.");
  }
}

//interpBlock(state: State, b: Stmt[]): State
function interpBlock(state, b) {
  if (Array.isArray(b)) {
    return b.reduce((acc, e) => interpStatement(state, e), state);
  } else {
    throw new Error("Could not parse into an array.");
  }
}

// Gets the value of the specified key in the object
function getValue(obj, key) {
  let temp = obj;
  // Gets the state of only the accessible scope
  temp = scopeCheck(key, temp);
  if (key in temp) {
    return temp[key];
  } else {
    throw new Error("Variable is not in state.");
  }
}

// Helper function that sets the key of an object to the value specified
function setValue(obj, key, value) {
  obj[key] = value;
}

// Helper function to get the accessible scope
function scopeCheck(key, temp) {
  while (!(key in temp)) {
    if (!("o.s." in temp)) {
      throw new Error("Variable not found in state.");
    }
    temp = temp["o.s."];
  }
  return temp;
}

// DO NOT REMOVE
module.exports = {
  interpExpression,
  interpStatement,
  interpProgram,
};

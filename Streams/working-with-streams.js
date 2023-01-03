// type Memo<T> = { get: () => T }
// memo0<T>(f: () => T): Memo<T>
function memo0(f) {
  let r = { evaluated: false };
  return {
    get: function() {
      if (! r.evaluated) {
        r = { evaluated: true, v: f() }
      }
      return r.v;
    },
    toString: function() {
      if (r.evaluated) {
        return r.v.toString();
      } else {   
        return '<unevaluated>';
      }
    }
  };
}

// sempty: Stream<T>
let sempty = {
  isEmpty: () => true,
  map: (f) => sempty,
  filter: (pred) => sempty,
  toString: () => 'sempty'
};

// snode<T>(head: T, tail: Stream<T>): Stream<T>
function snode(head, tail) {
  return {
    isEmpty: () => false,
    head: () => head,
    tail: tail.get,
    map: f => snode(f(head), memo0(() => tail.get().map(f))),
    filter: pred => pred(head) ? snode(head, memo0(() => tail.get().filter(pred))) : tail.get().filter(pred),
    toString: () => "snode(" + head.toString() + ", " + tail.toString() + ")"
  }
}


// addSeries: adds the coefficients of two streams recursively
// parameters: takes in two streams (s and t) of coefficients (numbers)
// result: returns a new stream of coefficients of the add streams s and t
function addSeries(s, t) {
  if (s.isEmpty()) {return t;}
  else if (t.isEmpty()) { return s;}
  else {
    return snode(s.head() + t.head(), memo0(() => addSeries(s.tail(), t.tail())));
  }
}

// prodSeries: multiplies the coefficients of two streams recursively
// parameters: takes in two streams (s and t) of coefficients (numbers)
// result: returns a new stream of coefficients of the add streams s and t
function prodSeries(s, t) {
  if (s.isEmpty() || t.isEmpty()) {return sempty;}
  else {
    let newStrm = t.map(e => e * s.head());
    return snode(newStrm.head(), memo0(() => addSeries(newStrm.tail(), prodSeries(s.tail(), t))));
  }
}

// derivSeries: computes the derivative of the polynomial (stream)
// parameters: takes in a stream s of coefficients (numbers)
// result: returns a stream of coefficients
function derivSeries(s) {
  if (s.isEmpty()) {return sempty;}
  if (s.tail().isEmpty()) {
    return snode(0, memo0(() => sempty));
  } else {
    let i = 0;
    let newS = s.tail();
    if (newS.isEmpty()) {return sempty;}
   return newS.map(e => {
      ++i;
      return i * e;
    });
  }
}

// coeff: creates an array of consisting of n elements from the stream
// parameters: takes in a streams s and  number n
// result: returns an array
function coeff(s, n) {
  let arr = [];
  let temp = s;
  while (!temp.isEmpty() && n > -1) {
    arr.push(temp.head());
    n = n - 1; 
    temp = temp.tail();
  } 
  return arr;
}  

// evalSeries: computes the sum of all the node values in the stream
// parameters: takes in a streams s of coefficients (numbers) and n a number
// result: returns the sum (number)
function evalSeries(s, n) {
  if (s.isEmpty()) {return 0;}
  let sumArr = coeff(s, n);
  return x => { 
    let pow = -1;
    return sumArr.reduce((acc, e) => {
      ++pow;
      return e === sumArr[0] ? e + acc : acc + e * Math.pow(x, pow);
    }, 0);
  }
}

// applySeries: creates a stream where each value is the outcome of f applied to it
// parameters: takes in function f and value v
// result: returns a stream
function applySeries(f, v){
  return snode(v, memo0(() => applySeries(f, f(v))));
}

// Factorial function for expSeries
function fac(n) {
    return (n===0 || n === 1) ? 1: (n * fac(n - 1)); 
}

// expSeries: creates stream that represent a taylor series
// parameters: none
// result: returns a stream of values that represent a taylor series
function expSeries() {
  // Helper function that recursively applies factorial on input value
  function helperExp(f, n) {
    return snode(f(n), memo0(() => helperExp(f, n + 1)));
  }
  return helperExp(n => 1/fac(n), 0);
}

// recurSeries: creates a stream that consists of init values and computed values
// parameters: takes in two arrays of numbers
// result: returns a stream of values (numbers)
function recurSeries(coef, init) {
  let counter = 0;
  let initCopy = init.map(e => e);
  // Helper function that adds init values to a stream and computed values
  function recurHelper(counter) {
    if (counter < initCopy.length) { // For init values
      return snode(initCopy[counter], memo0(() => recurHelper(counter + 1)));
    } else { // compute values
      let acc = 0;
      for (let i = 0; i < initCopy.length; ++i) {
        acc += (initCopy[i] * coef[i]);
      }
      initCopy.push(acc); // push new computed value in initCopy to compute for next call
      initCopy.shift(); // delete first element bc we do not need anymore
      return snode(acc, memo0(() => recurHelper(counter + 1)));
    }
  }
  return recurHelper(counter); // Recursive
}


// Tests
test('addSeries when both streams s and t are the same size', function() {
  let strm1 = snode(0,memo0(() => snode(1, memo0(() => snode(2, memo0(() => snode(3, memo0(() => snode(4, memo0(() => sempty))))))))));
  let strm2 = snode(0,memo0(() => snode(2, memo0(() => snode(4, memo0(() => snode(6, memo0(() => snode(8, memo0(() => sempty))))))))));
  assert(addSeries(strm1, strm2).head() === 0);
  assert(addSeries(strm1, strm2).tail().head() === 3);
  assert(addSeries(strm1, strm2).tail().tail().head() === 6);
  assert(addSeries(strm2, strm1).tail().tail().tail().head() === 9);
  assert(addSeries(strm2, strm1).tail().tail().tail().tail().head() === 12);
  assert(addSeries(strm1, strm2).tail().tail().tail().tail().tail().isEmpty());
});

test('addSeries when t is smaller than s', function() {
  let strm1 = snode(4,memo0(() => snode(2, memo0(() => sempty))));
  let strm2 = snode(1,memo0(() => sempty));
  assert(addSeries(strm1, strm2).head() === 5);
  assert(addSeries(strm1, strm2).tail().head() === 2);
  assert(addSeries(strm1, strm2).tail().tail().isEmpty());
});

test('addSeries when s is smaller than t', function() {
  let strm1 = snode(1,memo0(() => snode(2, memo0(() => sempty))));
  let strm2 = snode(1,memo0(() => sempty));
  assert(addSeries(strm2, strm1).head() === 2);
  assert(addSeries(strm2, strm1).tail().head() === 2);
  assert(addSeries(strm2, strm1).tail().tail().isEmpty());
});

test('addSeries when both s and t are empty', function() {
  let strm1 = sempty;
  let strm2 = sempty;
  assert(addSeries(strm1, strm2).isEmpty());
});

test('prodSeries both s and t are the same size', function() {
  let s = snode(1,memo0(() => snode(2, memo0(() => snode(3, memo0(() => snode(4, memo0(() => snode(5, memo0(() => sempty))))))))));
  let t = snode(2,memo0(() => snode(3, memo0(() => snode(6, memo0(() => snode(8, memo0(() => snode(10, memo0(() => sempty))))))))));
  assert(prodSeries(s,t).head() === 2);
  assert(prodSeries(s,t).tail().head() === 7);
  assert(prodSeries(s,t).tail().tail().head() === 18);
  assert(prodSeries(s,t).tail().tail().tail().head() === 37);
  assert(prodSeries(s,t).tail().tail().tail().tail().head() === 66);
  assert(prodSeries(s,t).tail().tail().tail().tail().tail().head() === 83);
  assert(prodSeries(s,t).tail().tail().tail().tail().tail().tail().head() === 92);
  assert(prodSeries(s,t).tail().tail().tail().tail().tail().tail().tail().head() === 80);
  assert(prodSeries(s,t).tail().tail().tail().tail().tail().tail().tail().tail().head() === 50);
  assert(prodSeries(s,t).tail().tail().tail().tail().tail().tail().tail().tail().tail().isEmpty());
});

test('prodSeries for empty s and empty t', function() {
  let strm1 = sempty;
  let strm2 = sempty;
  assert(prodSeries(strm1, strm2).isEmpty());
});
test('derivSeries for stream of 5 nodes', function() {
  let s = snode(2,memo0(()=>snode(1, memo0(() => snode(3, memo0(() => snode(6, memo0(() => snode(8, memo0(() => sempty))))))))));
  assert(derivSeries(s).head() === 1);
  assert(derivSeries(s).tail().head() === 6);
  assert(derivSeries(s).tail().tail().head() === 18);
  assert(derivSeries(s).tail().tail().tail().head() === 32);
  assert(derivSeries(s).tail().tail().tail().tail().isEmpty());
});

test('derivSeries for stream of 1 constant', function() {
  let s = snode(2,memo0(() => sempty));
  assert(derivSeries(s).head() === 0);
  assert(derivSeries(s).tail().isEmpty());
});

test('derivSeries for empty stream', function() {
  let s = sempty;
  assert(derivSeries(s).isEmpty());
});

test('coeff with 3 stream nodes and n = 2', function() {
  let s = snode(3, memo0(() => snode(2, memo0(() => snode(5, memo0(() => sempty))))));
  let a = coeff(s,2);
  assert(a[0] === 3);
  assert(a[1] === 2);
  assert(a[2] === 5);
  assert(a.length === 3);
});

test('coeff with 1 stream node and n = 0', function() {
  let s = snode(1, memo0(() => sempty));
  let a = coeff(s, 0);
  assert(a[0] === 1);
  assert(a.length === 1);
});
test('coeff with empty stream and n = 0', function() {
  let s = sempty;
  let a = coeff(s, 0);
  assert(a.length === 0);
});

test('coeff with empty stream and n = 10', function() {
  let s = sempty;
  let a = coeff(s, 10);
  assert(a.length === 0);
});

test('coeff with 3 node and n = 10', function() {
  let s = snode(1, memo0(()=>snode(2, memo0(() => snode(3, memo0(() => sempty))))));
  let a = coeff(s, 10);
  assert(a[0] === 1);
  assert(a[1] === 2);
  assert(a[2] === 3);
  assert(a.length === 3);
});

test('coeff with 3 stream nodes and n = -1', function() {
  let s = snode(1,memo0(() => snode(2, memo0(() => snode(3, memo0(() => sempty))))));
  let a = coeff(s, -1);
  assert(a.length === 0);
});

test('evalSeries with 3 stream nodes and n = 0', function() {
  let s = snode(1, memo0(() => snode(2, memo0(() => snode(3, memo0(() => sempty))))));
 assert(evalSeries(s, 0)(2) === 1);
});

test('evalSeries with 3 stream nodes and n = 1', function() {
  let s = snode(1,memo0(() => snode(2, memo0(() => snode(3, memo0(() => sempty))))));
  assert(evalSeries(s,1)(1) === 3);
});
test('evalSeries with 3 stream nodes and n = 2', function() {
  let s = snode(1, memo0(() => snode(2, memo0(() => snode(3, memo0(()=>sempty))))));
  assert(evalSeries(s, 2)(3) === 34);
});

test('applySeries basic test for n^x', function() {
  let func = x => x * x;
  assert(applySeries(func, 2).head() === 2);
  assert(applySeries(func, 2).tail().head() === 4);
  assert(applySeries(func, 2).tail().tail().head() === 16);
  assert(applySeries(func, 2).tail().tail().tail().head() === 256);
});

test('applySeries test when adding', function() {
  let func = x => x + 1;
  assert(applySeries(func, 1).head() === 1);
  assert(applySeries(func, 1).tail().head() === 2);
  assert(applySeries(func, 1).tail().tail().head() === 3);
});

test('expSeries represents taylor series', function() {
  assert(expSeries().head() === 1);
  assert(expSeries().tail().head() === 1);
  assert(expSeries().tail().tail().head() === 1/2);
  assert(expSeries().tail().tail().tail().head() === 1/6);
  assert(expSeries().tail().tail().tail().tail().head() === 1/24);
});

test('check recurSeries', function() {
  let initial = [1, 2, 3];
  let coef1 = [1, 10, 100];
  let s = recurSeries(coef1, initial);
  assert(s.head() === 1);
  assert(s.tail().head() === 2);
  assert(s.tail().tail().head() === 3);
  assert(s.tail().tail().tail().head() === 321);
  assert(s.tail().tail().tail().tail().head() === 32132);
});

test('check recurSeries', function() {
  let initial = [1, 1];
  let coef1 = [1, 1];
  let s = recurSeries(initial, coef1);
  assert(s.head() === 1);
  assert(s.tail().head() === 1);
  assert(s.tail().tail().head() === 2);
  assert(s.tail().tail().tail().head() === 3);
  assert(s.tail().tail().tail().tail().head() === 5);
});

test('check recurSeries', function() {
  let coef = [1,2,3];
  let init = [4,5,6];
  let s = recurSeries(coef, init);
  assert(recurSeries(coef, init).head() === 4);
  assert(recurSeries(coef, init).tail().head() === 5);
  assert(recurSeries(coef, init).tail().tail().head() === 6);
  assert(recurSeries(coef, init).tail().tail().tail().head() === 32);
  //console.log(recurSeries(coef,init).tail().tail().tail().head());
  assert(recurSeries(coef, init).tail().tail().tail().tail().head() === 113);
});
 

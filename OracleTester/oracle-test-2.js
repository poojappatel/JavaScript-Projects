// Returns a random int i where min <= i < max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//generateInput(n: number): number[][]
function generateInput(n) {
  let arr = [];
  for (let i = 0; i < n; ++i) {
    arr.push([]); //pushing in n empty arrays
    while (arr[i].length < n) {
      let temp = randomInt(0,n);
      if (!(arr[i].includes(temp))) { // makes sures no duplicates
        arr[i].push(temp); // pushes n random elements in the nested arrays
      }
    }
  }
  return arr;
}

//runOracle(f: (companies: number[][], candidates: number[][]) => Hire[]): void
function runOracle(f) {
  let numTests = 1;// Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
    let n = 3; // Change this to some reasonable size
    let companies = generateInput(n);
    let candidates = generateInput(n);
    console.log(companies)
    console.log(candidates)
    let run = f(companies, candidates);
    
    let countComp = [];
    let countCand = [];

    let compMatch = [];
    let candMatch = [];

    // Creating counters and stimulating company/candidate match sets
    for (let j = 0; j < n; ++j) {
      countComp.push(-1);
      countCand.push(-1);
      compMatch.push(-1);
      candMatch.push(-1);
    }

    test('Checking valid and result of offers', function() {
      // Going into run.trace to check the validity of each trace
      let check = (run.trace).every(trace => {
        //Creating variables based on fromCo true or false
        let compCand = (trace.fromCo) ? companies : candidates;
        let compCand2 = (trace.fromCo) ? candidates : companies;

        ++countComp[trace.from];
        //countCand[trace.from] = !(trace.fromCo) ? countCand[trace.from] + 1 : countCand[trace.from];

        let compCandMatch = (trace.fromCo) ? compMatch : candMatch;
        let compCandMatch2 = (trace.fromCo) ? candMatch : compMatch;
        
        // First case checks for invalid case
        if (compCandMatch[trace.from] !== -1 || trace.to !== compCand[trace.from][countComp[trace.from]]) {
          return false; 
        } else if (compCandMatch2[trace.to] === -1)  { // Checking when from field has not offered in trace before
          compCandMatch[trace.from] = trace.to;
          compCandMatch2[trace.to] = trace.from;
          return true;
          // This condition checks when the to field in trace has been offered to more than once
        } else if (compCandMatch2[trace.to] !== -1 && compCand2[trace.to].indexOf(trace.from) < compCand2[trace.to].indexOf(compCandMatch2[trace.to])) {
          compCandMatch[compCandMatch2[trace.to]] = -1;
          //compCandMatch2[trace.to] = -1;
          compCandMatch[trace.from] = trace.to;
          compCandMatch2[trace.to] = trace.from;
          return true;
          // Opposite of second condition
        } else if (compCand2[trace.to].indexOf(trace.from) > compCand2[trace.to].indexOf(compCandMatch2[trace.to])) {
          compCandMatch[compCandMatch2[trace.to]] = trace.to;
          compCandMatch2[trace.to] = compCandMatch2[trace.to];
          return true;
        } else {
          return true;
        }
      
      });

      // Checking run.out matches the stimulated valid matches
      if (check) {
        check = (run.out).every(out => {
          if (out.candidate === compMatch[out.company]) {
            return true;
          } else {
            return false;}
         });
      }
      assert(check); 
      
    });

    test('Run.out company has no object that duplicates', function() {  
      let compArr = (run.out).map(x => x.company); 
      assert(compArr.every(x => compArr.indexOf(x) === compArr.lastIndexOf(x))); 
    });

    test('Run.out candidates has no object duplicates', function() {  
      let candArr = (run.out).map(x => x.candidate); 
      assert(candArr.every(x => candArr.indexOf(x) === candArr.lastIndexOf(x))); 
    });

  }
}

const oracleLib = require('oracle');
runOracle(oracleLib.traceWheat1);
//runOracle(oracleLib.traceChaff1);
//console.log(oracleLib.traceWheat1(generateInput(3),generateInput(3)));

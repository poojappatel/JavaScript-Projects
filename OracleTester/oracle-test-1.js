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

//oracle(f: (companies: number[][], candidates: number[][]) => Hire[]): void
function oracle(f) {
  let numTests = 100; // Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
    let n = 6; // Change this to some reasonable size
    let companies = generateInput(n);
    let candidates = generateInput(n);
    let hires = f(companies, candidates);

    test('Hires length is correct', function() {
      assert(companies.length === hires.length);
    }); // Write more tests like this one

    // More tests
    /*
    test('Hires company has no object duplicates', function() {  
      assert(hires.map(e => e.company).every(e => hires.map(e => e.company).indexOf(e) === hires.map(e => e.company).lastIndexOf(x))); 
    });

    test('Hires candidates has no object duplicates', function() {  
      assert(hires.map(e => e.candidate).every(e => hires.map(e => e.candidate).indexOf(x) === hires.map(e => e.candidate).lastIndexOf(x))); 
    });

    test('Hires company has no number <= 0', function() {
      assert(hires.every(e => (e.company < n)));
    });

    test('Hires candidates has no number <= 0', function() {
      assert(hires.every(e => (e.candidate < n)));
    });

    test('Hires companies has no number > n', function() {
      assert(hires.every(e => (e.company >= 0)));
    });

    test('Hires candidates has no number > n', function() {
      assert(hires.every(e => (e.candidate >= 0)));
    });
    */

    test('checks stability', function() {
      let check = hires.every(obj => {
        // Company's preference for candidate at index of company's match
        let compPref = companies[obj.company]; // compPref is an array of n
        return compPref.every(cand => { // where e is the candidate preference of a company
        //console.log(compPref.indexOf(obj.candidate));
        if ((compPref.indexOf(cand) < compPref.indexOf(obj.candidate))) {
          // Candidates's preference for company at index of candidate's match
          let candPref = candidates[cand]; // candPref is an array of n
          // Checking condition for stability, using indices to check whether preferences satisfy stability requirements
          return candPref.every(comp => ((candPref.indexOf(comp) < candPref.indexOf(hires.map(x => x.company)[hires.map(x => x.candidate).indexOf(cand)]) && (comp !== obj.company))
                || (candPref.indexOf(comp) >= candPref.indexOf(hires.map(x => x.company)[hires.map(x => x.candidate).indexOf(cand)]))));
         } else { return true; }
        });
      });
      assert(check); 
    });
  }
}

oracle(wheat1);
oracle(chaff1);

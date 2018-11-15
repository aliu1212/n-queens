/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({"n": n})
  var rooksToGo = n;
  for (let i = 0; i<n; i++) {
    for (let j = 0; j<n; j++) {
      if (solution.attributes[i][j]===0) {
        solution.attributes[i][j] = 1;
      }
      
      if (solution.hasAnyRooksConflicts()){
        solution.attributes[i][j] = 0;

      }

      if (solution.attributes[i][j]  ===  1){
        rooksToGo -=1
      }

      if (rooksToGo === 0) {
        let solution_array = []
        for (let i = 0; i<n; i++) {
          solution_array.push(solution.attributes[i])
        }
        return solution_array;
      }
    }
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme



  // if (n===1) {
  //   return 1;
  // }
  // if (n>1){
  //   return n*countNRooksSolutions(n-1)
  // }; 

  //Terminate when n =1; return 1
  //increment solutionCount if n # of rooks is reached

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

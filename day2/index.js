import puzzleInput from "./puzzleInput.js";

const guideArr = puzzleInput.split('\n').map(round => round.split(' ')); // Will output an array of arrays. The nested arrays each contain 2 values, one for each colum E.g. `[['A', 'Y'], ['C', 'X'], ...]`

// Map the rounds outputs
const roundScores1 = {
  A: { X: 4, Y: 8, Z: 3 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 7, Y: 2,  Z: 6 }
};
const roundScores2 = {
  A: { X: 3, Y: 4, Z: 8 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 2, Y: 6,  Z: 7 }
};

// Get each round's score using the maps and sum all the scores
const totalScore1 = guideArr.reduce((currentSum, roundColumns) => currentSum + roundScores1[roundColumns[0]][roundColumns[1]], 0);
const totalScore2 = guideArr.reduce((currentSum, roundColumns) => currentSum + roundScores2[roundColumns[0]][roundColumns[1]], 0);

console.log('Part 1:', totalScore1);
console.log('Part 2:', totalScore2);
import puzzleInput from "./puzzleInput.js";

const treeGrid = puzzleInput.split('\n').map(line => line.split('').map(tree => parseInt(tree)));
const columnsAmount = treeGrid[0].length - 1;
const rowsAmount = treeGrid.length - 1;
let visibleTrees = 0;
let highestScenicScore = 0;

for (let row = 0; row < treeGrid.length; ++row) {
  for (let col = 0; col < treeGrid[row].length; ++col) {
    // Phase 1
    if (isTreeVisible(row, col)) {
      ++visibleTrees;
    }

    // Phase 2
    const scenicScore = getScenicScore(row, col);
    if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;
  }
}

console.log('Part 1:', visibleTrees); // 1870
console.log('Part 2:', highestScenicScore); // 517440

// For better performance we could add more early return/break/continue statements in the loops
// But I wanted to keep this code readable but also easy to improve for performances.
// Basically, show that it's possible to make this code faster than going through full loops
function isTreeVisible(row, col) {
  // Trees at the border are always visible
  if (row === 0 || row === rowsAmount || col === 0 || col === columnsAmount) return true;
  const baseTree = treeGrid[row][col];

  // Checking rows first
  const rowTallest = {left: 0, right: 0};
  for (const [index, tree] of treeGrid[row].entries()) {
    if (index === col && rowTallest.left < baseTree) return true; // Don't need to go through right side if already visible
    if (index < col && tree > rowTallest.left) rowTallest.left = tree;
    else if (index > col && tree > rowTallest.right) rowTallest.right = tree;
  };
  if (rowTallest.right < baseTree) return true; // We don't need to check in column if already visible

  const colTallest = {top: 0, bottom: 0};
  for (const [index, currentRow] of treeGrid.entries()) {
    if (index === row && colTallest.top < baseTree) return true; // Don't need to check in bottom...
    if (index < row && currentRow[col] > colTallest.top) colTallest.top = currentRow[col];
    else if (index > row && currentRow[col] > colTallest.bottom) colTallest.bottom = currentRow[col];
  };

  return colTallest.bottom < baseTree;
}



// We'll create an array for each branch [left, right, top, bottom] of the cross section
// Each array will be ordered from the tree at given row and column towards the border
// We can then treat all branches of the cross section the same way:
// Imagine that we're currently standing on top of a tree at given row and column,
// We'll write down on a notebook a list of each tree's height that stands between our current tree and the border of the grid. 
// I.e. we start with our current tree, then we add the first closest tree, then the second closest...and so on
function getScenicScore(row, col) {
  // Trees ath the border always have a score of 0
  if (row === 0 || row === rowsAmount || col === 0 || col === columnsAmount) return 0;

  const crossSectionArr = [ // left, right, top, bottom
    treeGrid[row].slice(0, col + 1).reverse(),
    treeGrid[row].slice(col),
    treeGrid.reduce((arr, thisRow, index) => index <= row ? [thisRow[col] ,...arr] : [...arr], []),
    treeGrid.reduce((arr, thisRow, index) => index >= row ? [...arr, thisRow[col]] : [...arr], [])
  ];

  return crossSectionArr.reduce((currentScore, section) => getScenicScoreForSection(section) * currentScore, 1);
}

function getScenicScoreForSection(sectionArr) {
  let scoreLeft = -1;

  // Index 0 is always the tree for which we're getting the score
  for (const [index, tree] of sectionArr.entries()) {
    ++scoreLeft;
    if (tree >= sectionArr[0] && index > 0) break; // We can't see past this tree because it is higher than the one we're on top of
  };
  return scoreLeft;
}
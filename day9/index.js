import puzzleInput from "./puzzleInput.js";

// Will feed the Set below with strings formatted like this: "x,y", x and y being coordinates
// Because it's a Set, no duplicated position will be added to it when using the Set method `add()`
const visitedTailPositions = new Set(); 
let knotsAmount = 2; // Used directly in `moveRope2()` and `movePartOfRope()`, original approach didn't need that

// To see approach for part 1 before the refactoring I did in phase 2, check the function `moveRope()` at the bottom of this file. 
// Pretty much the same but not scalable to more than 2 knots
moveRope2();
console.log('Part 1:', visitedTailPositions.size); // 6337

// Part 2, reset the Set, reused part 1's solution but improved it so it's scalable for any amount of knots
visitedTailPositions.clear();
knotsAmount = 10;

moveRope2();
console.log('Part 2:', visitedTailPositions.size); // 2455



// Used recursion for part 2 so all knots were moving one at a time before the next tick in the movement
function moveRope2() {
  // Creating an array with objects holding the positions (x and y) for each knot, all start at 0
  const parts = new Array(knotsAmount).fill().map(item => ({x: 0, y:0})); // `.fill()` alone makes all items share the same reference when dealing with objects or arrays

  for (const line of puzzleInput.split('\n')) {
    const directionChar = line.charAt(0);
    const direction = 'UD'.includes(directionChar) ? 'y' : 'x'; // Axis on which the movemet is done
    const sign = 'UR'.includes(directionChar) ? 1 : -1;         // Like in a chart, left or down from origin: value is negative, else it's positive
    const stepsAmount = parseInt(line.slice(2));

    for (let i = 0; i < stepsAmount; ++i) {
      movePartOfRope(0, {direction, sign}, parts);
    }
  }
};

// Cleaner to keep a recursive function outside another scope
function movePartOfRope(partIndex, mvt, parts) {
  // Update rope's head knot position
  if (partIndex === 0) parts[partIndex][mvt.direction] += mvt.sign;

  // Update following knot's position according to the rules
  // We first check the distance between this knot and the next on each axis
  const distanceX = parts[partIndex].x - parts[partIndex + 1].x;
  const distanceY = parts[partIndex].y - parts[partIndex + 1 ].y;
  const isMovingDiagonally = (Math.abs(distanceX) + Math.abs(distanceY)) > 2; // Signs could mess up this check

  // if needed, increment or decrement position on axis regarding movement direction
  if (isMovingDiagonally) {
    parts[partIndex + 1].x += Math.sign(distanceX);
    parts[partIndex + 1].y += Math.sign(distanceY);
  }
  else if (Math.abs(distanceX) > 1) parts[partIndex + 1].x += Math.sign(distanceX);
  else if (Math.abs(distanceY) > 1) parts[partIndex + 1].y += Math.sign(distanceY);

  // Magic number 2: length of array always = last index + 1 and we're dealing with knots 2 by 2
  if (partIndex === knotsAmount - 2) {
    // Update the visited positions
    visitedTailPositions.add(`${parts[partIndex + 1].x},${parts[partIndex + 1].y}`);
    return;
  }

  // Update next knot's position
  movePartOfRope(partIndex + 1, mvt, parts);
}


// Part 1's original solution, not scalable but same exact reasoning and not using recursion since it works for 2 knots
// Reused nearly all of this code in part 2 as you can see
function moveRope() {
  const currentHeadPosition = {x: 0, y: 0};
  const currentTailPosition = {x: 0, y: 0};

  for (const line of puzzleInput.split('\n')) {
    const directionChar = line.charAt(0);
    const direction = 'UD'.includes(directionChar) ? 'y' : 'x';
    const sign = 'UR'.includes(directionChar) ? 1 : -1;
    const movementLength = parseInt(line.slice(2));


    for (let i = 0; i < movementLength; ++i) {
      currentHeadPosition[direction] += sign;
      const diffX = currentHeadPosition.x - currentTailPosition.x;
      const diffY = currentHeadPosition.y - currentTailPosition.y;
      const distanceX = Math.abs(diffX);
      const distanceY = Math.abs(diffY);

      if (distanceX <= 1 && distanceY <= 1) continue;

      const isMovingDiagonally = (distanceX + distanceY) > 2;
      if (isMovingDiagonally) {
        currentTailPosition.x += Math.sign(diffX);
        currentTailPosition.y += Math.sign(diffY);
      }
      else if (Math.abs(diffX) > 1) currentTailPosition.x += Math.sign(diffX);
      else if (Math.abs(diffY) > 1) currentTailPosition.y += Math.sign(diffY);

      visitedTailPositions.add(`${currentTailPosition.x},${currentTailPosition.y}`);
    }
  };
}
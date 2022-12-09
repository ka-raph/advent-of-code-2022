import puzzleInput from "./puzzleInput.js";

const visitedTailPositions = new Set();
const currentHeadPosition = {x: 0, y: 0};
const currentTailPosition = {x: 0, y: 0};

for (const line of puzzleInput.split('\n')) {
  const directionChar = line.charAt(0);
  const direction = 'UD'.includes(directionChar) ? 'y' : 'x';
  const sign = 'UR'.includes(directionChar) ? 1 : -1;
  const movementLength = parseInt(line.slice(2));


  for (let i = 0; i < movementLength; ++i) {
    currentHeadPosition[direction] += sign;
    const distanceX = Math.abs(currentTailPosition.x - currentHeadPosition.x);
    const distanceY = Math.abs(currentTailPosition.y - currentHeadPosition.y);
    if (distanceX <= 1 && distanceY <= 1) continue;

    const diffX = currentTailPosition.x - currentHeadPosition.x;
    const diffY = currentTailPosition.y - currentHeadPosition.y;
    const isMovingDiagonally = (Math.abs(diffX) + Math.abs(diffY)) > 2;
    if (isMovingDiagonally) {
      currentTailPosition.x -= Math.sign(diffX);
      currentTailPosition.y -= Math.sign(diffY);
    }
    else if (Math.abs(diffX) > 1) currentTailPosition.x -= Math.sign(diffX);
    else if (Math.abs(diffY) > 1) currentTailPosition.y -= Math.sign(diffY);
      //if (Math.abs(diffX) > 1 || isMovingDiagonally) isMovingDiagonally ? currentTailPosition.x -= Math.sign(diffX) : currentTailPosition.x += Math.sign(diffX);
      //if (Math.abs(diffY) > 1 || isMovingDiagonally) isMovingDiagonally ? currentTailPosition.y -= Math.sign(diffY) : currentTailPosition.y += Math.sign(diffY);

    visitedTailPositions.add(`${currentTailPosition.x},${currentTailPosition.y}`);
  }
};

console.log(visitedTailPositions.size);
// 6417 too high

const testSet = new Set([
	'1,0',
	'2,0',
	'3,0',
  '4,1',
  '4,2',
  '4,3',
  '3,4',
  '2,4',
  '3,3',
  '3,2',
  '2,2',
  '1,2',
]);

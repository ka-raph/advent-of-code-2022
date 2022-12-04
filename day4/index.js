import puzzleInput from "./puzzleInput.js";

const assignmentsPairs = puzzleInput.split('\n')
  .map(assignmentPair => assignmentPair.split(',')) // Array of arrays e.g. [['1-2', '5-8'], ['3-7', '2-6'], ...]
  .map(assignmentPair => {                          // Array of arrays each containing a pair of elfs assignments as 2 objects with min and max values
    const [ assignments1, assignments2 ] = [
      assignmentPair[0].split('-').map(section => parseInt(section)),
      assignmentPair[1].split('-').map(section => parseInt(section))
    ]; // Array of arrays containing min-max values for this elf's sections range as integers. E.g. [[1, 2], [5, 8]]

    return [
      {min: assignments1[0], max: assignments1[1]},
      {min: assignments2[0], max: assignments2[1]}
    ];
  });

let sumOfSectionsRangesContained = 0;
let sumOfOverlappingPairs = 0;

for (const pair of assignmentsPairs) {
  // We'll first assert which range has the lowest boundary even if lowest are equals
  const [ pairWithLowest, otherPair ] = pair[0].min <= pair[1].min ? [pair[0], pair[1]] : [pair[1], pair[0]];

   // Shorter than checking for the right conditions that makes a range containing another, we only check for when this is not possible
  if (!(pairWithLowest.min < otherPair.min && otherPair.max > pairWithLowest.max)) sumOfSectionsRangesContained++;

  // Part 2
  // Boundaries of each range cannot overlap nor touch
  if (pairWithLowest.min === otherPair.min || pairWithLowest.max >= otherPair.min) sumOfOverlappingPairs++;
};

console.log('Part 1:', sumOfSectionsRangesContained); // 413
console.log('Part 2:', sumOfOverlappingPairs);        // 806
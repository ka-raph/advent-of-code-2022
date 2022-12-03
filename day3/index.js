import puzzleInput from "./puzzleInput.js";

const rucksacks = puzzleInput.split('\n')                                   // Create an array with each item being a rucksack content's string
  .map(rucksack => ({                                                       // Create a new array of objects, each object (rucksack) contains two strings of same length:
    compartment1: rucksack.substring(0, rucksack.length / 2),               // Contents of compartment 1 of the rucksack
    compartment2: rucksack.substring(rucksack.length / 2, rucksack.length), // Contents of compartment 2 of the rucksack
    wholeContent: rucksack                                                  // For part 2, easier to process a full string at once
  }));                                                                      // E.g. [{compartment1: 'hqBqJsqHhHvhHHqlBvlfpHQ', compartment2 'QwLVzVwtVzjzttjQVSjMjwL}, {compartment1: 'gRTRnCRsFNGb', compartment2: 'TzLjwcSTMmSz'}, ...]

// Compute the padding for charcodes, they have a padding added to their index in the latin alphabet
// E.g. 'a'.charcodeAt(0) === 97, 'b'.charcodeAt(0) === 98, 'c'.charcodeAt(0) === 99 and so on...
// The uppercases letters have a "priority" that starts at 27 so we need to keep that padding
function charPriority(char) {
  const paddingLowercase = 'a'.charCodeAt(0) - 1;     // Padding from 0 to 97 (charcode for 'a')
  const paddingUppercase = 'A'.charCodeAt(0) - (27);  // Padding from 27
  const code = char.charCodeAt(0);

  return char.toLowerCase() === char ? code - paddingLowercase : code - paddingUppercase;
}


// We know that each rucksack always has exactly 1 item category that's found in both compartments
// We'll find it and sum up the "priority" for these misplaced items in all rucksacks
const misplacedItemsPrioritySum = rucksacks.reduce((currentSum, rucksack) => {
  for (const char of rucksack.compartment1) {
    if (rucksack.compartment2.indexOf(char) > -1) {
      return currentSum + charPriority(char);
    }
  }
}, 0);

console.log('Part 1:', misplacedItemsPrioritySum); // 7674


// ======================================PART 2======================================
const rucksacks2 = []
// Push groups of 3 rucksacks into `rucksacks2`
rucksacks.reduce((accumulator, rucksack, index) => {
  if (index < accumulator)          rucksacks2[rucksacks2.length - 1].push(rucksack); // Add to current group of (to be) 3 rucksacks
  else if (index === accumulator)   rucksacks2.push([rucksack]);                      // First rucksack of a group of 3
  return index === accumulator ? accumulator + 3 : accumulator;                       // Bump the accumulator by 3 after a new group is created
}, 0);

// This function will return the common item for the given group
function getCommonItem([rucksack1, rucksack2, rucksack3]) {
  for (const char of rucksack1.wholeContent) {
    if (rucksack2.wholeContent.indexOf(char) > -1 && rucksack3.wholeContent.indexOf(char) > -1) return char;
  }
}

// Sum up the common items's priority
const commonItemsPrioritySum = rucksacks2.reduce((currentSum, group) => currentSum + charPriority(getCommonItem(group)), 0);

console.log('Part 2:', commonItemsPrioritySum); // 2805
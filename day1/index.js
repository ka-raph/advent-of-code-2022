import puzzleInput from "./puzzleInput.js";

const globalCaloriesList = puzzleInput
  .split('\n\n')                                                          // Array with one "calories list" string per elf
  .map(currentElfCaloriesListRaw => currentElfCaloriesListRaw.split('\n') // Break each "calories list" string into an array of the calories
    .reduce((currentSum, a) => currentSum + parseInt(a, 10), 0))          // Change the current "calories list" array into its total calories value (integer)
  .sort((a, b) => b - a);                                                 // Sort the "total calories per elf" integers in descending order

console.log('Part 1:', globalCaloriesList[0]); // 65912
console.log('Part 2:', globalCaloriesList[0] + globalCaloriesList[1] + globalCaloriesList[2]); // 195625
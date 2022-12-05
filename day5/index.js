import puzzleInput from "./puzzleInput.js";

const splittedPuzzleInput = puzzleInput.split('\n\n');                    // Not necessary but avoid going through the whole input twice
const stackSchema = splittedPuzzleInput[0].split('\n 1');
const stacksString = stackSchema[0];
const stacksAmount = parseInt(stackSchema[1][stackSchema[1].length - 2]);
const instructions = splittedPuzzleInput[1]                               // Return an array of instructions (object) e.g. [{amount: 1, from: 2, to: 3}, {amount: 3, from: 6, to: 4}, ...]
  .split('\n')
  .map(line => {
    const splittedInstruction = line.split(' from ');
    const amount = splittedInstruction[0].split('move ')[1];
    const from = splittedInstruction[1].split(' to ')[0];
    const to = splittedInstruction[1].split(' to ')[1];
    return {amount, from, to};
  });

const stacks = new Array(stacksAmount + 1).fill(null).map((item) => new Array()); // Initialize with one empty array so we don't need to convert stack number to index
const stacks2 = JSON.parse(JSON.stringify(stacks));                               // Deep copy so we don't mess up with the original

stacksString.split('\n')
  .map(line => line.match(/.{1,4}/g))       // Cut every 4th character so we get an array with each item beaing a slot e.g. ['[R] ', '    ', '    ', '[Q] ', '[V] ', '[B] ', '[G] ', '[J] ', '   ']
  .forEach(line => {
    for (let i = 0; i < line.length; i++) {
      const char = line[i].charAt(1);       // Character at index 1 is either space or number, but not the "[" or "]"
      if (char !== ' ') {                   // Put the crate character at start of the array since we read from top to bottom
        stacks[i + 1].unshift(char);
        stacks2[i + 1].unshift(char);
      }
    }
  });


instructions.forEach(instruction => {
  const fromStack = stacks[instruction.from];
  const movedItems = fromStack.splice(fromStack.length - instruction.amount, instruction.amount).reverse(); // Remove the last X amount of crates from column Y and reverse the order so the one on top is the first one down
  stacks[instruction.to].splice(stacks[instruction.to].length, 0, ...movedItems);                           // Add the crates to the new stack

  // PART 2
  const fromStack2 = stacks2[instruction.from];
  const movedItems2 = fromStack2.splice(fromStack2.length - instruction.amount, instruction.amount);        // Remove the last X amount of crates from column Y
  stacks2[instruction.to].splice(stacks2[instruction.to].length, 0, ...movedItems2);                        // Add the crates to the new stack
});

const topCrates = stacks.map(stack => stack[stack.length - 1]).join('');    // Just grabbing the last one of each stack and make a string with those
const topCrates2 = stacks2.map(stack => stack[stack.length - 1]).join('');
console.log('Part 1:', topCrates); // ZRLJGSCTR
console.log('Part 2:', topCrates2); // ZRLJGSCTR
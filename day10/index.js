import puzzleInput from "./puzzleInput.js";

const instructions = new Map();

const firstCheck = 20;
const checkIncrement = 40;
const lastCycleToCheck = 220;

// We'll create a map of the instructions, the keys will be the cycle index, the current value is added so we can see it at any point
let cycle = 1;
let currentVal = 1;
puzzleInput.split('\n').forEach(line => {
  const [instruction, value] = line.split(' ');
  
  if (instruction === 'noop') { // Do nothing
    instructions.set(cycle, currentVal);
  }
  else { // It takes 2 cycles to add the value from the instruction
    instructions.set(cycle, currentVal);
    instructions.set(cycle + 1, currentVal);
    currentVal += parseInt(value);
    ++cycle;
  }

  ++cycle;
});

// Now we just need to check at every 40 cycles starting from cycle 20
let signalStrength = 0;
for (let i = firstCheck; i <= lastCycleToCheck; i += checkIncrement) {
  signalStrength += instructions.get(i) * i;
}

console.log('Part 1:', signalStrength); // 12980


// ======================================PART 2======================================
let out = ``;

for (let i = 1; i < instructions.size; i++) {
  // Get the amount of visible pixels for this sprite
  const spritePixels = (i % checkIncrement || checkIncrement) - instructions.get(i) + 1;
  if (1 <= spritePixels && spritePixels <= 3) { // Over 3 and it's not visible
    out += "#";
  } else {
    out += ".";
  }

  // Every 40 instructions is a new line
  if (i % checkIncrement === 0) {
    out += "\n";
  }
}

console.log(`Part 2:\n${out}`); // BRJLFULP
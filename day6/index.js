import puzzleInput from "./puzzleInput.js";

// Can break if `i` is greater than `pouzzleInput.length - markerLength`, it can be fixed by adding an extra check in the if statement

let markerLength = 4;   // Size of the bulk of characters that need to be checked
for (let i = 0; i < puzzleInput.length; i++) {
    const arr = [puzzleInput[i]];
    for (let j = 1; j < markerLength; j++) {
        if (!arr.includes(puzzleInput[i+j])) arr.push(puzzleInput[i+j]);
        else {
            break;
        }
    }
    if (arr.length === markerLength) {
        console.log(i + markerLength); // 1647
        break;
    }
}

// PART 2
markerLength = 14;
for (let i = 0; i < puzzleInput.length; i++) {
    const arr = [puzzleInput[i]];
    for (let j = 1; j < 14; j++) {
        if (!arr.includes(puzzleInput[i+j])) arr.push(puzzleInput[i+j]);
        else {
            break;
        }
    }
    if (arr.length === markerLength) {
        console.log(i + markerLength); // 2447
        break;
    }
} 
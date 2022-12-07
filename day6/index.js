import puzzleInput from "./puzzleInput.js";

// Can break if `i` is greater than `puzzleInput.length - markerLength`, it can be fixed by adding an extra check in the if statement. Not needed for that challenge.

let markerLength = 4;   // Size of the bulk of characters that need to be checked
console.log('Part 1:', getIndexAfterMarker(markerLength)); // 1647

markerLength = 14;
console.log('Part 2:', getIndexAfterMarker(markerLength)); // 2447

function getIndexAfterMarker(length) {
    for (let i = 0; i < puzzleInput.length; i++) {
        if (new Set(puzzleInput.slice(i, i + length)).size === length) { // Duplicates are not added twice to the Set, therefore it's length is lower if there are any
            return i + length;
        }
    }
}
import puzzleInput from "./puzzleInput.js";

const instructionsLines = puzzleInput.split('\n');
let bigDirsTotalSize = 0; // Directories with size above 100 000
const dirStructure = {};  // Object to be populated with the file structure
const maxSize = 100_000;

getDirStructure(dirStructure, '', 0);
console.log('Part 1:', bigDirsTotalSize); // 1908462

// Part 2
const totalStorage = 70_000_000;
const minimumFreeSpace = 30_000_000;
const currentFreeSpace = totalStorage - dirStructure['root'].size;  // 26_043_024
const sizeToRemove = minimumFreeSpace - currentFreeSpace;
let closestSize = -1;

getClosestInObj(dirStructure['root']);
console.log('Part 2:', closestSize);  // 3979145



// Populates the dirStructure object from the input and adds a "size" key/value pair into each directory's object
// Don't want to brag but did that even before phase 2 :D
function getDirStructure(currentDir, currentDirPath, lineIndex) {
  let line = instructionsLines[lineIndex];
  if (lineIndex >= instructionsLines.length && currentDirPath !== 'root') line = '$ cd ..';   // End of file, but we still are in the last nested dir
  else if (lineIndex >= instructionsLines.length) return;                                     // End recursion

  // The next 2 values are updated if we're navigating between dirs, better not mutate the function parameters directly
  let dir = currentDir;
  let dirPath = currentDirPath;

  // Look for change directory statement
  if (line.charAt(0) === '$' && line.slice(2, 4) === 'cd') {                    
    const targetDirName = line.slice(5);

    if (targetDirName === '..') { // Going one level up                                        
      const dirSize = dir.size;
      if (dirSize <= maxSize) bigDirsTotalSize += dirSize; // Add directory's total size if it's below 100 000, files can be counted more than once

      // Update path
      const splittedPath = dirPath.split('/');
      splittedPath.pop();

      // Set variables for next recusrion
      dir = splittedPath.reduce((obj, path) => obj[path], dirStructure);  // Going up one level in the dirStructure object
      dirPath = splittedPath.join('/');

      dir.size += dirSize;
    }
    else if (targetDirName === '/') { // "/" causes issues since this is used for path splitting, could use other characters for path splitting instead
      dirStructure['root'] = {size: 0};
      dir = dirStructure['root'];
      dirPath += 'root';
    }
    else {  // Navigate to a sub directory
      dir = dir[targetDirName] ?? {size: 0};
      dirPath += `/${targetDirName}`;
    }
  }
  else if (line.slice(0, 3) === 'dir') { // Listed directory
    dir[line.slice(4)] = {size: 0};
  }
  else if (line.charAt(0) !== '$') {  // Listed file & avoid `ls` since it has no use in the current function
    const [fileSize, fileName] = line.split(' ');
    dir[fileName] = parseInt(fileSize);
    dir.size += parseInt(fileSize);
  }

  getDirStructure(dir, dirPath, lineIndex + 1); // Recursion with updated parameters
}


// Recursion to find the directory with the closest (higher or equals to) minimum size we need to remove
function getClosestInObj(dir) {
  if (closestSize === -1 || (dir.size < closestSize && dir.size >= sizeToRemove)) closestSize = dir.size;

  for (const key of Object.keys(dir)) {
    if (typeof dir[key] === 'object') {
      getClosestInObj(dir[key]);
    }
  }
}
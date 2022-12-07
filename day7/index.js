import puzzleInput from "./puzzleInput.js";

const instructionsLines = puzzleInput.split('\n');
let bigFoldersTotalSize = 0;  // Folders with size above 100 000
const folderStructure = {};   // Object to be populated with the file structure
const maxSize = 100_000;

getFolderStructure(folderStructure, '', 0);
console.log('Part 1:', bigFoldersTotalSize); // 1908462

// Part 2
const totalStorage = 70_000_000;
const minimumFreeSpace = 30_000_000;
const currentFreeSpace = totalStorage - folderStructure['root'].size; // 26_043_024
const sizeToRemove = minimumFreeSpace - currentFreeSpace;
let closestSize = -1;

getClosestInObj(folderStructure['root']);

console.log('Part 2:', closestSize) // 3979145

// Populates the folderStructure object from the input and adds a "size" key/value pair into each directory's object
// Don't want to brag but did that even before phase 2 :D
function getFolderStructure(currentFolder, currentFolderPath, lineIndex) {
  let line = instructionsLines[lineIndex];
  if (lineIndex >= instructionsLines.length && currentFolderPath !== 'root') line = '$ cd ..';  // End of file, but we still are in the last nested folder
  else if (lineIndex >= instructionsLines.length) return;                                       // End recursion

  // The next 2 values are updated if we're navigating between folders, better not mutate the function parameters directly
  let folder = currentFolder;
  let folderPath = currentFolderPath;

  // Look for change directory statement
  if (line.charAt(0) === '$' && line.slice(2, 4) === 'cd') {                    
    const targetFolderName = line.slice(5);

    // Going one level up
    if (targetFolderName === '..') {                                            
      const dirSize = folder.size;
      if (dirSize <= maxSize) bigFoldersTotalSize += dirSize;               // Count folder folder if it's below 100 000, files can be counted more than once

      // Update path
      const splittedPath = folderPath.split('/');
      splittedPath.pop();

      // Set variables for next recusrion
      folder = splittedPath.reduce((obj, path) => obj[path], folderStructure);  // Going up one level in the folderStructure object
      folderPath = splittedPath.join('/');

      folder.size += dirSize;
    }
    // "/" causes issues since this is the character used for path splitting, renaming it
    else if (targetFolderName === '/') {
      folderStructure['root'] = {size: 0};
      folder = folderStructure['root'];
      folderPath += 'root';
    }
    // Navigate to a subdirectory
    else {
      folder = folder[targetFolderName] ?? {size: 0};
      folderPath += `/${targetFolderName}`;
    }
  }
  // Listed folder
  else if (line.slice(0, 3) === 'dir') {
    folder[line.slice(4)] = {size: 0};
  }
  // Listed file
  else if (line.charAt(0) !== '$') {  // avoid `ls` since it has no use in the current function
    const [fileSize, fileName] = line.split(' ');
    folder[fileName] = parseInt(fileSize);
    folder.size += parseInt(fileSize);
  }

  getFolderStructure(folder, folderPath, lineIndex + 1,); // This is the principle of recursion, the function calls itself with another set of paraeters (else one might end up in infinite recursion/stack overflow)
}


// Recursion to find the directory with the closest (highe ror equals to) size we need to remove
function getClosestInObj(dir) {
  if (closestSize === -1 || (dir.size < closestSize && dir.size >= sizeToRemove)) closestSize = dir.size;

  for (const key of Object.keys(dir)) {
    if (typeof dir[key] === 'object') {
      getClosestInObj(dir[key]);
    }
  }
}
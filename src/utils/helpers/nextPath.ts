import * as fs from 'fs';
import path from 'path';

// Replace 'app' with 'pages' if you want to search in the '/pages' directory
// const mainDirectory = 'src/app/(admin)/admin/';

// Define the directory path
// const directoryPath = path.join(process.cwd(), mainDirectory);

// Function to recursively read directory contents
function getFolderPaths(dir: string, folderList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Add the folder path to the list
      folderList.push(filePath.replace(/\\/g, '/'));
      // Recursively call the function if it's a directory
      getFolderPaths(filePath, folderList);
    }
  });

  return folderList;
}

// Get all folder paths in the directory
export const folderPaths = (mainDirectory: string) => {
  const directoryPath = path.join(process.cwd(), mainDirectory);

  const nav = getFolderPaths(directoryPath).map((paths) => {
    // console.log('paths', paths.split(mainDirectory)[1]);
    return paths.split(mainDirectory)[1];
  });

  return nav;
};

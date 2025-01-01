import fs from 'fs';
import path from 'path';

const removeFilesInFolder = (folderPath: string) => {
  if (fs.existsSync(folderPath)) {
    // Read the contents of the folder
    const files = fs.readdirSync(folderPath);

    // Iterate through the files and remove them
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      // Check if the current item is a file (not a directory)
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath); // Remove the file
        console.log(`Removed file: ${filePath}`);
      }
    });
  } else {
    console.log(`Folder does not exist: ${folderPath}`);
  }
};

export default removeFilesInFolder;

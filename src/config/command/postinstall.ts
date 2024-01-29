const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');

const sourceFolder = path.join(__dirname, 'dist/database');
const destinationFolder = path.join(__dirname, 'src/database');

console.log('asu');
// Check if the source folder exists before copying
if (fs.existsSync(sourceFolder)) {
  // Use ncp to copy the folder
  ncp(sourceFolder, destinationFolder, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('Database folder copied successfully!');
  });
} else {
  console.log('Source database folder not found. Skipping copy.');
}

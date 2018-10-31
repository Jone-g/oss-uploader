const fs = require('fs');

const files = [];
let pathReg = '';

function scanDir(path) {
  const that = this;
  if (fs.statSync(path).isFile()) {
    return files.push({
      fileName: path.replace(pathReg,  ''),
      filePath: path
    })
  }
  try {
    fs.readdirSync(path).forEach(file => {
      scanDir.call(that, path + '/' + file);
    })
  } catch (e) {
    console.log(e);
  }
}

exports.getFiles = function(path) {
  pathReg = path + '/';
  scanDir(path);
  return files;
}
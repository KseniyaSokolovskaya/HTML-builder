const path = require('path');
const { readdir, readFile, writeFile } = require('fs').promises;

const initialDirPath = path.resolve(__dirname, 'styles');
const EXTENSION = '.css';
const destFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
exports = module.exports = {};

async function getDirectoryFilesPath(dirPath, ext) {
  const files = await readdir(dirPath, { withFileTypes: true, }, (err, files) => {
    if (err) {
      console.log('err', err);
    }
    return files.filter(file => path.extname(file.name) === ext)
      .map(file => path.join(dirPath, file.name));
  });

  return files.filter(file => path.extname(file.name) === ext)
    .map(file => path.join(dirPath, file.name));
}

async function concatFiles(array) {
  const promises = array.map(path => readFile(path, 'utf-8'));
  const results = await Promise.all(promises);
  const result = results.join('\n');
  return result;
}

async function buildFiles(dirPath, destFilePath, ext) {
  let cssFilesPath = await getDirectoryFilesPath(dirPath, ext);

  let buildFile = await concatFiles(cssFilesPath);
  writeFile(destFilePath, buildFile, 'utf-8');
}

buildFiles(initialDirPath, destFilePath, EXTENSION);

exports.buildFiles = buildFiles;

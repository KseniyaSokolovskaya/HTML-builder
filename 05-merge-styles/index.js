const path = require('path');
const { readdir, readFile, writeFile } = require('fs').promises;

const initialDirPath = path.resolve(__dirname, 'styles');
const EXTENSION = '.css';
const destFilePath = path.join(__dirname, 'project-dist', 'bundle.css');


async function getDirectoryFilesPath() {
  const files = await readdir(initialDirPath, { withFileTypes: true, }, (err, files) => {
    if (err) {
      console.log('err', err);
    }
    return files.filter(file => path.extname(file.name) === EXTENSION)
      .map(file => path.join(initialDirPath, file.name));
  });
  return files.filter(file => path.extname(file.name) === EXTENSION)
    .map(file => path.join(initialDirPath, file.name));
}

async function concatFiles(array) {
  const promises = array.map(path => readFile(path, 'utf-8'));
  const results = await Promise.all(promises);
  const result = results.join('\n');
  return result;
}

(async () => {
  let cssFilesPath = await getDirectoryFilesPath();
  let buildFile = await concatFiles(cssFilesPath);
  writeFile(destFilePath, buildFile, 'utf-8');
})();

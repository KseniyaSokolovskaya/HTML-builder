const path = require('path');
const { readdir, mkdir, rmdir, copyFile } = require('fs').promises;

const initialDirPath = path.resolve(__dirname, 'files');
const copyDirPath = path.resolve(__dirname, 'files-copy');

const reWriteDirectory = async () => {
  await rmdir(copyDirPath, { recursive: true });
  await mkdir(copyDirPath, { recursive: true });
};

async function copyFiles(name) {
  const initialFilePath = path.resolve(initialDirPath, name);
  const copyFilePath = path.resolve(copyDirPath, name);
  await copyFile(initialFilePath, copyFilePath, null, (err) => {
    if (err) throw err;
  });
}

async function getDirectoryFiles() {
  const files = await readdir(initialDirPath, { withFileTypes: true, });
  files.forEach(file => {
    file.isFile() && copyFiles(file.name);
  });
}

(async () => {
  await reWriteDirectory();
  await getDirectoryFiles();
})();

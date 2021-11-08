const path = require('path');
const { readdir, mkdir, rmdir, copyFile } = require('fs').promises;
exports = module.exports = {};

const initialDirPath = path.resolve(__dirname, 'files');
const copyDirPath = path.resolve(__dirname, 'files-copy');

async function copyDir(fromPath, toPath) {
  const entries = await readdir(fromPath, { withFileTypes: true });
  await mkdir(toPath, { recursive: true });
  for (let entry of entries) {
    const srcPath = path.join(fromPath, entry.name);
    const destPath = path.join(toPath, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

(async () => {
  await rmdir(copyDirPath, { recursive: true })
  await copyDir(initialDirPath, copyDirPath);
})();

exports.copyDir = copyDir;

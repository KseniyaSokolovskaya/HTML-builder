const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './text.txt');

const readFile = (path, coding) => new Promise((resolve, reject) => {
  fs.readFile(path, coding, (error, data) => {
    if (error) {
      console.log('err');
      reject(error);
    }
    console.log(data);
    resolve(data);
  });
});

(async () => {
  await readFile(filePath, 'utf8');
})();

const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'secret-folder');
fs.promises.readdir(filePath, 'utf-8', true)
  .then(filenames => {
    for (let filename of filenames) {
      let file = filePath + '/' + filename;
      fs.stat(file, (err, stats) => {
        if (!err) {
          if (stats.isFile()) {
            console.log(`${path.basename(file, path.extname(file))} - ${path.extname(file).slice(1)} - ${stats.size}b`);
          }
        }
        else
          throw err;
      });
    }
  })
  .catch(err => {
    console.log(err);
  });

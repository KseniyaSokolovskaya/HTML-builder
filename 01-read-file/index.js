const fs = require('fs');
const path = require('path');
const process = require('process');

const filePath = path.join(__dirname, './text.txt');
const stream = new fs.ReadStream(filePath);

stream.on('readable', function () {
  stream.setEncoding('utf8');
  const data = stream.read();
  data && process.stdout.write(data);
});

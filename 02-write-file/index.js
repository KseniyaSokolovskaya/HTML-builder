const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = require('process');
const EventEmitter = require('events');

const emitter = new EventEmitter();

const filePath = path.join(__dirname, '', 'text.txt');

fs.writeFile(filePath, '', (err) => {
  if (err) {
    throw err;
  }
  stdout.write('Enter text:\n');
});


emitter.on('start', () => {
  stdin.on('data', data => {
    if (!data || Buffer.from(data).toString('utf-8').slice(0, -1) === 'exit') {
      stdout.write('Good bye!');
      process.exit();
    } else {
      fs.appendFile(filePath, data, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  });
});

process.on('SIGINT', () => {
  stdout.write('\nThank you for text!');
  process.exit();
});

emitter.emit('start');

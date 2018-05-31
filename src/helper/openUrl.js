const {exec} = require('child_process');
/* eslint-disable */
module.exports = url => {
  switch (process.platform) {
    case 'darwin':
      exec(`open ${url}`);
      break;
    case 'win32':
      exec(`start ${url}`);
      break;
    case 'win64':
      exec(`start ${url}`);
      break;
  }
};

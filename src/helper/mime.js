const path = require('path');

const mineTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpg',
  'js': 'text/javascript',
  'json': 'application/json',
  'txt': 'text/plain',
  'xml': 'text/xml'
};

module.exports = (filepath)=>{
  let ext = path.extname(filepath).split('.').pop();

  if(!ext){
    ext = filepath;
  }

  return mineTypes[ext] || mineTypes['txt'];
};

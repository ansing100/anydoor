const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const path = require('path');
const handlebars = require('handlebars');
const dirTplPath = path.join(__dirname,'../templates/dir.tpl');
const dirSource = fs.readFileSync(dirTplPath);
const dirTemplate = handlebars.compile(dirSource.toString());
// const fileTplPath = path.join(__dirname,'../templates/file.tpl');
// const fileSource = fs.readFileSync(fileTplPath);
// const fileTemplate = handlebars.compile(fileSource.toString());
// const config = require('../config/defaultConfig');
const mime = require('../helper/mime');
const compress = require('../helper/compress');

const range = require('../helper/range');

const isFresh = require('../helper/cache');

module.exports = async function (req, res, filePath,config) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType = mime(filePath);
      res.setHeader('Content-Type', contentType);

      /**
       * 添加缓存逻辑处理
       */
      if (isFresh(stats,req,res)){
        res.statusCode = 304;
        res.end();
        console.info('这次返回的是缓存');
        return;
      }

      /**
       * 添加range请求的处理
       */
      let rs;
      const {code,start,end} = range(stats.size,req,res);

      if(code === 200){
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      }else if(code === 206){//处理range请求，只返回部分内容
        res.statusCode = 206;
        rs = fs.createReadStream(filePath,{start,end});
      }else{
        //其实应该是处理其他非200响应的错误分支
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      }

      /**
       * 根据文件类型进行响应内容压缩处理
       */
      if(filePath.match(config.compress)){

        rs = compress(rs,req,res);
        console.info('compressing...');
      }
      rs.pipe(res);

      //采用模板输出文件
      // res.setHeader('Content-Type', 'text/html');
      // const content = fs.readFileSync(filePath,{encoding:'utf8'});
      // const dir = path.dirname(path.relative(config.root,filePath));
      // const data = {
      //   title:path.basename(filePath),
      //   dir:dir?`${dir}`:'',
      //   content
      // };
      // res.end(fileTemplate(data));

    } else if (stats.isDirectory) {
      try {
        const files = await readdir(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        const dir = path.relative(config.root,filePath);
        const parentDir = path.dirname(path.relative(config.root,filePath));
        const data = {
          title:path.basename(filePath),
          dir:dir?`/${dir}`:'',
          parentDir,
          files
        };
        res.end(dirTemplate(data));
        // res.end(files.join(' '));

      } catch (ex) {
        console.error(ex.toString());
      }

    }
  } catch (ex) {
    console.error(ex);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not a directory or file.\n${ex.toString()}`);
  }
};

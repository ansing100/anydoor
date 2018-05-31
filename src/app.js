const http = require('http');
const chalk = require('chalk');
const conf = require('./src/config/defaultConfig');
const path = require('path');
const route = require('./src/helper/router');

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url);

  route(req,res,filePath);

  // fs.stat(filePath, (err, stats) => {
  //   if (err) {
  //     res.statusCode = 404;
  //     res.setHeader('Content-Type', 'text/plain');
  //     res.end(`${filePath} is not a directory or file.`);
  //     return;
  //   }
  //   if (stats.isFile()) {
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'text/plain');
  //     fs.createReadStream(filePath).pipe(res);
  //     // fs.readFile(filePath,(err,data)=>{
  //     //   res.end(data);
  //     // });
  //
  //   } else {
  //     fs.readdir(filePath, (err, files) => {
  //       res.statusCode = 200;
  //       res.setHeader('Content-Type', 'text/plain');
  //       res.end(files.join(' '));
  //     });
  //   }
  // });

  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/html');
  console.info(filePath);
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
});

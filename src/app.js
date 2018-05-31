const http = require('http');
const chalk = require('chalk');
const conf = require('./config/defaultConfig');
const path = require('path');
const route = require('./helper/router');
const openUrl = require('./helper/openUrl');

class Server {
  constructor(config) {
    // console.info('config:'+config.port);
    // console.info('conf:'+conf.port);
    this.conf = Object.assign({}, conf, config);
  }

  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url);

      route(req, res, filePath,this.conf);
      // console.info(filePath);
    });

    console.info('port:'+this.conf.port);
    console.info('host:'+this.conf.hostname);

    server.listen(this.conf.port, this.conf.hostname, () => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      console.info(`Server started at ${chalk.green(addr)}`);
      openUrl(addr);
    });

  }
}

module.exports = Server;

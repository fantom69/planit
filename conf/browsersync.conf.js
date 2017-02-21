const conf = require('./gulp.conf');

var url = require('url');
var proxy = require('proxy-middleware');
var proxyOptions = url.parse('http://localhost:8080');
proxyOptions.route = '/services';

module.exports = function () {
  return {
    server: {
        baseDir: [
          conf.paths.tmp,
          conf.paths.src
        ],
        middleware: [proxy(proxyOptions)]
    },
    open : true,
    port : 3000
  };
};

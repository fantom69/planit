const conf = require('./gulp.conf');
const apiUrl = require('url');
const proxy = require('proxy-middleware');
/*var proxyOptions = url.parse('http://localhost:8080');
proxyOptions.route = '/JerseyDemo/';*/


module.exports = function () {

  var proxyOptions = apiUrl.parse('http://localhost:8000/planitBO');
  proxyOptions.route = '/planitBO';

  return {
    server: {
        baseDir: [
          conf.paths.tmp,
          conf.paths.src
        ],
        middleware: [proxy(proxyOptions)]
    },
    
    open : false,
    notify: false // suppression toast
  };
};

/*
const conf = require('./gulp.conf');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.dist
      ]
    },
    open: false
  };
};*/
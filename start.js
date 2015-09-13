/**
 * Created by lihui on 15-9-10.
 */
module.exports = function(mock2easy,options ,ck){
  var fs = require('fs');
  var path = require('path');
  global._ = require('underscore');


  if (arguments.length == 2){
    ck = options;
    options = _.extend({
      port:3000,
      lazyLoadTime:3000,
      database:'mock2easy',
      doc:'doc',
      keepAlive:true,
      isSpider:false,
      ignoreField:[],
      interfaceSuffix:'.json',
      preferredLanguage:'en'
    },mock2easy);
    mock2easy = {
      log: console.log,
      error: console.error
    }
  }

  global.options = options;
  global.language = require('./server/translate')(mock2easy,options.preferredLanguage);

  require('./server/cleanInterface')(mock2easy).then(function(){
    ck(require('./app')(mock2easy,options));
  });

}

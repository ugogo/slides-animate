var domready = require('domready');
var qwery = require('qwery');
var bonzo = require('bonzo');
var bean = require('bean');
var localLogger = require('./logger.js');

domready(function() {
  console.log('domready!');

  localLogger('pouet');

  // query selector engine
  // https://github.com/ded/qwery
  var $p = qwery('p');

  // extensible DOM utility
  // https://github.com/ded/bonzo
  bonzo($p)
    .addClass('pouet')
    .css({
      color: '#444'
    });

  // events api for javascript
  // https://github.com/fat/bean
  bean.on(document.body, 'click', function(e){
    console.log('body clicked', e);
  });

});

var slides = {
  $el: document.querySelectorAll('.slide')
};

var Slides = function(opts){
  for(var entry in opts){
    this[entry] = opts[entry];
  }
};

Slides.prototype = slides;
Slides.prototype.init = function(){
  console.log('Slides.init();');
};

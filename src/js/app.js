var slides = {
  $el: document.querySelectorAll('.slide'),
  elCounter: 0,
  isBusy: true
};

var Slides = function(opts){
  for(var entry in opts){
    this[entry] = opts[entry];
  }
};

Slides.prototype = slides;
Slides.prototype.setCurrent = function(){
  this.$el[this.elCounter ].classList.add('is-current');
};
Slides.prototype.init = function(){

  // count total slides
  this.elLength = this.$el.length;

  // set current slide
  this.setCurrent();

  // ready
  this.isBusy = false;
};

// init slides
slides.init();

// keyboard navigation
document.onkeydown = function(e){
  var dir, canAnim;
  var keyCode = e.keyCode;

  if(keyCode === 39){
    dir = 'next';
    canAnim = (slides.elCounter < slides.elLength - 1);
  }
  else if(keyCode === 37){
    dir = 'prev';
    canAnim = (slides.elCounter > 0);
  }

  if(canAnim && !this.isBusy){
    slides.isBusy = true;
    // this.animSlides(dir);
  }
};

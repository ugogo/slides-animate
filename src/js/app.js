var slides = {
  $el: document.querySelectorAll('.slide'),
  elCounter: 0,
  isBusy: true,

  array: [],

  // slides
  // {$el: $el, animationIn: 'fadeIn'};
  current: null,
  next: null,

  // direction 'next'|'prev'
  currentDir: null
};

var Slides = function(opts){
  for(var entry in opts){
    this[entry] = opts[entry];
  }
};

Slides.prototype = slides;
Slides.prototype.init = function(){
  // count total slides
  this.elLength = this.$el.length;

  // set current slide
  this.$el[this.elCounter].classList.add('is-current');

  // create an object for each slide
  // and push it to a main array
  [].forEach.call(
    this.$el,
    function($el, i){
      var obj = {
        $el: $el,
        animationIn: $el.dataset.animation
      };
      slides.array.push(obj);
    }
  );

  // ready
  this.isBusy = false;
};
Slides.prototype.animationCallback = function(){
  // current slide
  slides.current.$el.classList.remove('is-current');
  slides.current.$el.classList.remove('fadeOut');

  // next slide
  this.classList.add('is-current');
  this.classList.remove(slides.next.animationIn);
  this.removeEventListener('webkitAnimationEnd', slides.animationCallback);

  // update counter
  if(slides.currentDir == "next")
    slides.elCounter++;
  else
    slides.elCounter--;

  // can animate again
  slides.isBusy = false;
};
Slides.prototype.animSlides = function(){
  // targets
  this.current = this.array[this.elCounter];
  this.next = this.array[ this.currentDir === "next" ? this.elCounter + 1 : this.elCounter - 1 ];

  // current slide
  this.current.$el
    .classList.add('fadeOut');

  // next slide
  this.next.$el
    .classList.add(this.next.animationIn);

  // callback on next
  this.next.$el.addEventListener('webkitAnimationEnd', slides.animationCallback);
};

// init slides
slides.init();

// keyboard navigation
document.onkeydown = function(e){
  var canAnim;
  var keyCode = e.keyCode;

  if(keyCode === 39){
    slides.currentDir = 'next';
    canAnim = (slides.elCounter < slides.elLength - 1);
  }
  else if(keyCode === 37){
    slides.currentDir = 'prev';
    canAnim = (slides.elCounter > 0);
  }

  if(canAnim && !slides.isBusy){
    slides.isBusy = true;
    slides.animSlides();
  }
};

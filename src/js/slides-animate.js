var slidesAnimate = (function(opts){
  'use strict';

  // default opts
  var slides = {
    $el: document.querySelectorAll('[data-animation-show]'),
    supportChilds: false,
    elCounter: 0,
    isBusy: true,

    array: [],

    // slides
    // {$el: $el, animationShow: 'fadeIn'};
    current: null,
    next: null,

    // direction 'next'|'prev'
    currentDir: null,

    // animations
    animations: {
      show: 'fadeIn',
      hide: 'fadeOut',
      delay: 0
    }
  };

  var init = function(opts){
    // set options
    for(var option in opts){
      slides[option] = opts[option];
    }

    // count total slides
    slides.elLength = slides.$el.length;

    // set current slide
    slides.$el[slides.elCounter].classList.add('is-current');

    // create an object for each slide
    // and push it to the main slides.array
    [].forEach.call(slides.$el, function($el, i){
      var currentSlide = {
        $el: $el,
        animationShow:  $el.dataset.animationShow  || slides.animations.show,
        animationHide:  $el.dataset.animationHide  || slides.animations.hide,
        animationDelay: $el.dataset.animationDelay || slides.animations.delay
      };

      // if supportChilds
      // push an array of current slide's child
      // into the current slide object
      if(slides.supportChilds){
        var $childs = $el.querySelectorAll('.slide-child');
        var childsArray = [];

        [].forEach.call($childs, function($el, i){
          var currentChild = {
            $el: $el,
            animationShow:  $el.dataset.animationShow  || slides.animations.show,
            animationHide:  $el.dataset.animationHide  || slides.animations.hide,
            animationDelay: $el.dataset.animationDelay || slides.animations.delay
          };
          $el.dataset.status = 'hidden';
          childsArray.push(currentChild);
        });
        currentSlide.childs = childsArray;
      }

      slides.array.push(currentSlide);
    });

    // ready
    slides.isBusy = false;
  };
  var animationCallback = function(){
    // current slide
    slides.current.$el.classList.remove('is-current');
    slides.current.$el.classList.remove(slides.current.animationHide);

    // next slide
    this.classList.add('is-current');
    this.classList.remove(slides.next.animationShow);
    this.removeEventListener('webkitAnimationEnd', animationCallback);

    // update counter
    if(slides.currentDir === "next")
      slides.elCounter++;
    else
      slides.elCounter--;

    // can animate again
    slides.isBusy = false;
  };
  var animSlides = function(){
    // targets
    slides.current = slides.array[slides.elCounter];
    slides.next = slides.array[ slides.currentDir === "next" ? slides.elCounter + 1 : slides.elCounter - 1 ];

    // current slide
    setTimeout(function(){
      slides.current.$el
        .classList.add(slides.current.animationHide);
    }, slides.current.animationDelay);

    // next slide
    setTimeout(function(){
      slides.next.$el
        .classList.add(slides.next.animationShow);
    }, slides.next.animationDelay);

    // callback on next
    slides.next.$el.addEventListener('webkitAnimationEnd', animationCallback);
  };

  // init slides
  init(opts);

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

    if(canAnim && !slides.isBusy){
      slides.currentDir = dir;
      slides.isBusy = true;
      animSlides();
    }
  };

  return slides;
});
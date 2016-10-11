/* Start and stop animations using functions. */

function startAnimation() {
  ...
}

function stopAnimation() {
  ...
}



/* Anim class. */

var Anim = function() {
  ...
};
Anim.prototype.start = function() {
  ...
};
Anim.prototype.stop = function() {
  ...
};

/* Usage. */

var myAnim = new Anim();
myAnim.start();
...
myAnim.stop();



/* Anim class, with a slightly different syntax for declaring methods. */

var Anim = function() { 
  ...
};
Anim.prototype = {
  start: function() {
    ...
  },
  stop: function() {
    ...
  }
};



/* Add a method to the Function class that can be used to declare methods. */

Function.prototype.method = function(name, fn) {
  this.prototype[name] = fn;
};

/* Anim class, with methods created using a convenience method. */

var Anim = function() { 
  ...
};
Anim.method('start', function() {
  ...
});
Anim.method('stop', function() {
  ...
});



/* This version allows the calls to be chained. */

Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};

/* Anim class, with methods created using a convenience method and chaining. */

var Anim = function() { 
  ...
};
Anim.
  method('start', function() {
    ...
  }).
  method('stop', function() {
    ...
  });

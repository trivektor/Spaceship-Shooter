function Game(options) {
  var canvas  = options.canvas,
      context = canvas.getContext('2d'),
      FPS     = 24;
  
  this.context = context;
  
  this.spaceship = new Spaceship({
    x: 224, 
    y: 420, 
    context: context,
    bullets: [],
  });
  
  this.width = canvas.width;
  this.height = canvas.height;
  this.listenToKeyboardEvents();
  
  setInterval(this.loop.bind(this), 1000/FPS)
}

Game.prototype = {
  listenToKeyboardEvents: function() {
    window.addEventListener('keydown', this.keyboardHandler.bind(this), false);
  },
  keyboardHandler: function(event) {
    switch(event.keyCode) {
      case 32:
        this.spaceship.shoot();
        break;
      case 37:
        this.spaceship.x -= 15;
        break;
      case 38:
        this.spaceship.y -= 15;
        break;
      case 39:
        this.spaceship.x += 15;
        break;
      case 40:
        this.spaceship.y += 15;
        break;
    }
  },
  draw: function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.spaceship.move();
    
    this.spaceship.bullets.forEach(function(b) {
      b.draw();
    })
  },
  update: function() {
    this.spaceship.bullets.forEach(function(b) {
      b.update();
    })

    this.spaceship.bullets = this.spaceship.bullets.filter(function(b) {
      return b.active;
    })
  },
  loop: function() {
    this.update();
    this.draw();
  }
}
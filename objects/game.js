function Game(options) {
  var canvas  = options.canvas,
      context = canvas.getContext('2d'),
      FPS     = 24;
  
  this.context = context;
    
  this.width = canvas.width;
  this.height = canvas.height;
  
  this.initializeGame();
  
  // Main game loop
  setInterval(this.loop.bind(this), 1000/FPS)
}

Game.prototype = {
  constructor: Game,
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
    
    this.aliens.forEach(function(a) {
      if (a.alive) {
        a.draw();
      }
    })
  },
  hit: function(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
  },
  update: function() {
    var _this = this;

    this.spaceship.bullets.forEach(function(b) {
      _this.aliens.forEach(function(a) {
        if (_this.hit(a, b)) {
          b.active = false;
          a.alive = false;
        }
      })
      b.update();
    })

    this.spaceship.bullets = this.spaceship.bullets.filter(function(b) {
      return b.active;
    })

    this.aliens = this.aliens.filter(function(a) {
      return a.alive;
    })
  },
  deployAliensAtStart: function() {
    this.aliens = [];

    var startingX = 30,
        startingY = 30,
        alienCols = 7,
        alienRows = 3;

    for (var x=1; x <= alienCols; x++) {
      for (var y=1; y <= alienRows; y++) {
        this.aliens.push(
          new Alien({
            context: this.context,
            x: startingX + 68*(x-1),
            y: startingY + 64*(y-1)
          })
        )
      }
    }
  },
  deploySpaceshipAtStart: function() {
    this.spaceship = new Spaceship({
      x: this.width/2 - Spaceship.prototype.width/2, 
      y: this.height - Spaceship.prototype.height - 15, 
      context: this.context,
      bullets: [],
    });
  },
  initializeGame: function() {
    this.listenToKeyboardEvents();
    this.deployAliensAtStart();
    this.deploySpaceshipAtStart();
  },
  loop: function() {
    this.update();
    this.draw();
  }
}
// Preload spaceship image
var spaceship_up = new Image;
spaceship_up.src = 'spaceship.png';

function Spaceship(options) {
  this.x = options.x;
  this.y = options.y;
  this.context = options.context;
  this.bullets = options.bullets;
  this.fushion_shot = new Audio('fusion-shot.mp3');
}

Spaceship.prototype = {
  constructor: Spaceship,
  width: 64,
  height: 64,
  image: spaceship_up,
  move: function() {
    this.context.drawImage(this.image, this.x, this.y)
  },
  shoot: function() {
    this.bullets.push(
      new Bullet({
        context : this.context,
          speed : 5,
              x : this.x + this.width/2,
              y : this.y
      })
    )
    this.fushion_shot.pause();
    this.fushion_shot.play();
  }
}
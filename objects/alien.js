// Preload spaceship image
var alien_image = new Image;
alien_image.src = 'images/alien_green.png';

function Alien(options) {
  this.alive = true;
  this.x = options.x;
  this.y = options.y;
  this.context = options.context;
}

Alien.prototype = {
  constructor: Alien,
  image: alien_image,
  width: 40,
  height: 30,
  draw: function() {
    this.context.drawImage(this.image, this.x, this.y);
  }
}
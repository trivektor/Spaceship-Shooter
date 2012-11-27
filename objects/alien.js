// Preload alien images
var alien_image = new Image;
alien_image.src = 'images/alien_green.png';
var alient_image_alt = new Image;
alient_image_alt.src = 'images/alien_green_alt.png';

function Alien(options) {
  this.alive = true;
  this.x = options.x;
  this.y = options.y;
  this.context = options.context;
  this.image_state = 'normal'
}

Alien.prototype = {
  constructor: Alien,
  image: alien_image,
  image_alt: alient_image_alt,
  width: 40,
  height: 30,
  draw: function() {
    this.flap();
    this.context.drawImage(this.image, this.x, this.y);
  },
  flap: function() {
    if (this.image_state === 'normal') {
      this.image = alient_image_alt;
      this.image_state = 'flap';
    } else {
      this.image = alien_image;
      this.image_state = 'normal'
    }
  }
}
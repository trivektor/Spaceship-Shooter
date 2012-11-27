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
  this.state = 'normal'
}

Alien.prototype = {
  constructor: Alien,
  image: alien_image,
  image_alt: alient_image_alt,
  width: 40,
  height: 30,
  killed_sound: new Audio('sounds/invaderkilled.wav'),
  draw: function() {
    this.flap();
    this.context.drawImage(this.image, this.x, this.y);
  },
  flap: function() {
    if (this.state === 'normal') {
      this.image = alient_image_alt;
      this.state = 'flap';
    } else {
      this.image = alien_image;
      this.state = 'normal'
    }
  },
  die: function() {
    this.killed_sound.play();
    this.alive = false;
  }
}
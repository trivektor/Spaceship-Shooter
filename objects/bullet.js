function Bullet(options) {
  this.active = true;
  
  this.xVelocity = 0;
  this.yVelocity = -1*(options.speed);
  this.context = options.context;
  this.x = options.x;
  this.y = options.y;
  this.max_x = this.context.canvas.width;
  this.max_y = this.context.canvas.height;
}

Bullet.prototype = {
  constructor: Bullet,
  width: 6,
  height: 6,
  color: 'yellow',
  inBounds: function() {
    return this.x >= 0 && this.x <= this.max_x && this.y >= 0 && this.y <= this.max_y;
  },
  draw: function() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, (this.width)/2, 0, 2*Math.PI, false);
    this.context.fill();
  },
  update: function() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    
    this.active = this.active && this.inBounds();    
  }
}
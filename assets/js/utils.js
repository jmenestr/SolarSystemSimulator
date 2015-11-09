(function(root){
  if (typeof root.SolarSystem == 'undefined') {
    root.SolarSystem = {};
  }

  var SolarSystem = root.SolarSystem;

  var Vector = SolarSystem.Vector = function(x,y) {
    this.x = x;
    this.y = y;
  };

  Vector.prototype.add = function(otherVector) {
    return new Vector(this.x + otherVector.x, this.y + otherVector.y );
  };

  Vector.prototype.subtract = function(otherVector) {
    return new Vector(this.x - otherVector.y, this.y - otherVector.y);
  };

  Vector.prototype.scale = function(factor) {
    return new Vector(factor * this.x, factor * this.y);
  };

  Vector.prototype.unitVector = function(otherVector) {
    var otherVector = otherVector || new Vector(0,0);
    var magnitude = Math.sqrt(
      Math.pow((this.x - otherVector.x),2) + 
      Math.pow((this.y - otherVector.y),2));
    return otherVector.subtract(this).scale(1/magnitude);
  };

  Vector.prototype.distance = function(otherVector) {
    return Math.sqrt(
      Math.pow((this.x- otherVector.x),2) + 
      Math.pow((this.y - otherVector.y),2));
  };

  var Quad = SolarSystem.Quad = function(corner, side) {
    // corner is stored as a vector
    this.top_left_corner = corner;
    this.side_length = side;
  };

  Quad.prototype.isInside = function(position) {
    return (position.x > this.top_left_corner.x && 
      position.x < this.top_left_corner.x + this.side_length &&
      position.y > this.top_left_corner.y && 
      position.y < this.top_left_corner.y + this.side_length);

  };

  Quad.prototype.NE = function() {
    var new_length = this.side_length / 2;
    return new Quad(this.top_left_corner, new_length)
  };

  Quad.prototype.NW = function() {
    var new_length = this.side_length / 2;
    var new_x = this.top_left_corner.x + new_length;
    var new_y = this.top_left_corner.y;
    var new_corner = new Vector(new_x, new_y);
    return new Quad(new_corner, new_length);
  };

  Quad.prototype.SE = function() {
    var new_length = this.side_length / 2;
    var new_x = this.top_left_corner.x + new_length;
    var new_y = this.top_left_corner.y + new_length;
    var new_corner = new Vector(new_x, new_y);
    return new Quad(new_corner, new_length);
  };

    Quad.prototype.SW = function() {
    var new_length = this.side_length / 2;
    var new_x = this.top_left_corner.x;
    var new_y = this.top_left_corner.y + new_length;
    var new_corner = new Vector(new_x, new_y);
    return new Quad(new_corner, new_length);
  };
  
})(this)
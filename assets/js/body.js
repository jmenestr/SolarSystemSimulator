(function(root){
  if (typeof root.SolarSystem == 'undefined') {
    root.SolarSystem = {};
  }
  var SolarSystem = root.SolarSystem;
  var GRAVITY = 1000;
  var Body = SolarSystem.Body = function(mass, pos, vel, force) {
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
    this.force = force || new SolarSystem.Vector(0,0);
  };

  Body.prototype.mass = function(){
    return this.mass;
  };

  Body.prototype.vel = function() {
    return this.vel;
  };

  Body.prototype.pos = function() {
    return this.pos;
  };

  Body.prototype.updateCOM = function(otherBody) {
    var oldMass = this.mass;
    var totalMass = oldMass + otherBody.mass;
    var new_x = 
    (oldMass * this.pos.x +
      otherBody.mass * otherBody.pos.x) / totalMass;
    var new_y = 
    (oldMass * this.pos.y +
      otherBody.mass * otherBody.pos.y) / totalMass;
    var newPos = new SolarSystem.Vector(new_x, new_y);
    return new Body(totalMass, newPos);
  };

  Body.prototype.isColliding = function(otherBody) {
  var distance = this.pos.distance(otherBody.pos);
    if (distance < 30) {
      return true;
    }
      return false;
  };

  Body.prototype.addForce = function(otherBody) {
    var distance = Math.pow(this.pos.distance(otherBody.pos), 2);
    var forceDirection = otherBody.pos.unitVector(this.pos);
    var forceVector = forceDirection.scale(
      -this.mass * otherBody.mass * GRAVITY / distance);
    this.force = this.force.add(forceVector)
  };

  Body.prototype.resetForce = function() {
    this.force = new SolarSystem.Vector(0, 0);
  };

})(this)
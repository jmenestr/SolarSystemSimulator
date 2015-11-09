(function(root){
  if (typeof root.SolarSystem == 'undefined') {
    root.SolarSystem = {};
  }

  var SolarSystem = root.SolarSystem;

  var Game = SolarSystem.Game = function() {
    this.sun; // New sun;
    this.planets = [];
    this.comets = [];
    this.tree = null;
    this.addPlanets();

  };

  Game.prototype.generateTree = function() {
    var quad = new SolarSystem.Quad(new SolarSystem.Vector(0, 0), 1000);
    this.tree = new SolarSystem.BHT(quad);
    this.planets.forEach(function(planet){
      this.tree.insert(planet);
    }.bind(this));
  };

  Game.prototype.animatePlanets = function(timeStep) {
    this.generateTree();
    this.planets.forEach(function(planet){
      this.tree.updateForce(planet);
      planet.vel.x += planet.force.x / planet.mass * (timeStep);
      planet.vel.y += planet.force.y / planet.mass * (timeStep);
      planet.pos.x += planet.vel.x * timeStep;
      planet.pos.y += planet.vel.y * timeStep;
      console.log(planet.pos.x)
      planet.resetForce();

    }.bind(this))
  };

  Game.prototype.animateComets = function(timeStep) {

  };

  Game.prototype.addPlanets = function() {
      var zero = new SolarSystem.Vector(0,0);
      var middle = new SolarSystem.Vector(500,500)
      var right = new SolarSystem.Vector(700, 500);
      var up = new SolarSystem.Vector(0,-700);
      this.planets.push(new SolarSystem.Body(10000, middle, zero))    ;
      this.planets.push(new SolarSystem.Body(10, right, up));
  };

  Game.prototype.animate = function(timeStep) {
    var MAXSTEP = 0.05;
    while (timeStep > 0) { 
      var step = Math.min(timeStep, MAXSTEP);
      this.animatePlanets(step);
      timeStep -= MAXSTEP;
    }
  };

  Game.prototype.checkCollision = function(bdy1, bdy1) {

  };


})(this)
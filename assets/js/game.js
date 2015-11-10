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
    this.comets.forEach(function(comet){
      this.tree.insert(comet);
    }.bind(this))
  };

  Game.prototype.animatePlanets = function(timeStep) {
    this.generateTree();
    this.updatePositions(timeStep);
    this.checkCollisions();
  };

  Game.prototype.animateComets = function(timeStep) {

  };

  Game.prototype.addPlanets = function() {
      var zero = new SolarSystem.Vector(0,0);
      var middle = new SolarSystem.Vector(500,505)
      var right = new SolarSystem.Vector(700, 500);
      var up = new SolarSystem.Vector(0,-120);
      this.planets.push(new SolarSystem.Body(10000, middle, zero))    ;
      this.planets.push(new SolarSystem.Body(10, right, up));
  };

  Game.prototype.addComet = function() {
    var start = new SolarSystem.Vector(1000, Math.random() * 1000);
    var randomY = [-100]
    var vel = new SolarSystem.Vector(-100*Math.random(), )
  }

  Game.prototype.updatePositions = function(timeStep) {
      this.planets.forEach(function(planet){
      this.tree.updateForce(planet);
      planet.vel.x += planet.force.x / planet.mass * (timeStep);
      planet.vel.y += planet.force.y / planet.mass * (timeStep);
      planet.pos.x += planet.vel.x * timeStep;
      planet.pos.y += planet.vel.y * timeStep;
      planet.resetForce();
    }.bind(this))
      };

  Game.prototype.animate = function(timeStep) {
    var MAXSTEP = 0.05;
    while (timeStep > 0) { 
      var step = Math.min(timeStep, MAXSTEP);
      this.animatePlanets(step);
      timeStep -= MAXSTEP;
    }
  };

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.planets.length; i++) {
      for (var j = 0; j < this.planets.length; j++) {
        if (i != j && this.planets[i].isColliding(this.planets[j])) { 
          console.log("collides")
        }
      }
    }
  };


})(this)
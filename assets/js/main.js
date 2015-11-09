(function(root){
  if (typeof root.SolarSystem == 'undefined') {
    root.SolarSystem = {};
  }
  var SolarSystem = root.SolarSystem;
  var HEIGHT = 1000;
  var WIDTH = 1000;
  var SCALE = 1;

  var Display = SolarSystem.Display = function(game) {
    canvas = document.getElementById('solar-system');
    this.ctx = canvas.getContext('2d');
    canvas.height = HEIGHT;
    canvas.width = WIDTH;

    this.game = game;
    

  };

  Display.prototype.drawBackground = function() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0,0,HEIGHT,WIDTH);
  };

  Display.prototype.drawBody = function(body) {
    this.ctx.beginPath();
    this.ctx.arc(body.pos.x, body.pos.y, 15, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'yellow';
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = 'white';
    this.ctx.stroke();
    this.ctx.fill();    
  };

  Display.prototype.render = function(timeStep) {
    this.drawBackground();
    this.game.animate(timeStep);
    this.game.planets.forEach(function(planet){
      this.drawBody(planet);
    }.bind(this))
  };

  Display.prototype.start = function() {
    var lastTime = null;
    var self = this;
    function frame(time) {
      if (lastTime != null) {
        var timeStep =  Math.min(time - lastTime,100)/1000;
      }
      lastTime = time;
      self.render(timeStep);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

})(this)

game = new SolarSystem.Game();
display = new SolarSystem.Display(game);
display.start();
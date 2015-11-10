(function(root){
  if (typeof root.SolarSystem == 'undefined') {
    root.SolarSystem = {};
  }

  var SolarSystem = root.SolarSystem;

  var BHT = SolarSystem.BHT = function(quad) {
    // Init new BHT with full quadrant of all space 
    this.quad = quad;
    // Holds either the COM/Mass of a single body or 
    // COM/Mass of all nested bodies 
    this.isInternal = false;
    // Seperate quadrant nodes 
    this.neQuad = false;
    this.nwQuad = false;
    this.seQuad = false;
    this.swQuad = false;

    this.body = false;
  };

  BHT.prototype.insert = function(body) {
    var self = this;

    if (!this.body) {
      self.body = body;
      return;

    } else if(this.isInternal) {
      self.body = self.body.updateCOM(body);
      var nodes = [self.neQuad, self.nwQuad, self.seQuad, self.swQuad];
      for (var i = 0; i < nodes.length; i++) {
          var quad = nodes[i].quad;
          if (quad.isInside(body.pos)) {
            nodes[i].insert(body);
            break;
          }
        }
    } else {
      var bodies = [self.body, body];
      self.isInternal = true ;

      self.neQuad =  new SolarSystem.BHT(self.quad.NE());
      self.nwQuad  = new SolarSystem.BHT(self.quad.NW());
      self.seQuad  = new SolarSystem.BHT(self.quad.SE());
      self.swQuad  = new SolarSystem.BHT(self.quad.SW());

      var newNodes = [self.neQuad, self.nwQuad, self.seQuad, self.swQuad];
      for (var i = 0; i < bodies.length; i++) {
        for (var j = 0; j < newNodes.length; j++) {
          var quad = newNodes[j].quad;
          if (quad.isInside(bodies[i].pos)) {
            newNodes[j].insert(bodies[i]);
            break;
          }
        }
      }
      self.body = bodies[0].updateCOM(bodies[1])
     }
  };

  BHT.prototype.updateForce = function(body) {
    if (!this.body || this.body == body) 
      return;

    if (this.isExternal()) {
      body.addForce(this.body);
      return;

    } else {
      var thres = 
      this.quad.side_length / body.pos.distance(this.body.pos);
      if (thres < 0.5) {
        body.addForce(this.body);
        return;
      } else {
        var nodes = [this.neQuad, this.nwQuad, this.seQuad, this.swQuad];
        nodes.forEach(function(node){
          node.updateForce(body);
        });
      }
    }
  };

  BHT.prototype.isExternal = function() {
    return (!this.neQuad);
  };

})(this)

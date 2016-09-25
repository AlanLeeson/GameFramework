"use strict";

var app = app || {};

app.PlayerEntity = function(){

  var PlayerEntity = function(x,y,radius,col,mass,type){
    app.Entity.call(this,x,y,radius,col,mass,type);

    this.applyCollisions = false;
    this.health = 1000;
  };

  PlayerEntity.prototype = Object.create(app.Entity.prototype);
  PlayerEntity.prototype.construction = PlayerEntity;
  var p = PlayerEntity.prototype;

  p.moveLeft = function(force){
  	if(this.velocity[0] > 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
  	this.applyWorldForces(force);
  };

  p.moveRight = function(force){
  	if(this.velocity[0] < 0) {this.velocity = vec2.fromValues(0, this.velocity[1]);}
  	this.applyWorldForces(force);
  }

  p.stopRightLeft = function(){
  	this.velocity[0] = this.velocity[0] / 10;
  }

  p.jump = function(){
  	if(this.velocity[1] >= 0) {
		this.applyForce(vec2.fromValues(0, -10));
	}
  }

  p.render = function(ctx){
  	if(this.sprite != null){this.sprite.render(ctx, this.location); }
	app.draw.polygon(ctx,this.location[0],this.location[1],this.radius,4,this.col);
  }

  return PlayerEntity;
}();

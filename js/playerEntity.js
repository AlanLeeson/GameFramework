"use strict";

var app = app || {};

app.PlayerEntity = function(){

  var PlayerEntity = function(x,y,radius,col,mass,type){
    app.Entity.call(this,x,y,radius,col,mass,type);
    this.health = 1000;
    this.forms = {"THROW" : 0, "CATCH" : 1};
    this.form = this.forms.THROW;
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
		    this.applyWorldForces([vec2.fromValues(0, -20)]);
	  }
  }

  p.changeForm = function(form){
    this.form = this.forms[form] != null ? this.forms[form] : this.form;
    if(this.form == this.forms.THROW){
      this.col = "#f00";
      this.type = 'moveable';
    } else if(this.form == this.forms.CATCH){
      this.col = "#ff0";
      this.type = 'stationary';
      this.velocity = vec2.create();
      this.acceleration = vec2.create();
    }
  }

  p.render = function(ctx){
  	if(this.sprite != null){
  		this.sprite.render(ctx, this.location);
  	} else {
      app.draw.opaqueCircle(ctx,this.location[0],this.location[1],this.radius,this.col);
    }
  }

  return PlayerEntity;
}();

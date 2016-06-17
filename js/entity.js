"use strict";

var app = app || {};

app.Entity = function(){

	var Entity = function(x,y,col){
		this.type = "entity";
		this.col = col;
		this.radius = 20;
		this.location = vec2.fromValues(x,y);
		this.velocity = vec2.create();
		this.acceleration = vec2.create();
		this.gravity = vec2.fromValues(0,1);
		this.wind = vec2.fromValues(0.5,0);
		this.movementSpeed = 50;
	};
	
	var p = Entity.prototype;
	
	p.update = function(dt){
		
		var speed = this.movementSpeed * dt;
		
		if((this.location[0] + this.radius/2) >= 400){
			this.velocity[0] *= -speed;	
			this.location[0] = 400 - this.radius/2;
		}
		if((this.location[1] + this.radius/2) > 480){
			this.velocity[1] *= -speed;
			this.location[1] = 480 - this.radius/2;
		}
		applyForce(this.gravity,this.acceleration);
		applyForce(this.wind,this.acceleration);
		updateLocation(this.velocity,this.acceleration,this.location);
		this.acceleration = vec2.create();
		
	};
	
	p.render = function(ctx){
		app.draw.polygon(ctx,this.location[0],this.location[1],this.radius,8,this.col);
	};
	
	return Entity;

}();
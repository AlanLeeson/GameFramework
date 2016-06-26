"use strict";

var app = app || {};

app.Entity = function(){

	var Entity = function(x,y,radius,col,movement,world){
		this.type = "entity";
		this.col = col;
		this.radius = radius;
		this.location = vec2.fromValues(x,y);
		this.velocity = vec2.create();
		this.acceleration = vec2.create();
		this.movementSpeed = movement;

		this.world = world;
	};
	
	var p = Entity.prototype;
	
	p.update = function(dt){
		
		var speed = this.movementSpeed * dt;
		
		if((this.location[0] + this.radius) >= 400){
			this.velocity[0] *= -speed * (3/4);	
			this.location[0] = 400 - this.radius;
		}
		if((this.location[0] - this.radius) <= 0){
			this.velocity[0] *= -speed * (3/4);	
			this.location[0] = 0 + this.radius;
		}
		if((this.location[1] + this.radius) > 480){
			this.velocity[1] *= -speed * (3/4);
			this.location[1] = 480 - this.radius;
		}
		if((this.location[1] - this.radius) <= 0){
			this.velocity[1] *= -speed * (3/4);
			this.location[1] = 0 + this.radius;
		}
		applyForce(this.world.getGravity(),this.acceleration);
		applyForce(this.world.getWind(),this.acceleration);
		updateLocation(this.velocity,this.acceleration,this.location);
		this.acceleration = vec2.create();
		
	};
	
	p.render = function(ctx){
		app.draw.polygon(ctx,this.location[0],this.location[1],this.radius,8,this.col);
	};
	
	return Entity;

}();
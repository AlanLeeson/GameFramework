"use strict";

var app = app || {};

app.Entity = function(){

	var Entity = function(x,y,radius,col,mass,type){
		this.type = type;
		this.col = col;
		this.radius = radius;
		this.location = vec2.fromValues(x,y);
		this.velocity = vec2.create();
		this.acceleration = vec2.create();
		this.movementSpeed = mass;
		this.maxVelocity = vec2.fromValues(5,5);
		this.sprite = null;
		this.controller = null;

		this.previousLocaiton = null;

		this.remove = false;
		this.removeCondition = null;
		this.collisionResolution = null;

		this.listeners = [];
	};

	var p = Entity.prototype;

	p.updateEntityEvent = function(){
		for(var i = 0; i < this.listeners.length; i++){
			this.listeners[i].doUpdateEntityEvent(this);
		}
	}

	p.addUpdateListener = function(listener){
		this.listeners.push(listener);
	}

	p.setSprite = function(sprite){
		this.sprite = sprite;
	}

	p.setLocation = function(location){
		this.location = vec2.clone(location);
	}

	p.getLocation = function(){
		return this.location;
	}

	p.getRadius = function(){
		return this.radius;
	}

	p.setController = function(controller){
		this.controller = controller;
		this.controller.init();
	};

	p.setRemoveCondition = function(removeCondition){
		this.updateEntityEvent();

		this.removeCondition = removeCondition;
	};

	p.setCollisionResolution = function(collisionResolution){
		this.updateEntityEvent();

		this.collisionResolution = collisionResolution;
	};

	p.canRemove = function(){

		if(this.remove){
			return true;
		} else if (this.removeCondition !== null) {
			return this.removeCondition();
		} else
			return false;
	};

	p.triggerCollisionResolution = function(_entity){
		if(this.collisionResolution !== null) {
			this.collisionResolution(_entity);
		}
	};

	p.update = function(dt){
		if(this.controller !== null){
			this.controller.update(this);
		}
		if(this.sprite !== null){
			this.sprite.update(dt);
		}

		switch(this.type) {
			case 'moveable' :
				var speed = this.movementSpeed * dt;

				if((this.location[0] + this.radius) >= app.Main.bounds["width"]){
					this.velocity[0] *= -speed;
					this.location[0] = app.Main.bounds["width"] - this.radius;
				}
				if((this.location[0] - this.radius) <= 0){
					this.velocity[0] *= -speed;
					this.location[0] = 0 + this.radius;
				}
				if((this.location[1] + this.radius) > app.Main.bounds["height"]){
					this.velocity[1] *= -speed;
					this.location[1] = app.Main.bounds["height"] - this.radius;
				}
				if((this.location[1] - this.radius) <= 0){
					this.velocity[1] *= -speed;
					this.location[1] = 0 + this.radius;
				}

				updateLocation(this.velocity,this.acceleration,this.location);
				this.acceleration = vec2.create();

				break;
			case 'stationary' :
				this.velocity = vec2.create();
				this.acceleration = vec2.create();
				break;

		}

	};

	p.render = function(ctx){
		if(this.sprite != null){this.sprite.render(ctx, this.location); }
		app.draw.polygon(ctx,this.location[0],this.location[1],this.radius,8,this.col);
	};

	p.applyWorldForces = function(wolrdForces){
		for(var i = 0; i < wolrdForces.length; i ++){
			applyForce(wolrdForces[i], this.acceleration);
		}
	};

	p.applyForce = function(force){
		applyForce(force, this.acceleration);
	};

	return Entity;

}();

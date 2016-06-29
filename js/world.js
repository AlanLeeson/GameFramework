"use strict";

var app = app || {};

app.World = function(){

	var World = function(forces, gravity = vec2.fromValues(0,0), wind = vec2.fromValues(0,0)){
		this.type = "world";
		this.forces = forces;
		this.gravity = gravity;
		this.wind = wind;

        this.entities = [];
	};
	
	var p = World.prototype;

    p.getGravity = function(){
        return this.gravity;
    };

    p.getWind = function(){
        return this.wind;
    };
    
    p.getForces = function(){
    	return this.forces;
    };
    
    p.addForce = function(force){
    	this.forces.push(force);
    };

    p.addEntity = function(entity){
        this.entities.push(entity);
    };

    p.getEntity = function(i){
        return this.entities[i];
    };

    p.numEntities = function(){
        return this.entities.length;
    };
    
    p.update = function(dt){
    	for(var i = 0; i < this.entities.length; i++)
		{
			this.entities[i].update(dt);
			this.entities[i].applyWorldForces(this.forces);
		}
    };
    
    p.render = function(ctx){
    	for(var i = 0; i < this.entities.length; i++)
		{
			this.entities[i].render(ctx);
		}
    };

	return World;

}();
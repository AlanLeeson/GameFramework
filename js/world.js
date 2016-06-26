"use strict";

var app = app || {};

app.World = function(){

	var World = function(gravity = vec2.fromValues(0,0), wind = vec2.fromValues(0,0)){
		this.type = "world";
		this.gravity = gravity;
		this.wind = wind;

        this.entities = [];
	};
	
	var p = World.prototype;

    p.getGravity = function(){
        return this.gravity;
    }

    p.getWind = function(){
        return this.wind;
    }

    p.addEntity = function(entity){
        this.entities.push(entity);
    }

    p.getEntity = function(i){
        return this.entities[i];
    }

    p.numEntities = function(){
        return this.entities.length;
    }

	return World;

}();
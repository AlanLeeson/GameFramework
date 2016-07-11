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
			this.entities[i].applyWorldForces(this.forces);
			
			if(this.entities[i].type == "stationary"){
				for(var j = 0; j < this.entities.length; j++)
				{
					if(this.entities[j].type == "moveable" && 
						this.circleCollision(this.entities[j].location, this.entities[i].location,
						 this.entities[j].radius, this.entities[i].radius)){
						var inverse = vec2.multiplyByScalar(vec2.inverse(this.entities[j].velocity), 2);
						this.entities[j].applyWorldForces([inverse]);
					}
				}	
			}
			
			this.entities[i].update(dt);
		}
    };
    
    p.render = function(ctx){
    	for(var i = 0; i < this.entities.length; i++)
		{
			this.entities[i].render(ctx);
		}
    };
    
    p.circleCollision = function(loc1, loc2, radius1, radius2){
		var dx = loc1[0] - loc2[0];
		var dy = loc1[1] - loc2[1];
		var distance = Math.sqrt(dx*dx + dy*dy);
		return distance < radius1 + radius2;
	};
	
	p.lineCollision = function(entityLoc, entityRadius, linePoint1, linePoint2){
		var ptX = entityLoc[0];
		var ptY = entityLoc[1];
		//console.log(rope.anchor1.location[0]);
		var p1X = linePoint1[0];
		var p2X = linePoint1[0];
		var p1Y = linePoint2[1];
		var p2Y = linePoint2[1];
		
		var dx = p2X - p1X;
		var dy = p2Y - p1Y;
		
		//if it's a point rather than a segment
		if((dx == 0) && (dy == 0)){
			var closest = {x: p1X, y: p1Y};
			dx = ptX - p1X;
			dy = ptY - p1Y;
			return Math.sqrt(dx * dx + dy * dy);
		}
		
		//calculate the t that minimizes the distance
		var t = ((ptX - p1X) * dx + (ptY - p1Y) * dy) / (dx * dx + dy * dy);
		
		//see if this represents one of the segment's end points or a point in the middle.
		if(t < 0){
			var closest = {x: p1X, y: p1Y};
			dx = ptX - p1X;
			dy = ptY - p1Y;
		} else if(t > 1){
			var closest = {x: p2X, y: p2Y};
			dx = ptX - p2X;
			dy = ptY - p2Y;
		} else {
			var closest = {x: p1X + t * dx, y: p1Y + t * dy};
			dx = ptX - closest.x;
			dy = ptY - closest.y;
		}
		
		var leastDistance = Math.sqrt(dx * dx + dy * dy);
		
		return leastDistance < entityRadius;
	};

	return World;

}();
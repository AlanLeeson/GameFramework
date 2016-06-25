"use strict";

var app = app || {};

app.Main = {

	canvas : undefined,
	ctx : undefined,

	entities : [],
	
	//var used for finding dt
	updatedTime : 0,

	init : function(){
		
		//assign the canvas and the canvas context
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
		
		for(var i = 0; i < 50; i++)
		{
			this.entities.push(
				new app.Entity(
					this.canvas.width * Math.random(), this.canvas.height * Math.random(), 
					20,"rgba(255,0,0,0.5)", vec2.fromValues(0,2), vec2.fromValues(1,0), 40));
		}
		for(var i = 0; i < 50; i++)
		{
			this.entities.push(
				new app.Entity(
					this.canvas.width * Math.random(), this.canvas.height * Math.random(), 
					20,"rgba(0,255,0,0.5)", vec2.fromValues(0,-2), vec2.fromValues(-1,0), 40));
		}
		for(var i = 0; i < 50; i++)
		{
			this.entities.push(
				new app.Entity(
					this.canvas.width * Math.random(), this.canvas.height * Math.random(), 
					20,"rgba(0,0,255,0.5)", vec2.fromValues(0,2), vec2.fromValues(-1,0), 40));
		}
		for(var i = 0; i < 50; i++)
		{
			this.entities.push(
				new app.Entity(
					this.canvas.width * Math.random(), this.canvas.height * Math.random(), 
					20,"rgba(255,255,255,0.5)", vec2.fromValues(0,-2), vec2.fromValues(1,0), 40));
		}
		//call the game loop to start the game
		this.gameLoop();
	},
	
	//loops the game
	gameLoop : function(){
		//calls this method every frame
		requestAnimationFrame(this.gameLoop.bind(this));
    	this.update();
    	this.render(this.ctx);
	},
	
	//renders all objects in the game
	render : function(ctx){
		app.draw.rect(ctx,0,0,this.canvas.width,this.canvas.height,"#aaa");
		for(var i = 0; i < this.entities.length; i++)
		{
			this.entities[i].render(ctx);
		}
	},
	
	//updates the objects in the game
	update : function(){
		//find deltaTime
		var dt  = this.calculateDeltaTime();

		for(var i = 0; i < this.entities.length; i++)
		{
			this.entities[i].update(dt);
		}
	},
	
	calculateDeltaTime : function(){
		var now, fps;
		now = (+new Date);
		fps = 1000/(now - this.updatedTime);
		fps = this.clamp(fps,12,60);
		this.updatedTime = now;
		return 1/fps;
	},
	
	clamp : function(val,min,max){
		return Math.max(min,Math.min(max,val));
	},

};
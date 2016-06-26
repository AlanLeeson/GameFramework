"use strict";

var app = app || {};

app.Main = {

	canvas : undefined,
	ctx : undefined,

	world : undefined,
	
	//var used for finding dt
	updatedTime : 0,

	init : function(){
		
		//assign the canvas and the canvas context
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.world = new app.World(vec2.fromValues(1,0), vec2.fromValues(0,1));
		
		for(var i = 0; i < 50; i++)
		{
			this.world.addEntity(
				new app.Entity(
					this.canvas.width * Math.random(), this.canvas.height * Math.random(), 
					20,"rgba(255,0,0,0.5)", 10, this.world));
		}
		for(var i = 0; i < 50; i++)
		{
			this.world.addEntity(
				new app.Entity(
					this.canvas.width * Math.random(), this.canvas.height * Math.random(), 
					20,"rgba(0,255,0,0.5)", 20, this.world));
		}
		for(var i = 0; i < 50; i++)
		{
			this.world.addEntity(
				new app.Entity(
					this.canvas.width * Math.random(), this.canvas.height * Math.random(), 
					20,"rgba(0,0,255,0.5)", 30, this.world));
		}
		for(var i = 0; i < 50; i++)
		{
			this.world.addEntity(
				new app.Entity(
					this.canvas.width * Math.random(), this.canvas.height * Math.random(), 
					20,"rgba(255,255,255,0.5)", 40, this.world));
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
		for(var i = 0; i < this.world.numEntities(); i++)
		{
			this.world.getEntity(i).render(ctx);
		}
	},
	
	//updates the objects in the game
	update : function(){
		//find deltaTime
		var dt  = this.calculateDeltaTime();

		for(var i = 0; i < this.world.numEntities(); i++)
		{
			this.world.getEntity(i).update(dt);
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
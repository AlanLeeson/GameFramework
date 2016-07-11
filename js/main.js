"use strict";

var app = app || {};

app.Main = {

	canvas : undefined,
	ctx : undefined,

	loadedForces : undefined,
	world : undefined,
	bounds : undefined,
	
	//var used for finding dt
	updatedTime : 0,

	init : function(){
		
		//assign the canvas and the canvas context
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.loadedForces = [vec2.fromValues(1,0), vec2.fromValues(0,1)];
		this.bounds = {width : this.canvas.width, height: this.canvas.height};
		
		this.world = new app.World(this.loadedForces);
		for(var i = 0; i < 200; i++)
		{
			this.world.addEntity(
				new app.Entity(
					this.bounds.width * Math.random(), this.bounds.height * Math.random(), 
					Math.random() * 10 + 15,app.draw.randomRGBA(200,0,0.5), Math.random() * 40, "moveable"));
		}
		this.world.addEntity(new app.Entity(200, 200, 20, 'rgba(255,0,0,1)', 0, "stationary"));
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
		this.world.render(ctx);
	},
	
	//updates the objects in the game
	update : function(){
		//find deltaTime
		var dt  = this.calculateDeltaTime();

		this.world.update(dt);
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
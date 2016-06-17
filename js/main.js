"use strict";

var app = app || {};

app.Main = {

	canvas : undefined,
	ctx : undefined,
	
	//var used for finding dt
	updatedTime : 0,
	
	entity : undefined,

	init : function(){
		
		//assign the canvas and the canvas context
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
		
		this.entity = new app.Entity(this.canvas.width/2,this.canvas.height/2,"rgba(255,20,50,0.5)");
		
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
		this.entity.render(ctx);
	},
	
	//updates the objects in the game
	update : function(){
		//find deltaTime
		var dt  = this.calculateDeltaTime();

		this.entity.update(dt);
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
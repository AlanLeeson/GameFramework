"use strict";

var app = app || {};

app.Main = {

	canvas : undefined,
	ctx : undefined,

	loadedForces : undefined,
	world : undefined,
	sprite: undefined,
	bounds : undefined,
	gameObject : undefined,

	//var used for finding dt
	updatedTime : 0,

	init : function(){

		//assign the canvas and the canvas context
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.loadedForces = [vec2.fromValues(0.15,0), vec2.fromValues(0,1)];
		this.bounds = {width : this.canvas.width, height: this.canvas.height};
		
		this.gameObject = new app.GameObject();

		this.world = new app.World(this.loadedForces);

		var bounds = this.bounds;
		this.world.setUpdateFunction(function(){
			while(this.numEntities() < 100){
				var entity =	new app.Entity(
					bounds.width * Math.random(), 0,
					Math.random() * 10 + 5,app.draw.randomRGBA(200,0,0.5), Math.random() * 20, "moveable");

				entity.setRemoveCondition(function(){
					return this.getLocation()[1] + this.getRadius() >= bounds["height"];
				});

				this.addEntity(entity);
			}
		});

		this.sprite = new app.Sprite('spriteExample.png', [0, 0], [15.875, 16], 10, [0, 1, 2, 3, 4, 5, 6, 7]);

		var entity = new app.Entity(50, 50, 20, 'rgba(255,0,0,1)', 0, "stationary");
		this.world.addEntity(entity);

		var entity = new app.Entity(150, 50, 20, 'rgba(0,255,0,1)', 0, "stationary");
		this.world.addEntity(entity);

		var entity = new app.Entity(350, 50, 20, 'rgba(0,0,255,1)', 0, "stationary");
		this.world.addEntity(entity);

		var entity = new app.Entity(250, 50, 20, 'rgba(255,255,0,1)', 0, "stationary");
		this.world.addEntity(entity);

		var entityPlayer = new app.PlayerEntity(this.bounds["width"] / 2, this.bounds["height"] / 2, 20, 'rgba(255,0,0,1)', 0, "moveable");
		entityPlayer.setController(new app.KeyboardController());
		this.world.addEntity(entityPlayer);

		entityPlayer.setRemoveCondition(function(){
			return false;
		});
		
		this.gameObject.setWorld(this.world);

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
		this.gameObject.render(ctx);
		this.sprite.render(ctx);
	},

	//updates the objects in the game
	update : function(){
		//find deltaTime
		var dt  = this.calculateDeltaTime();

		this.gameObject.update(dt);
		this.sprite.update(dt);
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

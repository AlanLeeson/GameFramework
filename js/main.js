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
	menu : undefined,

	//var used for finding dt
	updatedTime : 0,
	ratio : undefined,

	init : function(){

		//assign the canvas and the canvas context
		this.ratio = 400/400;
		this.canvas = document.querySelector('canvas');
		this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = (window.innerHeight * this.ratio) + 'px';
		this.ctx = this.canvas.getContext('2d');

		this.loadedForces = [vec2.fromValues(0,1)];
		this.bounds = {width : this.canvas.width, height: this.canvas.height};

		this.gameObject = new app.GameObject();
		this.gameObject.setCurrentState(this.gameObject.states.PLAY);

		var keyboardController = new app.KeyboardController();
		keyboardController.assignKeyAction(["r"], function(gameObject)
		{
			if(gameObject.getCurrentState() === gameObject.states.PLAY)
			{
				gameObject.setCurrentState("PAUSE");
			}
			else if(gameObject.getCurrentState() === gameObject.states.PAUSE)
			{
				gameObject.setCurrentState("PLAY");
			}
		}, true);
		this.gameObject.setController(keyboardController);

		this.world = new app.World(this.loadedForces);

		var bounds = this.bounds;
		this.world.setUpdateFunction(function(){
			while(this.numEntities() < 50){
				var entity =	new app.Entity(
					bounds.width * Math.random(), 0,
					Math.random() * 10 + 5,app.draw.randomRGBA(200,0,0.5), Math.random() * 20, "moveable");

				entity.setRemoveCondition(function(){
					return this.getLocation()[1] + this.getRadius() >= bounds["height"];
				});
				entity.setSprite(new app.Sprite('spriteExample.png', [0, 0], [15.875, 16], 10, [0, 1, 2, 3, 4, 5, 6, 7]));

				this.addEntity(entity);
			}
		});
		
		/*** Initialize menu ***/
		this.menu = new app.Menu();
		this.menu.addBackgroundSprite(new app.Sprite('menuBackground.jpg', [0, 0], [this.bounds.width, this.bounds.height], 0));
		this.menu.addTitle("MENU TITLE");
		this.gameObject.setMenu(this.menu);

		/*** Initialize entities ***/		
		var entity = new app.Entity(this.bounds["width"]/6, 50, 40, 'rgba(255,0,0,1)', 0, "stationary");
		this.world.addEntity(entity);

		var entity = new app.Entity(this.bounds["width"]*3/8, 50, 40, 'rgba(0,255,0,1)', 0, "stationary");
		this.world.addEntity(entity);

		var entity = new app.Entity(this.bounds["width"]*5/8, 50, 40, 'rgba(0,0,255,1)', 0, "stationary");
		this.world.addEntity(entity);

		var entity = new app.Entity(this.bounds["width"]*5/6, 50, 40, 'rgba(255,255,0,1)', 0, "stationary");
		this.world.addEntity(entity);

		var entityPlayer = new app.PlayerEntity(this.bounds["width"] / 2, this.bounds["height"] / 2, 20, 'rgba(255,0,0,1)', 0, "moveable");

		var keyboardController = new app.KeyboardController();
		keyboardController.assignKeyAction([ "a", "ArrowLeft" ], function(entity)
		{
			entity.moveLeft([vec2.fromValues(-1.5, 0)]);
		});
		keyboardController.assignKeyAction([ "d", "ArrowRight" ], function(entity)
		{
			entity.moveRight([vec2.fromValues(1.5, 0)]);
		});
		keyboardController.assignKeyUpAction([ "a", "ArrowLeft", "d", "ArrowRight" ], function(entity)
		{
			entity.stopRightLeft();	
		});
		keyboardController.assignKeyAction([ "w", "ArrowUp" ], function(entity)
		{
			if(entity.velocity[1] >= 0) {
				entity.applyWorldForces([vec2.fromValues(0, -20)]);
			}
		}, true);

		entityPlayer.setController(keyboardController);
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
		app.draw.rect(ctx,0,0,this.canvas.width,this.canvas.height,"#eee");
		this.gameObject.render(ctx);
	},

	//updates the objects in the game
	update : function(){
		//find deltaTime
		var dt  = this.calculateDeltaTime();

		this.gameObject.update(dt);
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
	}

};

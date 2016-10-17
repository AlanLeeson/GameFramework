"use strict";

var app = app || {};

app.Main = {

	canvas : undefined,
	ctx : undefined,

	loadedForces : undefined,
	world : undefined,
	bounds : undefined,
	gameObject : undefined,
	menu : undefined,

	//var used for finding dt
	updatedTime : 0,
	ratio : undefined,

	init : function(){

		/*** Assign the canvas and the canvas context ***/
		this.ratio = 1/1;
		this.canvas = document.querySelector('canvas');
		this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = (window.innerHeight * this.ratio) + 'px';
		this.ctx = this.canvas.getContext('2d');

		/*** Set up the game object which holds game logic and states. ***/
		this.bounds = {width : this.canvas.width, height: this.canvas.height};
		this.gameObject = new app.GameObject();
		this.gameObject.setCurrentState(this.gameObject.states.PLAY);

		/*** Set up a generic keyboard controller to handle customizable inputs ***/
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
		keyboardController.assignKeyAction(["m"], function(gameObject)
		{
			if(gameObject.getCurrentState() === gameObject.states.PLAY)
			{
				gameObject.setCurrentState("MENU");
			}
			else if(gameObject.getCurrentState() === gameObject.states.MENU)
			{
				gameObject.setCurrentState("PLAY");
			}
		}, true);
		this.gameObject.setController(keyboardController);

		/*** Initialize menu ***/
		this.menu = new app.Menu("main", vec2.fromValues(this.bounds.width / 2, this.bounds.height / 2));
		this.menu.setBackgroundSprite(new app.Sprite('assets/MenuBackground.png', [0, 0], [1440, 785], [this.bounds.width, this.bounds.height], 0, [0]));
		this.menu.addText({
			"text" : "Press \"m\" to Play",
			"xPos" : (this.bounds.width * 3 / 10),
			"yPos" : (this.bounds.height * 5 / 6),
			"size" : "50",
			"col" : app.draw.randomRGBA(100)
		});
		this.gameObject.setMenu(this.menu);

		/*** Initialize world and its conditions ***/
		this.loadedForces = [vec2.fromValues(0,0.4)];
		this.world = new app.World(this.loadedForces);
		[0, 0], [100, 100], [50, 50], 1, [0]
		this.world.setBackgroundSprite(new app.Sprite('assets/Background.png', [0, 0], [1240, 785], [this.bounds.width, this.bounds.height], 0, [0]));
		this.world.setWorldBounds(this.bounds);

		// Create and add a boss
		var bossEntity = new app.Entity(this.bounds.width/2, 100, 100, "", 2, "moveable");
		bossEntity.setSprite(new app.Sprite('assets/BossSprite.png', [0, 0], [101, 101], [200, 200], 0, [0]));
		bossEntity.affectedByWorld = false;
		this.world.addEntity(bossEntity);

		var bounds = this.bounds;
		this.world.setUpdateFunction(function(){
			while(this.numEntities() < 5){
				var entity =	new app.Entity(
					bounds['width'] * Math.random(), 0,
					20, app.draw.randomRGBA(200,0,0.5), 20, "moveable");

				entity.setRemoveCondition(function(){
					return this.getLocation()[1] + this.getRadius() >= bounds["height"];
				});

				entity.setCollisionResolution(function(_entity){
					if(_entity instanceof app.PlayerEntity)
					{
						return;
					}

 					if(this.velocity[0] == 0 && this.velocity[1] == 0 &&
 						_entity.velocity[0] == 0 && _entity.velocity[1] == 0)
 					{
 						this.remove = true;
 					}
 				});
				entity.setSprite(new app.Sprite('assets/projectile.png', [0, 0], [100, 100], [50, 50], 0, [0]));

				this.addEntity(entity);
			}
			bossEntity.applyForce(arrive(bossEntity.location, vec2.create(), bossEntity.velocity, 0.2, 0.5));
		});

		var entityPlayer = new app.PlayerEntity(this.bounds["width"] / 2, this.bounds["height"] / 2, 50, 'rgba(255,0,0,1)', 0, "moveable");

		/*** Create a keyboard controller to handle player actions ***/
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
			entity.jump();
		}, true);
		keyboardController.assignKeyAction([ " " ], function(entity)
		{
			entity.form == entity.forms.THROW ? entity.changeForm("CATCH") : entity.changeForm("THROW");
		}, true)
		entityPlayer.setController(keyboardController);
		entityPlayer.setRemoveCondition(function(){return false;});
		entityPlayer.setSprite(new app.Sprite('assets/player.png', [0, 0], [100, 100], [100, 100], 1, [0]))

		/*** Finish setting the world and game object ***/
		this.world.addEntity(entityPlayer);
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

	//calculate delta time to maintain a frame rate
	calculateDeltaTime : function(){
		var now, fps;
		now = (+new Date);
		fps = 1000/(now - this.updatedTime);
		fps = this.clamp(fps,12,60);
		this.updatedTime = now;
		return 1/fps;
	},

	//helper function to stop values from exceeding bounds
	clamp : function(val,min,max){
		return Math.max(min,Math.min(max,val));
	}

};

"use strict";

var app = app || {};

app.Menu = function(){

	var Menu = function(type){
		this.type = type;
		this.controller = null;

		this.listeners = [];
		this.buttons = [];
		this.title = "Your New Game";
		this.backgroundSprite;
	};

	var p = Menu.prototype;

	p.updateMenuEvent = function(){
		for(var i = 0; i < this.listeners.length; i++){
			this.listeners[i].doUpdateMenuEvent(this);
		}
	}

	p.addButton = function(button){
		this.buttons.add(button);
	};

	p.addTitle = function(title){
		this.title = title;
	};

	p.addBackgroundSprite = function(sprite){
		this.backgroundSprite = sprite;
	};

	p.setController = function(controller){
		this.controller = controller;
		this.controller.init();
	};

	p.update = function(dt){

	};

	p.render = function(ctx){
		if (this.backgroundSprite != undefined) {
			this.backgroundSprite.render(ctx, app.Main.bounds);
		}
		app.draw.text(ctx,this.title,100,50,30,'rgba(50,50,50,1)');
	};

	return Menu;

}();

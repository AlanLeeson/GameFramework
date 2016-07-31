"use strict"

var app = app || {};

app.GameObject = function () {

	var GameObject = function() {
		this.world = new app.World({});
		this.states = {"PLAY" : 0, "PAUSE" : 1, "MENU" : 2};
		this.changeState = 2;
		this.menu = new app.Menu();
	};
	
	var p = GameObject.prototype;
	
	p.getCurrentState = function() {
		return this.currentState;
	};
	
	p.setCurrentState = function(state) {
		this.currentState = this.states[state] != null ? this.states[state] : this.currentState;
	};
	
	p.setWorld = function(world) {
		this.world = world;
	};
	
	p.setMenu = function(menu) {
		this.menu = menu;
	};
	
	p.update = function(dt) {
		if(this.states.PLAY === this.world.currentState){
			this.world.update(dt);
			this.world.doUpdateFunction();
		}
		if(this.states.PAUSE === this.world.currentState){
			
		}
		if(this.changeState % 200 == 0) {
			this.world.currentState = this.world.currentState == 2 ? 0 : this.world.currentState + 1;
		}
		this.changeState += 1;
	};
	
	p.render = function(ctx) {
		if(this.states.PLAY === this.world.currentState){
			this.world.render(ctx);
		}
		else if(this.states.PAUSE === this.world.currentState){
			this.world.render(ctx);
			app.draw.text(ctx,"Currently Paused",100,100,20,'rgba(50,50,200,1)');
		}
		else if(this.states.MENU === this.world.currentState){
			this.menu.render(ctx);
		}
	};


	return GameObject;

}();
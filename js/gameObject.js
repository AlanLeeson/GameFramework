"use strict"

var app = app || {};

app.GameObject = function () {

	var GameObject = function() {
		this.currentState = 0;
		this.world = new app.World({});
		this.states = {"PLAY" : 0, "MENU" : 1, "PAUSE" : 2};
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
	
	p.update = function(dt) {
		if(this.states.PLAY === this.currentState){
			this.world.update(dt);
			this.world.doUpdateFunction();
		}
	};
	
	p.render = function(ctx) {
		if(this.states.PLAY === this.currentState){
			this.world.render(ctx);
		}
	};


	return GameObject;

}();
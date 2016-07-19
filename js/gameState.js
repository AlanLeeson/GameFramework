"use strict"

var app = app {};

app.GameState = function () {

	var GameState = function(states) {
		this.currentState = 0;
		this.states = [];
		for(var i = 0; i < states.length; i ++){
			this.states.push(states[i]);
		}
	};
	
	var p = GameState.prototype;
	
	p.getCurrentState = function() {
		return this.currentState;
	};


	return GameState;

}();
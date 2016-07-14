"use strict";

var app = app || {};

window.onload = function(){

	resources.load([
    'spriteExample.png'
	]);
	resources.onReady(app.Main.init());

};
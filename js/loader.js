"use strict";

var app = app || {};

window.onload = function(){

	resources.load([
    'spriteExample.png',
    'menuBackground.jpg'
	]);
	resources.onReady(app.Main.init());

};
"use strict";

var app = app || {};

app.KeyboardController = function(){

	var KeyboardController = function(){
        this.KEYBOARD = {
			"KEY_LEFT_A": 65,
            "KEY_LEFT_ARROW": 37,
			"KEY_UP_W": 87,
            "KEY_UP_ARROW": 38,
			"KEY_RIGHT_D": 68,
            "KEY_RIGHT_ARROW": 39,
			"KEY_DOWN_S": 83,
            "KEY_DOWN_ARROW": 40,
			"KEY_SPACE": 32,
			"KEY_R": 82
		};

        this.keydown = [];
    };

    var p = KeyboardController.prototype;

    p.init = function(){
        var _this = this;

        window.addEventListener("keydown", function(e){
            _this.keydown[e.keyCode] = true;
        });

        window.addEventListener("keyup", function(e){
            _this.keydown[e.keyCode] = false;
        });
    }

    p.update = function(entity){
        if(this.keydown[this.KEYBOARD.KEY_LEFT_A] ||
            this.keydown[this.KEYBOARD.KEY_LEFT_ARROW]){
            entity.applyWorldForces([vec2.fromValues(-2,0)]);
		}
		if(this.keydown[this.KEYBOARD.KEY_RIGHT_D] ||
            this.keydown[this.KEYBOARD.KEY_RIGHT_ARROW]){
            entity.applyWorldForces([vec2.fromValues(2,0)]);
		}
		if(this.keydown[this.KEYBOARD.KEY_UP_W] ||
            this.keydown[this.KEYBOARD.KEY_UP_ARROW]){
            entity.applyWorldForces([vec2.fromValues(0,-20)]);
            this.keydown[this.KEYBOARD.KEY_UP_W] = this.keydown[this.KEYBOARD.KEY_UP_ARROW] = false;
		}
		if(this.keydown[this.KEYBOARD.KEY_DOWN_S] ||
            this.keydown[this.KEYBOARD.KEY_DOWN_S]){
            entity.applyWorldForces([vec2.fromValues(0,2)]);
		}
    }

    return KeyboardController;

}();

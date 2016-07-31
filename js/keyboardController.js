"use strict";

var app = app || {};

app.KeyboardController = function(){

	var KeyboardController = function(){
        this.keyActions = [];
				this.singlePress = [];
				this.keydown = [];
    };

    var p = KeyboardController.prototype;

    p.init = function(){
        var _this = this;

        window.addEventListener("keydown", function(e){
            _this.keydown[e.key] = true;
        });

        window.addEventListener("keyup", function(e){
            _this.keydown[e.key] = false;
        });

    };

	p.assignKeyAction = function (keys, action, singlePress = false)
	{
		for(var i = 0; i < keys.length; i++)
		{
			this.keyActions[keys[i]] = action;
			this.singlePress[keys[i]] = singlePress;
		}
	};

    p.update = function(object){
		for(var key in this.keyActions)
		{
			if(this.keydown[key])
			{
				this.keyActions[key](object);

				if(this.singlePress[key])
			this.keydown[key] = false;
			}
		}
    };

    return KeyboardController;

}();

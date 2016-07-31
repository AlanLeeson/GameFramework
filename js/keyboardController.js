"use strict";

var app = app || {};

app.KeyboardController = function(){

	var KeyboardController = function(){
        this.keyActions = [];
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

		p.assignKeyAction = function (keys, action)
		{
			for(var i = 0; i < keys.length; i++)
			{
				this.keyActions[keys[i]] = action;
			}
		};

    p.update = function(entity){
			for(var key in this.keyActions)
			{
				if(this.keydown[key])
				{
					this.keyActions[key](entity);
				}
			}
    };

    return KeyboardController;

}();

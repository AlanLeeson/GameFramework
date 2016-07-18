"use strict";

var app = app || {};

app.PlayerEntity = function(){

  var PlayerEntity = function(x,y,radius,col,mass,type){
    app.Entity.call(this,x,y,radius,col,mass,type);
  };

  PlayerEntity.prototype = Object.create(app.Entity.prototype);
  PlayerEntity.prototype.construction = PlayerEntity;
  var p = PlayerEntity.prototype;

  return PlayerEntity;
}();

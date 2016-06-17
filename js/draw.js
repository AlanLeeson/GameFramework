"use strict"

var app = app || {};

app.draw = {
	
	clear: function(ctx,x,y,w,h){
		ctx.clearRect(x,y,w,h);
	},
	
	rect: function(ctx,x,y,w,h,col){
		ctx.fillStyle = col;
		ctx.fillRect(x,y,w,h);
	},
	
	circle: function(ctx,x,y,r,col){
		ctx.fillStyle = col;
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	},
	
	text: function(ctx,string,x,y,size,col){
		ctx.font = 'bold ' + size + 'px georgia';
		ctx.fillStyle = col;
		ctx.fillText(string,x,y);
	},
	
	line: function(ctx,x1,y1,x2,y2,w,col){
		ctx.strokeStyle = col;
		ctx.lineWidth = w;
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.closePath();
		ctx.stroke();
	},
	
	polygon : function(ctx,x,y,r,s,col){
		ctx.strokeStyle = col;
		ctx.fillStyle = col;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+r*Math.cos(0),y+r*Math.sin(0));
		for(var i = 1; i < s; i++){
			ctx.lineTo(x + r * Math.cos(i * 2 * Math.PI / s), 
				y + r * Math.sin(i * 2 * Math.PI / s));
		}
		ctx.lineTo(x+r*Math.cos(0),y+r*Math.sin(0));
		ctx.stroke();
		ctx.globalAlpha = 0.5;
		ctx.fill();
		ctx.globalAlpha = 1.0;
	}
};
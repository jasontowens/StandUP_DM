/// <reference path="GameLoop.ts" />

var c =  <HTMLCanvasElement>document.getElementById('canvas');
c.width = window.innerWidth;
c.height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;
var ctx = c.getContext('2d');
ctx.font = "50px AG Book Rounded";




window.onload = function(){
	var game = new Game.GameLoop(c,ctx,w,h);
	game.runGame();
};
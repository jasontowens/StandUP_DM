/// <reference path="GameLoop.ts" />
module Game{
	export class MenuController{
		
		gameloop;
		canvas;
		width;
		height;
		model;

		constructor(gameloop,canvas,width,height){
			this.gameloop = gameloop;
			this.canvas = canvas;
		}
		takeInput(){
			this.mobileClick = <any>this.mobileClick.bind(this);
			this.canvas.addEventListener('touchstart', this.mobileClick);   
		}
		mobileClick(e){
			var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
 			var mobileClickX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
 			mobileClickX = mobileClickX - (window.innerWidth-this.gameloop.width)/2;
 			var mobileClickY = parseInt(touchobj.clientY);
 			mobileClickY = mobileClickY - 25;	
 			this.click(mobileClickX,mobileClickY);
		}
		
		click(X,Y){
			if(Y>(210/667*h) && Y<(505/667*h)){	
				if(X<275/320*w){
					if(Y<285/560*h && Y>200/667*h){	
						this.switchToGameState();		
					}
					else if(Y<350/560*h){
						this.switchToCategoriesState();	
					}
					else if(Y<435/560*h){
						this.gameloop.switchGameModes();
					}
					else if(Y<505/560*h){
						//how to play
					}
				}
			}
		 }
		 
		 
		switchStates(){
			this.canvas.removeEventListener('touchstart', this.mobileClick); 
				console.log("switching states");
		}
	
		switchToGameState(){
			this.switchStates();
			this.gameloop.switchToGameState();
		}
		switchToCategoriesState(){
			this.switchStates();
			this.gameloop.switchToCategoriesState();
		}
		
	
	}
}
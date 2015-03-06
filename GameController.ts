/// <reference path="GameLoop.ts" />
/// <reference path="Model.ts" />
/// <reference path="GameOne.ts" />
/// <reference path="GameTwo.ts" />

module Game{
	export class GameController{
		
		gameloop;
		canvas;
		width;
		height;
		model;
		
		constructor(gameloop,canvas,width,height,model){
			this.gameloop = gameloop;
			this.canvas = canvas;
			this.width = width;
			this.height = height;
			this.model = model;
		}
		takeInput(){
			 if(this.model instanceof GameOne){
			 	this.gameOneTakeInput();
			 }
			 if(this.model instanceof GameTwo){
			 	this.gameTwoTakeInput();
			 }
		}
		
		gameOneTakeInput(){
			var self = this;
			this.model.beginGame();
			this.mobileClick = <any>this.mobileClick.bind(this);
			this.canvas.addEventListener("touchstart",this.mobileClick); 
			 window.ondeviceorientation = function(event) {
				  var gamma = Math.round(event.gamma);
				  if (gamma > 125){
					self.model.setRecentPassOrFail(true);//they got the answer right
					var seconds = new Date().getTime() / 1000;
					self.model.heldSideways = true;
				  }else if(gamma< 55){
					self.model.setRecentPassOrFail(false);//they got the answer wrong
					var seconds = new Date().getTime() / 1000;
					self.model.heldSideways = true;
				  }else{
				  	if(!self.model.gameStarted){
				  		self.model.countdown();
				  		self.model.startGame(5);
				  	}
				  	self.model.heldSideways = false;
				  }
				}
		}
		
		mobileClick(e){
		if(this.model.gameOver){
			var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
 			var mobileClickX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
 			mobileClickX = mobileClickX - (window.innerWidth-this.gameloop.width)/2;
 			var mobileClickY = parseInt(touchobj.clientY);
 			mobileClickY = mobileClickY - 25;	
 			this.click(mobileClickX,mobileClickY);
 		}
		}
		
		click(X,Y){
			if(Y>h/3){
				console.log("badddd");
				this.switchToMenuState()
			}
		}
		
		gameTwoTakeInput(){
		
		}
	
		
		switchToMenuState(){
			this.switchStates();
			this.gameloop.switchToMenuState();
		}
		switchStates(){
			this.canvas.removeEventListener("click",this.mobileClick); 
			this.clearVariables();
		}
		clearVariables(){
			this.model.gameOver = false;
			this.model.gameStarted = false;
		}
	
	}
}
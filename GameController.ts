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
				  		self.model.startGame(30);
				  	}
				  	self.model.heldSideways = false;
				  }
				}
		}
		
		gameTwoTakeInput(){
		
		}
		
	
		mobileClick(e){
			console.log("hi");
		}
		
		switchController(newController){
			this.gameloop.switchController(newController);
			this.gameloop.switchView(newController);
		
		}
	
	}
}
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
		gamma;
		gameShallStart;
		
		constructor(gameloop,canvas,width,height,model){
			this.gameloop = gameloop;
			this.canvas = canvas;
			this.width = width;
			this.height = height;
			this.model = model;
			this.gameShallStart = false;
			this.gamma = 0;
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
			 this.startGameOne();
		}
		
		startGameOne(){
			this.model.beginGame();
			var self = this;
			this.mobileClick = <any>this.mobileClick.bind(this);
			this.canvas.addEventListener("click",this.mobileClick); 
			var mostRecentState = 100;
			var mostRecentTimeItWasBeingHeldSideways;
			window.ondeviceorientation = function(event) {
				  self.gamma = Math.round(event.gamma);
				  if(self.gamma>125 || self.gamma < 55){
				  	mostRecentTimeItWasBeingHeldSideways  = new Date().getTime();
				  }
				  if (self.gamma > 125 && mostRecentState <= 125){
					self.model.setRecentPassOrFail(true);//they got the answer right
					self.model.heldSideways = true;
					
				  }else if(self.gamma< 55 && mostRecentState >= 55){
					self.model.setRecentPassOrFail(false);//they got the answer wrong
					self.model.heldSideways = true;
					
				  }else if (self.gamma >= 55 && self.gamma <= 125){
				  	self.gameShallStart = true;
				  	while((new Date().getTime()) - mostRecentTimeItWasBeingHeldSideways < 1000){
				  		//doNothing
				  	}
				  	self.model.heldSideways = false;
				  }
				mostRecentState  = self.gamma;
			}
			this.startDaGame();
		}
		startDaGame(){
			var self = this;
			var t;
			if(!this.model.gameStarted && this.gameShallStart){
				console.log(this.model.gameCount);
				this.model.countdown();
				this.startAnothaGame();
			}
			else{
				var f = function(){self.startDaGame();};
				t = setTimeout(f,100);
			}
		}
		startAnothaGame(){
			if(this.model.canChange){
				this.model.newItem = false;
				this.model.startGame(5);
			}else{
				var self = this;
				var f = function(){self.startAnothaGame();};
				var t = setTimeout(f,100);
			}
		
		}
		
		gameCanStart():boolean{
			return this.model.gameCanStart;
		}
		
		mobileClick(e){
			if(this.model.gameOver){
				var mobileClickY = event.y;
 				mobileClickY -= this.canvas.offsetTop;
				var mobileClickX = event.x;
				mobileClickX -= this.canvas.offsetLeft;
				this.click(mobileClickX,mobileClickY);
			}
		}
		
		click(X,Y){
		var menuButton = (550/667)*this.height;
			if(Y>menuButton){
				console.log("badddd");
				this.switchToMenuState()
			}
		}
		
		gameTwoTakeInput(){
			this.startGameTwo();
		}
		
		startGameTwo(){	
			this.mobileClickTwo = <any>this.mobileClickTwo.bind(this);
			this.canvas.addEventListener("click",this.mobileClickTwo);
			this.model.beginGame(this.height); 
		}
		mobileClickTwo(event){
			var mobileClickY = event.y;
 			mobileClickY -= this.canvas.offsetTop;
			var mobileClickX = event.x;
		 	mobileClickX -= this.canvas.offsetLeft;
		 	if(this.model.inBetweenRounds){
		 		this.clickNextRoundOption(mobileClickX,mobileClickY);
		 	}else if(this.model.playingGame){
				this.clickTwo(mobileClickX,mobileClickY);
			}else if(this.model.gameOver){
				this.clickMenuOption(mobileClickX,mobileClickY);
			}else{
				this.clickSelectTotalRounds(mobileClickX,mobileClickY);
			}
		
		}
		
		clickNextRoundOption(X,Y){
			var menuButton = (550/667)*this.height;
			if(Y>menuButton){
				if(X< this.width/2){
					this.model.gameOver = true;
					this.switchToMenuState();
				}else{
					this.model.startGame();
				}
			}
		}
		clickMenuOption(X,Y){
			var menuButton = (550/667)*this.height;
			if(Y>menuButton){
				this.switchToMenuState()
			}
		}
		clickSelectTotalRounds(X,Y){
			var leftArrowStartingX	= (260/375) * this.width;
			var leftArrowStartingY =  (250/667) * this.height;
			var leftArrowEndingY = (340/667)* this.height;
			if(X > leftArrowStartingX && X  < this.width ){
				if(Y > leftArrowStartingY && Y < leftArrowEndingY){
					this.model.clickRightArrow();
					this.model.slideLeft(this.width);
				}
			}else if(X > 0 && X  < (150/375)*this.width ){
				if(Y > leftArrowStartingY && Y < leftArrowEndingY){
					this.model.clickLeftArrow();
					this.model.slideRight(this.width);
				}
			}else{
				if(Y > 550/667 * this.height){
					this.model.setTotalRounds();
					this.model.selectedRoundNumber();
					this.model.startGame();
				}
			}
		}
		
		clickTwo(X,Y){
			var buttonStartingX = 290/375 * this.width;
			var buttonEndingX = 360/375 * this.width;
			var CorrectStartingY = 10/667 * this.height;
			var CorrectEndingY = 330/667 * this.height;
			var PassStartingY = 370/667 * this.height;
			var PassEndingY = 650/667 * this.height;
			if(X > buttonStartingX && X  < buttonEndingX ){
				if(Y > CorrectStartingY && Y < CorrectEndingY){
					this.model.changeActiveTeam();
				}else if(Y > PassStartingY && Y < PassEndingY){
					this.model.changeItem();
				}
			}
		
		}
		
		switchToMenuState(){
			this.switchStates();
			this.gameloop.switchToMenuState();
		}
		switchStates(){
			this.model.clearVariables();
			if(this.model instanceof GameOne){
				this.canvas.removeEventListener("click",this.mobileClick); 
			}
			else{
				this.canvas.removeEventListener("click",this.mobileClickTwo); 
			}
		}
	
	}
}
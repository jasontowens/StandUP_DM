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
		gameLength;
		
		//printing
		startX;
		startY;
		endX;
		endY;
		startingHeight;
		fingerLifted;
		oldY;
		
		constructor(gameloop,canvas,width,height,model){
			this.gameloop = gameloop;
			this.canvas = canvas;
			this.width = width;
			this.height = height;
			this.model = model;
			this.gameShallStart = false;
			this.gamma = 0;
			this.gameLength=5;
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
		
		endGameInput(){
			this.fingerLifted = false;
			this.startingHeight = 0;
			this.startingHeight = 0;
			this.oldY = 0;
		
			this.ScrollingEnd = <any>this.ScrollingEnd.bind(this);
			this.endScrollingEnd = <any>this.endScrollingEnd.bind(this);
			this.startClickEnd = <any>this.startClickEnd.bind(this);
			//this.canvas.addEventListener("touchstart",this.startClickEnd);
			this.canvas.addEventListener("touchmove",this.ScrollingEnd);
			this.canvas.addEventListener("touchend",this.endScrollingEnd);
		}
		
		startClickEnd(event){
			event.preventDefault();
			var canvas_x = event.targetTouches[0].pageX;
			var canvas_y = event.targetTouches[0].pageY;
			this.startX = canvas_x;
			this.startY = canvas_y;
			this.endY = canvas_y;
			this.endX = canvas_x;
		}
		ScrollingEnd(event){
			event.preventDefault();
			var screenHeight = this.height - (this.height/4);
			//var buttonHeight = screenHeight/7;
			var maxHeight = 23 * this.model.playedWords.length;
			var canvas_x = event.targetTouches[0].pageX;
			var canvas_y = event.targetTouches[0].pageY;
			console.log(this.startingHeight + "sh");
			if(this.fingerLifted){
				this.startX = canvas_x;
				this.startY = canvas_y;
			}
			if(!this.fingerLifted){
				var difference = this.oldY - canvas_y;
				var newStartingHeight = this.startingHeight+difference;
				
				if(newStartingHeight < 0){
					this.startingHeight = 0;
				}
				else{
					this.startingHeight = newStartingHeight;
				}
				//this.categoriesView.renderCategories(Math.round(this.startingHeight),this.model.chosenCategories);
				
			}
			
			this.oldY = canvas_y;
			this.endY = canvas_y;
			this.endX = canvas_x;
			this.model.setEndGameStartingHeight(this.startingHeight);
			this.fingerLifted = false;
			
		}
		endScrollingEnd(event){
			this.fingerLifted = true;
			console.log(this.startX + " " + this.endX);
			if(Math.abs(this.startX - this.endX)< 5){
				if(Math.abs(this.startY - this.endY) < 5){
					//this.updateGame(this.endY)
				}
			}
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
			this.waitForGameOver();
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
				this.model.startGame(this.gameLength);
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
			
				var mobileClickY = event.y;
 				mobileClickY -= this.canvas.offsetTop;
				var mobileClickX = event.x;
				mobileClickX -= this.canvas.offsetLeft;
				if(this.model.gameOver){
					//this.endGameInput();
					this.gameOverClickOne(mobileClickX,mobileClickY);
				}else if(this.model.gameStarted){
					this.BackToMenuClick(mobileClickX,mobileClickY);
				}
		}
		
		
		
		gameOverClickOne(X,Y){
			var menuButton = (550/667)*this.height;
			if(Y>menuButton){
				this.switchToMenuState()
			}
		}
		BackToMenuClick(X,Y){
			var menuButtonY = (530/667)*this.height;
			var menuButtonX = (70/375)*this.width;
			if(Y>menuButtonY && X<menuButtonX){
				this.model.endGame();
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
				this.model.startGame();
				
			}
			if(X < 150*this.width/375 && Y < 100*this.height/667){
				this.switchToMenuState();
			}
		}
		waitForGameOver(){
			if(this.model.gameOver){
				this.endGameInput();
			}
			else{
				var t;
				var self = this;
				var f = function(){self.waitForGameOver();};
				t = setTimeout(f,50);
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
			if(X < 150*this.width/375 && Y < 100*this.height/667){
				this.model.stopBouncingAnimations();
				this.switchToMenuState();
			}
			if(X > leftArrowStartingX && X  < this.width ){
				if(Y > leftArrowStartingY && Y < leftArrowEndingY){
					this.model.clickRightArrow(this.width,this.height);
				}
			}else if(X > 0 && X  < (150/375)*this.width ){
				if(Y > leftArrowStartingY && Y < leftArrowEndingY){
					this.model.clickLeftArrow(this.width,this.height);
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
			this.BackToMenuClick(X,Y);
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
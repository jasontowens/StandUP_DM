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
			if(this.gameCanStart()){
				console.log("start");
			 	this.startGameOne();
			}else{
				console.log("nostart");
				this.model.notEnoughCategories();
			}
		}
		
		startGameOne(){
			this.model.beginGame();
			var self = this;
			this.mobileClick = <any>this.mobileClick.bind(this);
			this.canvas.addEventListener("click",this.mobileClick); 
			var mostRecentState = 100;
			var mostRecentTimeItWasBeingHeldSideways ;
			 window.ondeviceorientation = function(event) {
				  var gamma = Math.round(event.gamma);
				  if(gamma>125 || gamma < 55){
				  	mostRecentTimeItWasBeingHeldSideways  = new Date().getTime();
				  }
				  if (gamma > 125 && mostRecentState <= 125){
					self.model.setRecentPassOrFail(true);//they got the answer right
					self.model.heldSideways = true;
					
				  }else if(gamma< 55 && mostRecentState >= 55){
					self.model.setRecentPassOrFail(false);//they got the answer wrong
					self.model.heldSideways = true;
				  }else if (gamma >= 55 && gamma <= 125){
				  	if(!self.model.gameStarted){
						self.model.countdown();
						self.model.startGame(5);
				  	}
				  	while((new Date().getTime()) - mostRecentTimeItWasBeingHeldSideways < 2000){
				  		//doNothing
				  	}
				  	self.model.heldSideways = false;
				  }
				mostRecentState  = gamma;
				}
		}
		gameCanStart():boolean{
			for(var i = 0; i != this.model.chosenCategories.length; ++i){
				if(this.model.chosenCategories[i] == true){
					console.log(i);
					return true;
				}
			}
			return false;
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
			if(this.gameCanStart()){
			 	this.startGameTwo();
			}else{
				console.log("nostart");
				this.model.notEnoughCategories();
			}
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
			var leftArrowStartingX	= 260/375 * this.width;
			var leftArrowStartingY =  250/667 * this.height;
			var leftArrowEndingY = 290/667* this.height;
			if(X > leftArrowStartingX && X  < this.width ){
				if(Y > leftArrowStartingY && Y < leftArrowEndingY){
					this.model.slideLeft(this.width);
			}else
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
			if(this.model instanceof GameOne){
				this.canvas.removeEventListener("click",this.mobileClick); 
				this.clearVariablesOne();
			}
			else{
				this.canvas.removeEventListener("click",this.mobileClickTwo); 
				this.clearVariablesTwo();
			}
		}
		clearVariablesOne(){
			this.model.gameOver = false;
			this.model.gameStarted = false;
			this.model.newItem = false;
			
			while(this.model.playedWords.length > 0) {
   				 this.model.playedWords.pop();
   				 this.model.correctPlayedWords.pop();
			}
		}
		clearVariablesTwo(){
			this.model.gameOver = false;
			this.model.playingGame = false;
			this.model.newItem = false;
			this.model.activeTeam = 1;
			this.model.currentRound = 0;
			this.model.teamOneTime = 30;
			this.model.teamTwoTime = 30;
			this.model.teamOneScore = 0;
			this.model.teamTwoScore = 0;
			this.model.totalRoundsOptionNumber = 0;
		
		}
	
	}
}
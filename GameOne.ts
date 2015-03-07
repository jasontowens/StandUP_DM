/// <reference path="GameView.ts" />
module Game{
	export class GameOne extends Model{
	
		recentPassOrFail:boolean;
		heldSideways:boolean;
		gameView;
		gameCount;
		canChange;
		
		clearVariables(){
			super.clearVariables();
			this.heldSideways = false;
			this.gameCount = 0;
			this.canChange = false;
		}
		constructor(){
			super();
			this.gameStarted = false;
			this.changeWord();
			this.gameCount = 0;
		}
		setGameView(gv){
			this.gameView = gv
		}
		setRecentPassOrFail(p:boolean){
			this.recentPassOrFail = p;
			this.newItem = true;
		}
		beginGame(){
			this.gameView.renderForehead();
		}
		countdown(){
			if(this.gameCount == 0){
				this.gameView.renderCountdown(3);
			}
			++this.gameCount;
		}
		 notEnoughCategories(){
		 	this.gameView.renderNotEnoughCategories
		 }
		startGame(timeOfRound:number){
			this.gameStarted = true;
			var self = this;
			var f = function(){self.startGame(timeOfRound)};
			var timeout = setTimeout(f, 100);
			this.gameView.renderCurrentWordOne(this.currentItem,timeOfRound);
			if(timeOfRound <= 0){
				clearTimeout(timeout);
				this.gameOver = true;
				this.gameView.renderGameOver(this.playedWords.length,this.playedWords,this.correctPlayedWords);
			}
			if(this.newItem){
				this.playedWords.push(this.currentItem);
				this.correctPlayedWords.push(this.recentPassOrFail);
				console.log("len" + this.playedWords.length);
				console.log("cuur" + this.currentItem);
				this.changeWord();
				this.newItem = false;
				
			}
			if(this.heldSideways){
				if(this.recentPassOrFail){
					this.gameView.renderCorrect();
				}else{
					this.gameView.renderPass();
				}
			}else{
				timeOfRound = timeOfRound - 0.1;
			}	
			
		}
	}
}
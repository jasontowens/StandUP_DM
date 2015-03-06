/// <reference path="GameView.ts" />
module Game{
	export class GameOne extends Model{
	
		recentPassOrFail:boolean;
		heldSideways:boolean;
		newItem:boolean;
		gameStarted:boolean;
		gameView;
		
	
		
		
		
		
		
		constructor(){
			super();
			this.currentItemNumber = 0;
			this.gameStarted = false;
			this.changeWord();
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
			this.gameView.renderCountdown();
		}
		startGame(timeOfRound:number){
			this.gameStarted = true;
			this.gameView.renderCurrentWordOne(this.currentItem,timeOfRound);
			var self = this;
			var f = function(){self.startGame(timeOfRound)};
			var timeout = setTimeout(f, 100);
			if(timeOfRound <= 0){
				clearTimeout(timeout);
				this.gameOver = true;
				this.gameView.renderGameOver(this.playedWords.length,this.playedWords,this.correctPlayedWords);
			}
			if(this.newItem){
				this.playedWords.push(this.currentItem);
				this.correctPlayedWords.push(this.recentPassOrFail);
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
			
//TODO figure out how to hold scores.			
		}
	}
}
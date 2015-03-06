/// <reference path="GameView.ts" />
module Game{
	export class GameOne extends Model{
	
		recentPassOrFail:boolean;
		timeLastAnswerGiven:number;
		heldSideways:boolean;
		newItem:boolean;
		gameStarted:boolean;
		gameView;

		
		
		
		
		constructor(){
			super();
			this.timeLastAnswerGiven = 0;
			this.currentItemNumber = 0;
			this.currentItem = this.Items[this.currentItemNumber];
			this.gameStarted = false;
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
			}
			if(this.newItem){
				this.currentItemNumber = ++this.currentItemNumber%this.size;
				this.currentItem = this.Items[this.currentItemNumber];
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
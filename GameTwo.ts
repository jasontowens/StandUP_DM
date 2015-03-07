/// <reference path="GameView.ts" />
module Game{
	export class GameTwo extends Model{
	
		gameView;
		teamOneScore;
		teamTwoScore;
		teamOneTime;
		teamTwoTime;
		teamOneTotalTime;
		teamTwoTotalTime;
		activeTeam;
		inBetweenRounds;
		currentRound;
		totalRounds;
		playingGame;
		totalRoundsOption:number[];
		totalRoundsOptionNumber;
		
		
		
	
		constructor(){
			super();
			this.gameStarted = false;
			this.changeWord();
			this.activeTeam = 1;
			this.teamOneTime = 2;
			this.teamTwoTime = 2;
			this.teamOneScore = 0;
			this.teamTwoScore = 0;
			this.currentRound = 0;
		
			this.totalRoundsOption = [1,3,7,9,11];
			this.totalRoundsOptionNumber = 0;
			this.totalRounds = this.totalRoundsOption[this.totalRoundsOptionNumber];
		}
		setGameView(gv){
			this.gameView = gv
		}
		changeActiveTeam(){
			if(this.activeTeam == 1){
				this.activeTeam = 2;
			}else{
				this.activeTeam = 1;
			}
			this.newItem = true;
		}
		changeItem(){
			this.newItem = true;
		}
		setTotalRounds(){
			this.totalRounds = this.totalRoundsOption[this.totalRoundsOptionNumber%5];
		}
		beginGame(height){
			this.gameView.renderRoundNumber(height/2,this.totalRounds,true);
		}
		slideLeft(width){
			this.gameView.slideLeft(this.totalRoundsOption[(this.totalRoundsOptionNumber)%5],this.totalRoundsOption[(++this.totalRoundsOptionNumber)%5],width/2,width+70);
		}
		slideRight(width){
			if(this.totalRoundsOptionNumber-1 >= 0){
				this.gameView.slideRight(this.totalRoundsOption[(this.totalRoundsOptionNumber)%5],this.totalRoundsOption[(--this.totalRoundsOptionNumber)%5],width/2,-70);
			}
		}
		selectedRoundNumber(){
			this.gameView.renderSelectedRoundNumber();
		}
		countdown(){
			this.gameView.renderCountdown();
		}
		
		notEnoughCategories(){
		 	this.gameView.renderNotEnoughCategories
		}
		
		startGame(){
			this.inBetweenRounds = false;
			this.playingGame = true;
			this.gameStarted = true;
			this.teamOneTime = 2;
			this.teamTwoTime = 2;
			this.teamOneTotalTime = 0;
			this.teamTwoTotalTime = 0;
			this.currentRound++;
			this.startGame1();
		}
		startGame1(){
			var act
			if(this.activeTeam == 1){
				act = this.teamOneTime;
			}else{	
				act = this.teamTwoTime;
			}
			this.gameView.renderCurrentWordTwo(this.currentItem,act,this.activeTeam);
			var self = this;
			var f = function(){self.startGame1()};
			var timeout = setTimeout(f, 100);
			if(this.teamOneTime < 0 || this.teamTwoTime < 0){
				if(this.currentRound == this.totalRounds){
					if(this.teamOneTotalTime>this.teamTwoTotalTime){
						++this.teamTwoScore;
					}else{
						++this.teamOneScore;
					}
					this.playingGame = false;
					this.gameOver = true;
					this.gameView.renderGameOverTwo(this.teamOneScore,this.teamTwoScore);
				}
				else{
					if(this.teamOneTotalTime>this.teamTwoTotalTime){
						++this.teamTwoScore;
					}else{
						++this.teamOneScore;
					}
					this.playedWords.push(this.currentItem);
					this.changeWord();
					this.playingGame = false;
					this.inBetweenRounds = true;
					this.gameView.renderInBetweenRounds(this.teamOneScore,this.teamTwoScore,this.currentRound,this.totalRounds);
				}
				clearTimeout(timeout);
				
			}
			if(this.newItem){
				this.playedWords.push(this.currentItem);
				this.changeWord();
				this.newItem = false;
				
			}
			if(this.activeTeam == 1){
				this.teamOneTotalTime += .1;
				this.teamOneTime -= .1;
			}else{	
				this.teamTwoTotalTime += .1;
				this.teamTwoTime -= .1;
			}		
		}
	}
}
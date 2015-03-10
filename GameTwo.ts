/// <reference path="GameView.ts" />
module Game{
	export class GameTwo extends Model{
	
		gameView;
		teamOneScore;
		teamTwoScore;
		teamOneTimeLeft;
		teamTwoTimeLeft;
		teamOneTotalTime;
		teamTwoTotalTime;
		activeTeam;
		inBetweenRounds;
		currentRound;
		totalRounds;
		playingGame;
		totalRoundsOption:number[];
		totalRoundsOptionNumber;
		gameLoop;
		
		
		clearVariables(){
			super.clearVariables();
			this.playingGame = false;
			this.activeTeam = 1;
			this.currentRound = 0;
			this.inBetweenRounds = false;
			this.teamOneTimeLeft = 30;
			this.teamTwoTimeLeft = 30;
			this.teamOneTotalTime = 0;
			this.teamTwoTotalTime = 0;
			this.teamOneScore = 0;
			this.teamTwoScore = 0;
			this.totalRoundsOptionNumber = 0;
			this.teamOneTotalTime = 0;
			this.teamTwoTotalTime = 0;
			this.totalRounds = this.totalRoundsOption[this.totalRoundsOptionNumber];
		}
		
		
	
		constructor(){
			super();
			this.gameStarted = false;
			this.changeWord();
			this.activeTeam = 1;
			this.teamOneTimeLeft = 30;
			this.teamTwoTimeLeft = 30;
			this.teamOneScore = 0;
			this.teamTwoScore = 0;
			this.currentRound = 0;
			this.inBetweenRounds = false;
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
		clickLeftArrow(w,h){
			this.slideRight(w,h)
			
		}
		clickRightArrow(w,h){
			this.slideLeft(w,h)
		}
		setTotalRounds(){
			this.totalRounds = this.totalRoundsOption[this.totalRoundsOptionNumber%5];
		}
		beginGame(height){
			this.gameView.renderRoundNumber(height/1.7,(height/1.7)-(20*height/667) ,(height/1.7)+(25*height/667),this.totalRounds,true);
		}
		slideLeft(width,height){
			if(this.totalRoundsOptionNumber+1 <=4 ){
				this.gameView.slideLeft(this.totalRoundsOption[(this.totalRoundsOptionNumber)%5],this.totalRoundsOption[(++this.totalRoundsOptionNumber)%5],width/2,width+70,(height/1.5)-40 ,(height/1.5)+50);
			}
		}
		slideRight(width,height){
			if(this.totalRoundsOptionNumber-1 >= 0){
				this.gameView.slideRight(this.totalRoundsOption[(this.totalRoundsOptionNumber)%5],this.totalRoundsOption[(--this.totalRoundsOptionNumber)%5],width/2,-70,(height/1.5)-40 ,(height/1.5)+50);
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
		stopBouncingAnimations(){
			if(this.gameView.bouncingAnimation){
				clearTimeout(this.gameView.bouncingAnimation);
			}
			if(this.gameView.slideRightAnimation){	
				clearTimeout(this.gameView.bouncingAnimation);
			}
			if(this.gameView.slideLeftAnimation){
				clearTimeout(this.gameView.bouncingAnimation);
			}
		
		}
		startGame(){
			this.inBetweenRounds = false;
			this.playingGame = true;
			this.gameStarted = true;
			this.teamOneTimeLeft = 2;
			this.teamTwoTimeLeft = 2;
			this.teamOneTotalTime = 0;
			this.teamTwoTotalTime = 0;
			this.currentRound++;
			this.startGameForEachRound();
		}
		startGameForEachRound(){
			var act
			if(this.activeTeam == 1){
				act = this.teamOneTotalTime;
			}else{	
				act = this.teamTwoTotalTime;
			}
			this.gameView.renderCurrentWordTwo(this.currentItem,act,this.activeTeam);
			var self = this;
			var f = function(){self.startGameForEachRound()};
			this.gameLoop = setTimeout(f, 100);
			if(this.teamOneTimeLeft < 0 || this.teamTwoTimeLeft < 0){
				this.gameView.canDrawBalloons = true;
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
				clearTimeout(this.gameLoop);	
			}
			if(this.newItem){
				this.playedWords.push(this.currentItem);
				this.changeWord();
				this.newItem = false;
				
			}
			if(this.activeTeam == 1){
				this.teamOneTotalTime += .1;
				this.teamOneTimeLeft -= .1;
			}else{	
				this.teamTwoTotalTime += .1;
				this.teamTwoTimeLeft -= .1;
			}		
		}
		
		endGame(){
				if(this.gameLoop){
					clearTimeout(this.gameLoop);
				}
		}	
	}
}
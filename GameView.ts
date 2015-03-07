/// <reference path="Model.ts" />
/// <reference path="GameOne.ts" />
/// <reference path="GameTwo.ts" />
module Game{
	export class GameView{
	
		game_background = new Image();
		game_background2 = new Image();
		forehead = new Image();
		pass = new Image();
		roundPicking = new Image();
		correct = new Image();
		endGame_background = new Image();
		context;
		width;
		height;
		model;
		bouncingAnimation;
		slideRightAnimation;
		slideLeftAnimation;
		bouncingHeight;
	
		constructor(context,width,height,model){
			this.game_background.src = "InGame.png";
			this.game_background2.src = "InGame2.png";
			this.roundPicking.src = "RoundPickingBackground.png";
			this.forehead.src = "forehead.png";
			this.pass.src = "pass.png";
			this.correct.src = "correct.png";
			this.endGame_background.src = "endGame.png";
			this.context = context;
			this.width = width;
			this.height = height;
			this.model = model;
		}
		renderForehead(){
			var self = this;
			this.forehead.onload = function(){
					self.context.drawImage(self.forehead, 0, 0, self.width, self.height);
			}
		}
		renderCountdown(timeLeft){
			this.clearCanvas();
			this.context.drawImage(this.game_background, 0,0,this.width,this.height);
			this.drawNumber(timeLeft);
			var self = this;
			var timeout;
			if(timeLeft < 0){
				clearTimeout(timeout);
				this.model.canChange = true;
			}else{
				var f = function(){self.renderCountdown(timeLeft-1)};
				timeout = setTimeout(f, 1000);
			}
		}
		drawNumber(timeLeft){
			this.rotateContext();
			this.context.font = "bold 80px AG Book Rounded";
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			this.context.fillStyle = 'white';
			this.context.fillText(timeLeft, this.width/2, this.height/2);
			this.context.restore();
		}
		renderPass(){
			this.context.drawImage(this.pass, 0, 0, this.width, this.height);
		}
		
		renderCorrect(){
			this.context.drawImage(this.correct, 0, 0, this.width, this.height);
		}
		
		renderCurrentWordOne(currword:string,currTime:number){
			this.clearCanvas();
			currTime = Math.floor(currTime);
			this.context.drawImage(this.game_background, 0, 0, this.width, this.height);
			this.printWord(currword);
			this.printTime(currTime);
		
		}
		
		renderCurrentWordTwo(currWord:string, teamTime:number,activeTeam:number){
			this.clearCanvas();
			teamTime = Math.floor(teamTime);
			this.context.drawImage(this.game_background2, 0, 0, this.width, this.height);
			this.printWord(currWord);
			this.printTimeTwo(teamTime,activeTeam);
		
		}
		renderInBetweenRounds(teamOneScore,teamTwoScore,currentRound,totalRounds){
			this.clearCanvas();
			this.context.drawImage(this.game_background, 0, 0, this.width, this.height);
			this.context.font = "50px AG Book Rounded";
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			this.context.fillText("ROUND " + currentRound+ "/" + totalRounds, this.width/2, this.height/4);
			this.context.fillText("Team 1", this.width/4, this.height/2);
			this.context.fillText("Team 2", 3*this.width/4, this.height/2);
			this.context.fillText(teamOneScore, this.width/4, 3*this.height/4);
			this.context.fillText(teamTwoScore, 3*this.width/4, 3*this.height/4);
		
		}
		renderRoundNumber(height,rounds,up){
			var self = this;
			/*
			this.roundPicking.onload = function(){
					self.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
			}
			*/
			this.clearCanvas();
			this.bouncingHeight = height;
			var self = this;
			if(up){	
				--height;
			}else{
				++height;
			}
			if(height > this.height/2 + 10){
				up = true;
			}else if(height < this.height/2 - 20){
				up = false;
			}
			var f = function(){self.renderRoundNumber(height,rounds,up)};
			this.bouncingAnimation = setTimeout(f, 20);
			self.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
			this.context.font = "150px AG Book Rounded";
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			this.context.fillText(rounds, this.width/2, height);	
		}
		slideLeft(rounds1,rounds2,width1,width2){
			this.clearCanvas();
			var self = this;
			self.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
			width1-=5;
			width2-=5;
			clearTimeout(this.bouncingAnimation);
			var f = function(){self.slideLeft(rounds1,rounds2,width1,width2)};
			this.slideLeftAnimation = setTimeout(f, 5);
			if(width2 <= Math.floor(this.width/2)){
				clearTimeout(this.slideLeftAnimation);
				this.renderRoundNumber(this.bouncingHeight,rounds2,true);
			}
			this.context.font = "150px AG Book Rounded";
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			this.context.fillText(rounds1, width1, this.bouncingHeight);
			this.context.fillText(rounds2, width2, this.bouncingHeight);
			
			
		}
		slideRight(rounds1,rounds2,width1,width2){
			this.clearCanvas();
			var self = this;
			self.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
			width1+=5;
			width2+=5;
			clearTimeout(this.bouncingAnimation);
			var f = function(){self.slideRight(rounds1,rounds2,width1,width2)};
			this.slideRightAnimation = setTimeout(f, 5);
			if(width2 >= Math.floor(this.width/2)){
				clearTimeout(this.slideRightAnimation);
				this.renderRoundNumber(this.bouncingHeight,rounds2,true);
			}
			this.context.font = "150px AG Book Rounded";
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			this.context.fillText(rounds1, width1, this.bouncingHeight);
			this.context.fillText(rounds2, width2, this.bouncingHeight);
		}
		renderSelectedRoundNumber(){
			clearTimeout(this.bouncingAnimation);
		}
		renderNotEnoughCategories(){
		
		}
		renderGameOverTwo(score1,score2){
			this.clearCanvas();
			this.context.drawImage(this.endGame_background, 0,0,this.width,this.height);
			this.context.font = "50px AG Book Rounded";
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			if(score1>score2){
				this.context.fillText("TEAM 1 WINS!", this.width/2, this.height/3);
			}else if(score1==score2){
				this.context.fillText("IT'S A TIE!", this.width/2, this.height/3);
			}else{
				this.context.fillText("TEAM 2 WINS!", this.width/2, this.height/3);
			}
			
		}
		renderGameOver(numItems:number,playedWords:string[],correct:boolean){
			this.clearCanvas();
			this.context.drawImage(this.endGame_background, 0,0,this.width,this.height);
			var numCorrect = 0;
			var shiftUp = 0;

				
			for(var i = 0; i < numItems; ++i){ 	
				if(!correct[i]){	//if word was passed
					this.context.fillStyle = "red";		
				}
				else{
					numCorrect++;
					this.context.fillStyle = "green";
				}
				this.context.font = "20px AG Book Rounded";
				this.context.fillText(playedWords[i], this.width/2, this.height*1/4+i*23 - shiftUp *23);
			}
			this.context.font = "40px AG Book Rounded";
			this.context.fillStyle = "white";
			this.context.fillText((numCorrect).toString(), this.width/2, this.height*1/8);		
		}
		
		
		clearCanvas(){
			this.context.clearRect(0, 0, this.width, this.height);
		}
		
		 printWord(currword:string){
			this.context.font = "80px AG Book Rounded";
			this.context.textBaseline = 'bottom';
			this.context.textAlign = 'center';
		    this.rotateContext(); 
			this.context.fillStyle = "blue";
			var textWidth = this.context.measureText(currword).width;
			this.wrapText(this.context, currword, this.height/4, this.width/1.55, this.height, 89, "bold 60px AG Book Rounded");
			this.context.restore();
		 }
		 
		 rotateContext(){ //essentially rotates context so that you can write text sideways.
			this.context.save();
			this.context.translate(0,h*3/4); //new origin
			this.context.rotate(-Math.PI / 2); //rotate counter-clockwise
		 }
		 
		wrapText(context, text, x, y, maxWidth, lineHeight, font) {
			var cars = text.split("\n");
			var lengthgr = false;
			if(text.length > 19 ){
				lengthgr = true;
				context.font = font;
				lineHeight = 60;
			}
	
			for (var ii = 0; ii < cars.length; ii++) {

				var line = "";
				var words = cars[ii].split(" ");
				var isMultipleLines;
				for (var n = 0; n < words.length; n++) {
					isMultipleLines = false;
					var testLine = line + words[n] + " ";
					var metrics = context.measureText(testLine);
					var testWidth = metrics.width;

					if (testWidth > maxWidth) {
						isMultipleLines = true;
						y = y/1.25;
						context.fillText(line, x, y);
						line = words[n] + " ";
						y += lineHeight;
					}
					else {
						line = testLine;
					}
				}
					context.fillText(line, x, y);
					y += lineHeight;
			}
		}
		printTime(timeLeft){
			  this.context.font = "30px AG Book Rounded";
			  this.context.textBaseline = 'bottom';
			  this.context.textAlign = 'center';
			  this.rotateContext();
			  this.context.fillStyle = "white";
			  this.context.fillText( 'TIME REMAINING: ' + Math.floor(timeLeft), this.height/4, this.width*15/16); 
			  this.context.restore();
		}
		printTimeTwo(timeLeft,teamNumber){
			  this.context.font = "30px AG Book Rounded";
			  this.context.textBaseline = 'bottom';
			  this.context.textAlign = 'center';
			  this.rotateContext();
			  this.context.fillStyle = "white";
			  this.context.fillText( "TEAM " + teamNumber + ' TIME REMAINING: ' + Math.floor(timeLeft), this.height/4, this.width*2/15 +5); 
			  this.context.restore();
		}

		
		

		
		
	}
}
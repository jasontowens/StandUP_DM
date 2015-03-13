/// <reference path="Model.ts" />
/// <reference path="GameOne.ts" />
/// <reference path="GameTwo.ts" />
module Game{
	export class GameView{
		resources;
		context;
		width;
		height;
		model;
		bouncingAnimation;
		slideRightAnimation;
		slideLeftAnimation;
		bouncingHeight;
		startingHeight;
		
		game_background;
		game_background2;
		nextRoundButton;
		forehead;
		pass;
		roundPicking;
		correct;
		endGame_background;
		rightArrow;
		leftArrow;
		rightArrowPressed;
		leftArrowPressed;
		balloon;
	
		constructor(resources,context,width,height,model){
			this.resources = resources;
			this.nextRoundButton = this.resources.nextRoundButton;
			this.game_background = this.resources.game_background;
			this.game_background2 = this.resources.game_background2;
			this.forehead = this.resources.forehead;
			this.pass = this.resources.pass;
			this.roundPicking = this.resources.roundPicking;
			this.correct = this.resources.correct;
			this.endGame_background = this.resources.endGame_background;
			this.rightArrow = this.resources.rightArrow;
			this.leftArrow = this.resources.leftArrow;
			this.rightArrowPressed = this.resources.rightArrowPressed;
			this.leftArrowPressed = this.resources.leftArrowPressed;
			this.balloon = this.resources.balloon;
			this.context = context;
			this.width = width;
			this.height = height;
			this.model = model;
			this.startingHeight=0;
		}
		renderForehead(){
			this.context.drawImage(this.forehead, 0, 0, this.width, this.height);
		}
		renderCountdown(timeLeft,height,counter){
			this.clearCanvas();
			this.context.drawImage(this.game_background, 0,0,this.width,this.height);
			this.drawNumber(timeLeft);
			var self = this;
			var timeout;
			this.drawCurveyBalloon(height,counter);
			if(timeLeft <= 0){
				clearTimeout(timeout);
				this.model.canChange = true;
			}else{
				height-=3;
				counter+=1;
				var f = function(){self.renderCountdown(timeLeft-.01,height,counter)};
				timeout = setTimeout(f, 10);
			}
		}
		drawCurveyBalloon(height,counter){
			var balloonHeight = 200*this.height/667;
			var balloonWidth = 190*this.width/375;
			var w = 50*(Math.sin(counter*.02)) + 10;
			this.context.drawImage(this.balloon,w,height,balloonWidth,balloonHeight);

		}
		drawMenuTextHorizontal(){
			this.rotateContext();
			this.context.font = "30px AG Book Rounded";
			this.context.textBaseline = 'bottom';
			this.context.textAlign = 'left';
			this.context.fillStyle = 'blue';
			this.context.fillText("< Menu", -140*this.width/375, 65*this.height/667);
			this.context.restore();
		
		}
		drawMenuTextVertical(){
			this.context.font = "30px AG Book Rounded";
			this.context.textBaseline = 'bottom';
			this.context.textAlign = 'left';
			this.context.fillStyle = 'black';
			this.context.fillText("< Menu", 30*this.width/375 , 60*this.height/667);
		}
		drawNumber(timeLeft){
			this.rotateContext();
			this.context.font = "bold 80px AG Book Rounded";
			this.context.textBaseline = 'center';
			this.context.textAlign = 'left';
			this.context.fillStyle = 'white';
			timeLeft = Math.floor(timeLeft);
			if(timeLeft == -1){
				timeLeft = 0;
			}
			this.context.fillText(timeLeft, this.width/2, this.height/2.4);
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
			currTime = Math.round(currTime);
			this.context.drawImage(this.game_background, 0, 0, this.width, this.height);
			this.drawMenuTextHorizontal();
			this.printWord(currword);
			this.printTime(currTime);
		
		}
		
		renderCurrentWordTwo(currWord:string, teamTime:number,activeTeam:number){
			this.clearCanvas();
			teamTime = Math.floor(teamTime);
			this.context.drawImage(this.game_background2, 0, 0, this.width, this.height);
			this.drawMenuTextHorizontal();
			this.printWord(currWord);
			this.printTimeTwo(teamTime,activeTeam);
		
		}
		
		balloonAnimation(print,h1,h2,h3,s1,s2,s3,count,image,drawMenu,inBetweenRounds){
			var balloon_height = 100/667*this.height;
			var balloon_width = 95/375 * this.width;
			var w1 = 30/375 * this.width;
			var w2 = 160/375 * this.width;
			var w3 = 300/375 * this.width;
			var t;
			if(this.balloonsInvisible(h1,h2,h3) || count == 0){//generate random starting heights
				if(this.whichOneInvisible(h1,h2,h3) == 1){
					h1 = Math.floor((Math.random() * this.height + balloon_height + 50)+this.height );
					s1 = Math.floor((Math.random() * 9)+4);
				}
				if(this.whichOneInvisible(h1,h2,h3) == 2){
					h2 = Math.floor((Math.random() * this.height + balloon_height + 50)+this.height );
					s2 = Math.floor((Math.random() * 9)+4);
				}
				if(this.whichOneInvisible(h1,h2,h3) == 3){
					h3 = Math.floor((Math.random() * this.height + balloon_height + 50)+this.height );
					s3 = Math.floor((Math.random() * 9)+4);
				}else if (count == 0){
					h1 = Math.floor((Math.random() * this.height + balloon_height + 50)+this.height );
					s1 = Math.floor((Math.random() * 9)+4);
					h2 = Math.floor((Math.random() * this.height + balloon_height + 50)+this.height );
					s2 = Math.floor((Math.random() * 9)+4);
					h3 = Math.floor((Math.random() * this.height + balloon_height + 50)+this.height );
					s3 = Math.floor((Math.random() * 9)+4);
				}
			}
			if(this.canIDrawBalloons()){
				this.clearCanvas();
				this.context.drawImage(image, 0, 0, this.width, this.height);
				if(inBetweenRounds){
					this.context.drawImage(this.nextRoundButton,this.width- 330*this.width/375,this.height-100*this.height/667 ,275*this.width/375,100*this.height/667);
				}
				this.context.drawImage(this.balloon,w1,h1,balloon_width,balloon_height);
				this.context.drawImage(this.balloon,w2,h2,balloon_width,balloon_height);
				this.context.drawImage(this.balloon,w3,h3,balloon_width,balloon_height);
				if(drawMenu){
					this.drawMenuTextVertical();
				}	
				print();
				h1-=s1;
				h2-=s2;
				h3-=s3;
				var self = this;
				var hm = function(){self.balloonAnimation(print,h1,h2,h3,s1,s2,s3,++count,image,drawMenu,inBetweenRounds)};
				t = setTimeout(hm,1000/60);
			}else{
				clearTimeout(t);
			}
		
		}
		canIDrawBalloons():boolean{
			if(this.model instanceof GameOne){
				return (this.model.gameOver);
			
			}else{
				return (this.model.gameOver || this.model.inBetweenRounds);
			}
		}
		whichOneInvisible(h1,h2,h3):number{
			var balloon_height = 100/667*this.height;
			if(h1 < - balloon_height){
				return 1;
			}
			if(h2 < - balloon_height){
				return 2;
			}
			if(h3 < - balloon_height){
				return 3;
			}
		
		}
		balloonsInvisible(h1,h2,h3):boolean{
			var balloon_height = 100/667*this.height;
			return (h1 < -balloon_height || h2 < -balloon_height || h3 < -balloon_height);
			
		}
		renderInBetweenRounds(teamOneScore,teamTwoScore,currentRound,totalRounds){
			this.clearCanvas();
			var self = this;
			var f = function(){self.printRounds(teamOneScore,teamTwoScore,currentRound,totalRounds)};
			this.balloonAnimation(f,0,0,0,0,0,0,0,this.game_background,true,true)
		}
		printRounds(teamOneScore,teamTwoScore,currentRound,totalRounds){
			this.context.font = "50px AG Book Rounded";
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			this.context.fillStyle = "blue";
			this.context.fillText("ROUND " + currentRound+ "/" + totalRounds, this.width/2, this.height/4);
			this.context.font = "40px AG Book Rounded";
			this.context.fillText("Team 1", this.width/4, this.height/2);
			this.context.fillText("Team 2", 3*this.width/4, this.height/2);
			this.context.fillText(teamOneScore, this.width/4, this.height/1.8);
			this.context.fillText(teamTwoScore, 3*this.width/4, this.height/1.8);
		}
		renderRoundNumber(height,top,bottom,rounds,up){
			this.context.drawImage(this.roundPicking, 0, 0, this.width, this.height);
			this.renderRoundNumber1(height,top,bottom,rounds,up);	
		}	
		renderRoundNumber1(height,top,bottom,rounds,up){
			var self = this;
			
			this.clearCanvas();
			this.bouncingHeight = height;
			var self = this;
			if(up){	
				--height;
			}else{
				++height;
			}
			if(height > bottom){
				up = true;
			}else if(height < top){
				up = false;
			}
			var f = function(){self.renderRoundNumber1(height,top,bottom,rounds,up)};
			this.bouncingAnimation = setTimeout(f, 20);
			this.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
			this.context.drawImage(this.rightArrow, 13.5* this.width/20, this.height/2.5, 100/375 * this.width, 100/667*this.height);
			this.context.drawImage(this.leftArrow, this.width/20, this.height/2.5, 100/375 * this.width, 100/667*this.height);
			this.drawMenuTextVertical();
			this.context.font = "150px AG Book Rounded";
			if(rounds == "11"){
				this.context.font = "130px AG Book Rounded";
			}
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			this.context.fillStyle = "black";
			this.context.fillText(rounds, this.width/2, height);	
		}
		clickLeftArrow(currTime){
		
		}
		clickRightArrow(){
			
		}
		slideLeft(rounds1,rounds2,width1,width2,top,bottom){
			this.clearCanvas();
			var self = this;
			this.context.drawImage(self.roundPicking, 0, 0, this.width, this.height);
			width1-=5;
			width2-=5;
			clearTimeout(this.bouncingAnimation);
			var f = function(){self.slideLeft(rounds1,rounds2,width1,width2,top,bottom)};
			this.slideLeftAnimation = setTimeout(f, 5);
			if(width2 <= Math.round(this.width/2)){
				clearTimeout(this.slideLeftAnimation);
				this.renderRoundNumber1(this.bouncingHeight,top,bottom,rounds2,true);
			}
			this.context.font = "150px AG Book Rounded";
			if(rounds1 == "11"){
				this.context.font = "130px AG Book Rounded";
			}
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			this.context.fillText(rounds1, width1, this.bouncingHeight);
			this.context.font = "150px AG Book Rounded";
			if(rounds2 == "11"){
				this.context.font = "130px AG Book Rounded";
			}
			this.context.fillText(rounds2, width2, this.bouncingHeight);
			this.context.drawImage(this.rightArrow, 13.5* this.width/20, this.height/2.5, 100/375 * this.width, 100/667*this.height);
			this.context.drawImage(this.leftArrow, this.width/20, this.height/2.5, 100/375 * this.width, 100/667*this.height);
			this.drawMenuTextVertical();
			
		}
		slideRight(rounds1,rounds2,width1,width2,top,bottom){
			this.clearCanvas();
			var self = this;
			self.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
			width1+=5;
			width2+=5;
			clearTimeout(this.bouncingAnimation);
			var f = function(){self.slideRight(rounds1,rounds2,width1,width2,top,bottom)};
			this.slideRightAnimation = setTimeout(f, 5);
			if(width2 >= Math.round(this.width/2)){
				clearTimeout(this.slideRightAnimation);
				this.renderRoundNumber1(this.bouncingHeight,top,bottom,rounds2,true);
			}
			this.context.font = "150px AG Book Rounded";
			this.context.textBaseline = 'center';
			this.context.textAlign = 'center';
			if(rounds1 == "11"){
				this.context.font = "130px AG Book Rounded";
			}
			this.context.fillText(rounds1, width1, this.bouncingHeight);
			this.context.font = "150px AG Book Rounded";
			if(rounds2 == "11"){
				this.context.font = "130px AG Book Rounded";
			}
			this.context.fillText(rounds2, width2, this.bouncingHeight);
			this.context.drawImage(this.rightArrow, 13.5* this.width/20, this.height/2.5, 100/375 * this.width, 100/667*this.height);
			this.context.drawImage(this.leftArrow, this.width/20, this.height/2.5, 100/375 * this.width, 100/667*this.height);
			this.drawMenuTextVertical();
		}
		renderSelectedRoundNumber(){
			clearTimeout(this.bouncingAnimation);
		}
		renderGameOverTwo(score1,score2){
			this.clearCanvas();
			var self = this;
			var f = function(){self.printGameOverTwo(score1,score2)};
			this.balloonAnimation(f,0,0,0,0,0,0,0,this.endGame_background,false,false);	
			
		}
		printGameOverTwo(score1,score2){
			this.context.font = "40px AG Book Rounded";
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
			var self = this;
			var f = function(){self.printGameOver(numItems,playedWords,correct)};
			this.balloonAnimation(f,0,0,0,0,0,0,0,this.endGame_background,false,false);	
					
		}
		printGameOver(numItems:number,playedWords:string[],correct:boolean){
			console.log("numItems: "+ numItems +" playedWords[0]: "+playedWords[0] + "correctBool: " + correct);
		
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
				var printY = this.height*1/4+i*23 - shiftUp *23 - this.startingHeight;
				if(printY < this.height * 3/4 && printY>this.height*1/8){
					this.context.fillText(playedWords[i], this.width/2, printY);
				}
			}
			this.context.font = "40px AG Book Rounded";
			this.context.fillStyle = "white";
			this.context.fillText("Score " + (numCorrect) + "/" + numItems , this.width/2, this.height*1/8);
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
			y-=10;
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
					context.fillText(line, x, y-5);
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
			  this.context.fillText( "TEAM " + teamNumber + ' TIME: ' + Math.floor(timeLeft), 170*this.width/375, 65*this.height/667); 
			  this.context.restore();
		}

	}
}
/// <reference path="Model.ts" />
/// <reference path="GameOne.ts" />
/// <reference path="GameTwo.ts" />
module Game{
	export class GameView{
	
		game_background = new Image();
		forehead = new Image();
		pass = new Image();
		correct = new Image();
		context;
		width;
		height;
		model;
		timeout;
	
		constructor(context,width,height,model){
			this.game_background.src = "InGame.png";
			this.forehead.src = "forehead.png";
			this.pass.src = "pass.png";
			this.correct.src = "correct.png";
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
		renderCountdown(){
		
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
		
		clearCanvas(){
			this.context.clearRect(0, 0, this.width, this.height);
		}
		
		 printWord(currword:string){
			this.context.font = "bold 80px AG Book Rounded";
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
			//return isMultipleLines;
	}
 	printTime(timeLeft){
		  this.context.font = "bold 30px Arial";
		  this.context.textBaseline = 'bottom';
		  this.context.textAlign = 'center';
		  this.rotateContext();
		  this.context.fillStyle = "white";
		  this.context.fillText( 'TIME REMAINING: ' + Math.floor(timeLeft), h/4, w*15/16); 
		  this.context.restore();
 	}
		
		
		
		
		
		
		
		
		
		
		gameTwoRender(){
		
		}
		
		
	}
}
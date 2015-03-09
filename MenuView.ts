/// <reference path="Resources.ts" />
module Game{
	export class MenuView{
		resources;
		menu_background1;
		menu_background2;
		blueBackground;
		balloon;
		slime;
		orangeBackground;
		arrow;
		stand;
		kids;
		noCatSel;
		context;
		width;
		height;
		gameMode
		menuOptions:string[];
		balloonAnimation;
		youCanClick;
		animationOne;
		animationTwo:boolean;
		animationThree:boolean;
		buttons;
		
		balloonHeight;
		
	
		constructor(resources,context,width,height,gameMode){
			this.resources = resources;
			this.buttons = this.resources.buttons;
			this.orangeBackground = this.resources.orangeBackground;
			this.balloon = this.resources.balloon;
			this.stand = this.resources.stand;
			this.blueBackground = this.resources.blueBackground;
			this.slime = this.resources.slime;
			this.menu_background1 = this.resources.menu_background1;
			this.kids = this.resources.kids;
			//this.menu_background2 = this.resources.menu_background2;
			this.arrow = this.resources.leftArrowPressed;
			this.noCatSel = this.resources.noCatSel;
			this.context = context;
			this.width = width;
			var self = this;
			this.height = height;
			this.gameMode = gameMode;
			this.menuOptions = ["Play Game", "Categories", "Mode", "Help"];
			this.animationTwo = false;
			this.animationThree = false;
			this.youCanClick = false;
			this.balloonHeight = this.height*200/667;
		}
		renderNotEnoughCategories(height,velocity,friction){
			clearTimeout(this.balloonAnimation);
			if(friction == 3){
				this.youCanClick = true;
			}
			else{
				var gravity = 0.2;
				var bounceFactor = 0.5;
				this.clearCanvas();
				this.drawBackGround();
				this.context.drawImage(this.noCatSel, this.width/5, height, this.width/1.5, this.height/3);
				height += velocity;
				velocity += gravity;
				if(height + this.height/6 > this.height/2) {
					height = this.height/2 - this.height/6;
					velocity *= -bounceFactor;
					++friction;
				}
				var self = this
				var f = function(){self.renderNotEnoughCategories(height,velocity, friction)};
				this.animationOne = setTimeout(f, 1000/60);
			}
		}
		clearCanvas(){
			this.context.clearRect(0, 0, this.width, this.height);
		}
		drawBackGround(){
			if(this.gameMode == 1){
				this.context.drawImage(this.menu_background1, 0, 0, this.width, this.height);
			
			}else{
				this.context.drawImage(this.menu_background1, 0, 0, this.width, this.height);
			}
		}
		render(gameMode){
			if(this.balloonAnimation){
				clearTimeout(this.balloonAnimation);
			}
			if(gameMode == 1){
				this.context.drawImage(this.menu_background1, 0, 0, this.width, this.height);
			
			}else{
				this.context.drawImage(this.menu_background1, 0, 0, this.width, this.height);
			}
			
			var targetHeightTop = this.height*180/667;
			var targetHeightBottom = this.height*250/667;
			this.balloonAnimation1(this.height*200/667,targetHeightTop, targetHeightBottom,false);
			
			/*
			//this.beginAnimationOne(-this.height/4,-(this.height/4+this.height-4));
			//this.beginAnimationTwo(this.height + this.height*50/667);;
			
			this.context.drawImage(this.kids, 0, 0, this.width, this.height);
			this.context.globalAlpha = .2;
			this.context.fillStyle = "black";
			this.context.fillRect(0,0,this.width,this.height);
			//this.context.fillStyle = "#1F1F99";
			this.context.fillStyle = "#FFFFFF";
			this.context.globalAlpha = .9;
			this.context.fillRect(0,0,3*this.width/4,this.height);
			
			
			}
			this.context.globalAlpha = 1;
			*/
		}
		balloonAnimation1(height,top,bottom,direction){
			if(height>=bottom){
				direction = true;
			}else if(height <= top){
				direction = false;
				
			}
			if(direction){
				this.clearCanvas();
				this.drawBackGround();
				this.context.drawImage(this.balloon,this.width - this.width*230/375,height,this.width*280/375,this.height*320/667);
			this.context.drawImage(this.buttons,0/*was this.width*/,this.height/3,this.width/2,this.height/2.4);
				height-=.1;
				var self = this
				var f = function(){self.balloonAnimation1(height,top,bottom,direction)};
				this.balloonAnimation = setTimeout(f, 1000/600);
			}else{
				this.clearCanvas();
				this.drawBackGround();
				this.context.drawImage(this.balloon,this.width - this.width*230/375,height,this.width*280/375,this.height*320/667);
				this.context.drawImage(this.buttons,0,this.height/3,this.width/2,this.height/2.4);
				height+=.1;
				var self = this
				var f = function(){self.balloonAnimation1(height,top,bottom,direction)};
				this.balloonAnimation = setTimeout(f, 1000/600);
			}
		
		}
		
		drawText(rectX,rectY,width,height,text,color){
    		var fontSize = 30;
    		var fontSizeString = fontSize.toString();
    		var font = "pt AG Book Rounded";
    		this.context.font = fontSizeString + font;
      		//this.context.textAlign="center"; 
			this.context.textBaseline = "middle";
      		this.context.fillStyle = color;
      		var metrics = this.context.measureText(text);
      		var metricsWidth = metrics.width;
      		while(metricsWidth >= width){
      			--fontSize;
      			var fontSizeString = fontSize.toString();
      			this.context.font = fontSizeString + font;
      			metrics = this.context.measureText(text);
      			metricsWidth = metrics.width;
      			
      		}
      		
      		this.context.fillText(text,this.width/30,rectY+(height/2));
    	}
		
		
	}
}
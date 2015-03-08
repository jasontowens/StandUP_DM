/// <reference path="Resources.ts" />
module Game{
	export class MenuView{
		resources;
		menu_background1;
		menu_background2;
		kids;
		noCatSel;
		context;
		width;
		height;
		gameMode
		menuOptions:string[];
	
		constructor(resources,context,width,height,gameMode){
			this.resources = resources;
			this.menu_background1 = this.resources.menu_background1;
			this.kids = this.resources.kids;
			this.menu_background2 = this.resources.menu_background2;
			this.noCatSel = this.resources.noCatSel;
			this.context = context;
			this.width = width;
			var self = this;
			this.height = height;
			this.gameMode = gameMode;
			this.menuOptions = ["Play Game", "Categories", "Game Mode", "Help"];
		}
		renderNotEnoughCategories(height,velocity,friction){
			if(friction == 3){
	
			}
			else{
				var gravity = 0.2;
				var bounceFactor = 0.5;
				this.clearCanvas();
				this.render(this.gameMode)
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
				setTimeout(f, 1000/60);
			}
		}
		clearCanvas(){
			this.context.clearRect(0, 0, this.width, this.height);
		}
		render(gameMode){
			var self = this;
			if(gameMode == 1){
				this.renderOne();
			}else{
				//this.renderTwo();
			}
		}
		
		renderOne(){
			this.context.drawImage(this.kids, 0, 0, this.width, this.height);
			this.context.globalAlpha = .2;
			this.context.fillStyle = "black";
			this.context.fillRect(0,0,this.width,this.height);
			this.context.fillStyle = "#1F1F99";
			this.context.globalAlpha = .7;
			this.context.fillRect(0,0,2*this.width/3,this.height);
			for(var i = 1; i!= 6; ++i){
				this.context.moveTo(0,i*this.height/7);
				this.context.lineTo(2*this.width/3,i*this.height/7);
				this.context.strokeStyle = "##5C5C5D";
				this.context.lineWidth = 3;
				this.context.stroke();
				if(i == 1){
				
				}else{
					var width = 2*this.width/3;
					this.drawText(0,(i-1)*this.height/7,width,this.height/7,this.menuOptions[i-2],"white");
				}
			
			}
			this.context.globalAlpha = 1;
		
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
      		
      		this.context.fillText(text,this.width/20,rectY+(height/2));
    	}
		
		
	}
}
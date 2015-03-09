module Game{
	export class CategoriesView{
	
		context;
		width;
		height;
		model;
		categories;
		boolCategories:boolean[];
		font;
		category_background;
		category_background1;
		resources;
	
		constructor(resources,context,width,height){
			this.resources = resources;
			this.category_background = this.resources.category_background;
			this.category_background1 = this.resources.category_background1;
			this.context = context;
			this.width = width;
			this.height = height;
			this.font = "pt AG Book Rounded";
		}
		setCategories(categories,boolcat){
			this.categories = categories;
			this.boolCategories = boolcat;
		}
		
		render(){
			this.renderCategories(0,this.boolCategories);
		}
		fillRoundedRect(x, y,width,height){
			var radius = 20;
			this.context.beginPath();
  			this.context.moveTo(x + radius, y);
  			this.context.lineTo(x + width - radius, y);
  			this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
  			this.context.lineTo(x + width, y + height - radius);
  			this.context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  			this.context.lineTo(x + radius, y + height);
			this.context.quadraticCurveTo(x, y + height, x, y + height - radius);
  			this.context.lineTo(x, y + radius);
  			this.context.quadraticCurveTo(x, y, x + radius, y);
  			this.context.closePath();
  			this.context.fillStyle = "black";
  			this.context.fill();
    	}
    	drawText(rectX,rectY,width,height,text,color){
    		var fontSize = 30;
    		var fontSizeString = fontSize.toString();
    		this.context.font = fontSizeString + this.font;
      		this.context.textAlign="center"; 
			this.context.textBaseline = "middle";
      		this.context.fillStyle = color;
      		var metrics = this.context.measureText(text);
      		var metricsWidth = metrics.width;
      		while(metricsWidth >= width){
      			--fontSize;
      			var fontSizeString = fontSize.toString();
      			this.context.font = fontSizeString + this.font;
      			metrics = this.context.measureText(text);
      			metricsWidth = metrics.width;
      			
      		}
      		
      		this.context.fillText(text,rectX+(width/2),rectY+(height/2));
    	}
    	renderCategories(startingHeight,boolCategories){
			var self = this;
    		this.clearCanvas()
    		var screenHeight = this.height - (this.height/4);
    		var buttonHeight = screenHeight/7;
    		var totalScreenHeight = buttonHeight/4;
    		var tempStartingHeight = startingHeight;
    		var h = screenHeight/7;
    		var gap = 0;
    		var startingGap = this.height/2.8;
			for(var i = 0; i != this.categories.length;++i){
				var width = this.width;
				var height = h;
				var rectX = 0;
				var rectY = startingGap-tempStartingHeight;
				if(boolCategories[i]){
					this.context.fillStyle = "#00FF00";
				}else{
					this.context.fillStyle = "#FF3300";
				}
				this.context.globalAlpha =.5;
				this.context.fillRect(rectX,rectY,width,height);
				this.context.globalAlpha =1;
				this.drawText(rectX,rectY,width,height,this.categories[i][0],"black");   
				tempStartingHeight -= (h+gap);
			}
			console.log(startingHeight);
			//jason help
			this.context.globalAlpha = .7;
			this.context.fillRect(this.width - 10*this.width/375,startingGap + (startingHeight)*(.5),10*this.width/375,h);
			this.context.globalAlpha = 1;
			this.drawCategoriesOverLay();
    	}
    
    	drawCategoriesOverLay(){
    		this.context.drawImage(this.category_background,0,0,this.width,this.height/2.8);
    		this.context.globalAlpha = 0.6;
    		this.context.fillStyle = "black";
			this.context.fillRect(0, 0, this.width, this.height/2.8);
			this.context.globalAlpha =1;
			this.context.fillRect(0, this.height - (150* this.height/667 ), this.width, 150* this.height/667);
			this.context.globalAlpha =.9;
			this.drawText(0, this.height - 150* this.height/667 , this.width, 150* this.height/667, "Menu", "white")
			this.drawText(0,20,this.width,this.height/2.8,"Categories","white")
			this.context.globalAlpha =1;
			this.context.globalAlpha =1;
    	}

    	clearCanvas(){
			this.context.clearRect(0, 0, this.width, this.height);
		}
	}
}
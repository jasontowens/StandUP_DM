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
		fillRoundedRect(x, y,w,h){
			var r = 20;
			this.context.beginPath();
			this.context.moveTo(x+r, y);
			this.context.lineTo(x+w-r, y);
			this.context.quadraticCurveTo(x+w, y, x+w, y+r);
			this.context.lineTo(x+w, y+h-r);
			this.context.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
			this.context.lineTo(x, y+h);
			this.context.lineTo(x, y);
			this.context.closePath();
			this.context.strokeStyle = "black";
    		this.context.lineWidth   = 5;
			this.context.fill();
			this.context.stroke();     
    	}
    	drawText(rectX,rectY,width,height,i){
    		var fontSize = 30;
    		var fontSizeString = fontSize.toString();
    		this.context.font = fontSizeString + this.font;
      		this.context.textAlign="center"; 
			this.context.textBaseline = "middle";
      		this.context.fillStyle = "black";
      		var metrics = this.context.measureText(this.categories[i][0]);
      		var metricsWidth = metrics.width;
      		while(metricsWidth >= width){
      			--fontSize;
      			var fontSizeString = fontSize.toString();
      			this.context.font = fontSizeString + this.font;
      			metrics = this.context.measureText(this.categories[i][0]);
      			metricsWidth = metrics.width;
      			
      		}
      		
      		this.context.fillText(this.categories[i][0],rectX+(width/2),rectY+(height/2));
      		this.context.fillText(this.categories[i][0],rectX+(width/2),rectY+(height/2));
    	}
    	renderCategories(startingHeight,boolCategories){
			var self = this;
				
		
    		this.clearCanvas()
    		var screenHeight = this.height - (this.height/4);
    		var tempStartingHeight = startingHeight;
    		var h = screenHeight/7;
    		var gap = 10;
    		var startingGap = this.height/9 + 10;
			//console.log(startingHeight);
			//console.log("canvas_y" + numberOfButtonsRendered);
			for(var i = 0; i != this.categories.length;++i){
				var width = this.width/1.2;
				var height = h;
				var rectX = this.width / 20;
				var rectY = startingGap-tempStartingHeight;
				if(boolCategories[i]){
					this.context.fillStyle = "#00FF00";
				}else{
					this.context.fillStyle = "#FF3300";
				}
				this.fillRoundedRect(rectX,rectY,width,height);
				this.drawText(rectX,rectY,width,height,i);   
				tempStartingHeight -= (h+gap);
			}
			this.context.drawImage(this.category_background1, 0, 0, this.width, this.height);
    	}
    	renderCategoriesNoImage(startingHeight,boolCategories){
    		var self = this;
    		this.clearCanvas()
    		var screenHeight = this.height - (this.height/4);
    		var tempStartingHeight = startingHeight;
    		var h = screenHeight/7;
    		var gap = 10;
    		var startingGap = this.height/9 + 10;
			for(var i = 0; i != this.categories.length;++i){
				var width = this.width/1.2;
				var height = h;
				var rectX = this.width / 20;
				var rectY = startingGap-tempStartingHeight;
				if(boolCategories[i]){
					this.context.fillStyle = "#00FF00";
				}else{
					this.context.fillStyle = "#FF3300";
				}
				this.fillRoundedRect(rectX,rectY,width,height);
				this.drawText(rectX,rectY,width,height,i);   
				tempStartingHeight -= (h+gap);
			}
    	
    	}
    	changeBackground(startingHeight){	
    		this.clearCanvas();
    		this.renderCategoriesNoImage(startingHeight,this.boolCategories)
    		this.context.drawImage(this.category_background, 0, 0, this.width, this.height);
    	}
    	clearCanvas(){
			this.context.clearRect(0, 0, this.width, this.height);
		}
	}
}
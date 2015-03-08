/// <reference path="GameLoop.ts" />
module Game{
	export class CategoriesController{
		
		gameloop;
		canvas;
		width;
		height;
		model;
		categoriesView;
		startX;
		startY;
		endX;
		endY;
		oldY;
		startingHeight;
		fingerLifted:boolean;

		constructor(gameloop,canvas,width,height,model,categoriesView){
			this.gameloop = gameloop;
			this.canvas = canvas;
			this.width = width;
			this.height = height;
			this.startingHeight = 0;
			this.oldY = 0;
			this.model = model;
			this.categoriesView = categoriesView;
			this.categoriesView.setCategories(this.model.Categories,this.model.chosenCategories);
		}
		takeInput(){
			this.Scrolling = <any>this.Scrolling.bind(this);
			this.endScrolling = <any>this.endScrolling.bind(this);
			this.startClick = <any>this.startClick.bind(this);
			this.canvas.addEventListener("touchstart",this.startClick);
			this.canvas.addEventListener("touchmove",this.Scrolling);
			this.canvas.addEventListener("touchend",this.endScrolling);
		}
		startClick(event){
			event.preventDefault();
			var canvas_x = event.targetTouches[0].pageX;
			var canvas_y = event.targetTouches[0].pageY;
			this.startX = canvas_x;
			this.startY = canvas_y;
			this.endY = canvas_y;
			this.endX = canvas_x;
		}
		Scrolling(event){
			event.preventDefault();
			var screenHeight = this.height - (this.height/4);
			var buttonHeight = screenHeight/7;
			var maxHeight = buttonHeight * this.model.Categories.length;
			var canvas_x = event.targetTouches[0].pageX;
			var canvas_y = event.targetTouches[0].pageY;
			console.log(this.startingHeight + "sh");
			if(this.fingerLifted){
				this.startX = canvas_x;
				this.startY = canvas_y;
			}
			if(!this.fingerLifted){
				var difference = this.oldY - canvas_y;
				var newStartingHeight = this.startingHeight+difference;
				
				if(newStartingHeight < 0){
					this.startingHeight = 0;
				}
				else if(newStartingHeight + buttonHeight*4 + -5 > (maxHeight)){
					this.startingHeight = this.startingHeight;
				}
				else{
					this.startingHeight = newStartingHeight;
				}
				this.categoriesView.renderCategories(Math.round(this.startingHeight),this.model.chosenCategories);
				
			}
	
			this.oldY = canvas_y;
			this.endY = canvas_y;
			this.endX = canvas_x;

			this.fingerLifted = false;
			
		}
		
		endScrolling(event){
			this.fingerLifted = true;
			console.log(this.startX + " " + this.endX);
			if(Math.abs(this.startX - this.endX)< 5){
				if(Math.abs(this.startY - this.endY) < 5){
					this.updateGame(this.endY)
				}
			}
		}
		 
		 updateGame(canvas_y){
		 	//var canvas_y = event.y;
			//canvas_y -= this.canvas.offsetTop;
			var screenHeight = this.height - (this.height/4);
			var buttonHeight = screenHeight/7;
			var gap = 0;
    		var startingGap = this.height/2.8;
    		var menuButton = (560/667)*this.height;
    		var click = this.startingHeight + canvas_y;
    		if(canvas_y > startingGap && canvas_y <= menuButton){
				var i = Math.floor((click - startingGap) / (buttonHeight + gap)); // i
				this.model.changeChosenCat(i);
				this.categoriesView.renderCategories(this.startingHeight,this.model.chosenCategories)
			}
			if(canvas_y > menuButton){	
				var time = new Date().getTime();
				this.switchToMenuState(time,1);
			}
		}
		 
		 
		switchStates(){
			this.canvas.removeEventListener("touchmove",this.Scrolling);
			this.canvas.removeEventListener("touchend",this.endScrolling);
			this.canvas.removeEventListener("touchstart",this.startClick);
		}
	
		switchToMenuState(time,count){
			this.switchStates();
			this.gameloop.switchToMenuState();
		}
			
		
	}
}
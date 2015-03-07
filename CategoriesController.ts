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
			this.categoriesView.renderCategories(this.startingHeight,this.model.chosenCategories)
		}
		takeInput(){
			this.Scrolling = <any>this.Scrolling.bind(this);
			this.endScrolling = <any>this.endScrolling.bind(this);
			this.updateGame = <any>this.updateGame.bind(this);
			this.canvas.addEventListener("touchmove",this.Scrolling);
			this.canvas.addEventListener("touchend",this.endScrolling);
			this.canvas.addEventListener("click",this.updateGame); 
		}
		Scrolling(event){
			event.preventDefault();
			var screenHeight = this.height - (this.height/4);
			var numCatPages = Math.ceil(this.model.Categories.length / 6);
			var maxHeight = screenHeight * numCatPages;//fix this once there is new categories
			var canvas_x = event.targetTouches[0].pageX;
			var canvas_y = event.targetTouches[0].pageY;
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
				else if(newStartingHeight + this.height > (maxHeight)){
					this.startingHeight = this.startingHeight;
				}
				else{
					this.startingHeight = newStartingHeight;
				}
				console.log("hi" + canvas_y);
				this.categoriesView.renderCategories(Math.round(this.startingHeight),this.model.chosenCategories);
				
			}
	
			this.oldY = canvas_y;
			this.endY = canvas_y;
			this.endX = canvas_x;

			this.fingerLifted = false;
			
		}
		
		endScrolling(event){
			this.fingerLifted = true;
		}
		 
		 updateGame(event){
		 	var canvas_y = event.y;
			canvas_y -= this.canvas.offsetTop;
			var screenHeight = this.height - (this.height/4);
			var buttonHeight = screenHeight/7;
			var gap = 10;
    		var startingGap = this.height/9 + 10;
    		var menuButton = (550/667)*this.height;
    		var click = this.startingHeight + canvas_y;
    		if(click > startingGap){
				var i = Math.floor((click - startingGap) / (buttonHeight + gap)); // i
				this.model.changeChosenCat(i);
				this.categoriesView.renderCategories(this.startingHeight,this.model.chosenCategories)
			}
			if(canvas_y > menuButton){	
				this.switchToMenuState();
			}
		}
		 
		 
		switchStates(){
			this.canvas.removeEventListener("touchmove",this.Scrolling);
			this.canvas.removeEventListener("touchend",this.endScrolling);
			this.canvas.removeEventListener("click",this.updateGame); 
		}
	
		switchToMenuState(){
			this.switchStates();
			this.gameloop.switchToMenuState();
		}
	}
}
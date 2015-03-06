/// <reference path="GameLoop.ts" />
module Game{
	export class CategoriesController{
		
		gameloop;
		canvas;
		width;
		height;
		model;
		categoriesView;

		constructor(gameloop,canvas,width,height,model,categoriesView){
			this.gameloop = gameloop;
			this.canvas = canvas;
			this.width = width;
			this.height = height;
			this.model = model;
			this.categoriesView = categoriesView;
		}
		takeInput(){
			this.canvas.addEventListener("touchmove",this.Scrolling.bind(this));
			this.canvas.addEventListener("touchend",this.endScrolling.bind(this));
			this.canvas.addEventListener("click",this.updateGame.bind(this)); 
		}
		Scrolling(e){
			
		}
		
		endScrolling(e){
			
		}
		 
		 updateGame(e){
		}
		 
		 
		switchStates(){
			this.canvas.removeEventListener("touchmove",this.Scrolling.bind(this));
			this.canvas.removeEventListener("touchend",this.endScrolling.bind(this));
			this.canvas.removeEventListener("click",this.updateGame.bind(this)); 
		}
	
		switchToGameState(){
			this.switchStates();
			this.gameloop.switchToGameState();
		}
		switchToCategoriesState(){
			this.switchStates();
			this.gameloop.switchToCategoriesState();
		}
		
	
	}
}
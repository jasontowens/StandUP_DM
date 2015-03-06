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
			this.Scrolling = <any>this.Scrolling.bind(this);
			this.endScrolling = <any>this.endScrolling.bind(this);
			this.updateGame = <any>this.updateGame.bind(this);
			this.canvas.addEventListener("touchmove",this.Scrolling);
			this.canvas.addEventListener("touchend",this.endScrolling);
			this.canvas.addEventListener("click",this.updateGame); 
		}
		Scrolling(e){
			
		}
		
		endScrolling(e){
			
		}
		 
		 updateGame(e){
		}
		 
		 
		switchStates(){
			this.canvas.removeEventListener("touchmove",this.Scrolling);
			this.canvas.removeEventListener("touchend",this.endScrolling);
			this.canvas.removeEventListener("click",this.updateGame); 
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
/// <reference path="MenuController.ts" />
/// <reference path="MenuView.ts" />
/// <reference path="GameController.ts" />
/// <reference path="GameView.ts" />
/// <reference path="CategoriesController.ts" />
/// <reference path="CategoriesView.ts" />
/// <reference path="Model.ts" />
/// <reference path="GameOne.ts" />
/// <reference path="GameTwo.ts" />


module Game{
	export class GameLoop{
	
	
		canvas;
		context;
		width;
		height;
		controller;
		view;
		model;
		
		constructor(canvas,context,width,height){
			this.canvas = canvas;
			this.context = this.canvas.getContext('2d');
			this.width = width;
			this.height = height;
			this.model = new GameOne();
			this.controller = new Game.MenuController(this,canvas,width,height);//add model
			this.view = new MenuView(context,width,height);//add model
		
		}
		runGame(){
			this.controller.takeInput();
			this.view.render();
		}
		
		switchGameModes(){
			if(this.model instanceof GameOne){
				this.model = new GameTwo();
			}else if(this.model instanceof GameTwo){
				this.model = new GameOne();
			}
		}
		
		switchToGameState(){
			var newView = new GameView(this.context,this.width,this.height,this.model);
			this.view = newView;
			this.model.setGameView(newView);
			
			var newController = new GameController(this,this.canvas,this.width,this.height,this.model);
			this.controller = newController;
			this.controller.takeInput();
			
			
		}
		
		switchToCategoriesState(){
			var newView = new CategoriesView(this.context,this.width,this.height);//add model
			this.view = newView;
			this.view.render();
			
			var newController = new CategoriesController(this,this.canvas,this.width,this.height,this.model,newView);
			this.controller = newController;
			this.controller.takeInput();
			
			
		}
		
		switchToMenuState(){
			var newController = new MenuController(this,this.canvas,this.width,this.height);//add model
			this.controller = newController;
			this.controller.takeInput();
			
			var newView = new MenuView(this.context,this.width,this.height);//add model
			this.view = newView;
			this.view.render();
		}
		
		
		
	
	}
}
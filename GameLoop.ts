/// <reference path="MenuController.ts" />
/// <reference path="MenuView.ts" />
/// <reference path="GameController.ts" />
/// <reference path="GameView.ts" />
/// <reference path="CategoriesController.ts" />
/// <reference path="CategoriesView.ts" />
/// <reference path="Model.ts" />
/// <reference path="GameOne.ts" />
/// <reference path="GameTwo.ts" />
/// <reference path="Resources.ts" />


module Game{
	export class GameLoop{
	
	
		canvas;
		context;
		width;
		height;
		controller;
		view;
		model;
		gameOne;
		gameTwo;
		currentGame;
		resources;
		
		constructor(canvas,context,width,height){
			this.resources = new Resources();
			this.canvas = canvas;
			this.context = this.canvas.getContext('2d');
			this.width = width;
			this.height = height;
			this.model = new GameOne();
			this.view = new MenuView(this.resources,context,width,height,1);	
			this.controller = new Game.MenuController(this,canvas,width,height,this.model,this.view);
			this.gameOne = new GameOne();
			this.gameTwo = new GameTwo();
			this.currentGame = 1;
				
		}
		runGame(){
			if(this.resources.hasLoaded()){
				this.controller.takeInput();
				this.view.render(this.currentGame);
			}else{
				var self = this;
				var f = function(){self.runGame()};
				var t = setTimeout(f,100);
			}
		}
		
		switchGameModes(){
			if(this.model instanceof GameOne){
				this.model = this.gameTwo;
				this.view.gameMode = 2;
				this.currentGame = 2;
				this.view.render(2);
			}else if(this.model instanceof GameTwo){
				this.model = this.gameOne;
				this.view.gameMode = 1;
				this.currentGame = 1;
				this.view.render(1);
			}
		}
		
		switchToGameState(){
			this.model.clearVariables();
			var newView = new GameView(this.resources,this.context,this.width,this.height,this.model);
			this.view = newView;
			this.model.setGameView(newView);
			
			var newController = new GameController(this,this.canvas,this.width,this.height,this.model);
			this.controller = newController;
			this.controller.takeInput();
		
		}
		
		switchToCategoriesState(){
			var newView = new CategoriesView(this.resources,this.context,this.width,this.height);//add model
			this.view = newView;
		
			
			var newController = new CategoriesController(this,this.canvas,this.width,this.height,this.model,newView);
			this.controller = newController;
			this.view.render();
			this.controller.takeInput();

			
			
		}
		switchToMenuState(){
		
			var newView = new MenuView(this.resources,this.context,this.width,this.height,this.currentGame);
			this.view = newView;
			this.view.render(this.currentGame);
			
			var newController = new MenuController(this,this.canvas,this.width,this.height,this.model,newView);
			this.controller = newController;
			this.controller.takeInput();
			
		}
		
		
		
	
	}
}
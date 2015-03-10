/// <reference path="GameLoop.ts" />
module Game{
	export class MenuController{
		
		gameloop;
		canvas;
		width;
		height;
		model;
		menuView;
		notEnoughCat;

		constructor(gameloop,canvas,width,height,model,menuView){
			this.gameloop = gameloop;
			this.canvas = canvas;
			this.model = model
			this.height = height;
			this.width = width;
			this.menuView = menuView;
			this.notEnoughCat = false;
		}
		takeInput(){
			this.mobileClick = <any>this.mobileClick.bind(this);
			this.canvas.addEventListener('click', this.mobileClick);   
		}
		mobileClick(e){
			var mobileClickY = event.y;
 			mobileClickY -= this.canvas.offsetTop;
			var mobileClickX = event.x;
		 	mobileClickX -= this.canvas.offsetLeft;
		 	if(this.notEnoughCat){
 				this.catClick(mobileClickX,mobileClickY);
 			}else{
 				this.click(mobileClickX,mobileClickY);
 			}	
		}
		
		catClick(X,Y){
			clearTimeout(this.menuView.animationOne);
			this.notEnoughCat = false;
			this.menuView.render(this.gameloop.currentGame);
		}
		click(X,Y){
			
			if(X<this.width/2){
			console.log(Y);
				if(Y<290*this.height/565 && Y>245*this.height/565){
					this.switchToGameState();		
				}
				else if(Y<340*this.height/565 && Y>300*this.height/565){
					this.switchToCategoriesState();	
				}
				else if(Y<400*this.height/565 && Y>350*this.height/565){
					this.gameloop.switchGameModes();
				}
				else if(Y<450*this.height/565 && Y>410*this.height/565){
					//how to play
				}
			}
			
		 }
		 
		 
		switchStates(){
			clearTimeout(this.menuView.balloonAnimation);
			this.canvas.removeEventListener('click', this.mobileClick); 
				console.log("switching states");
		}
	
		switchToGameState(){
			if(this.model.gameCanStart()){
				this.switchStates();
				this.gameloop.switchToGameState();
			}else{
				this.notEnoughCat =true;
				this.menuView.renderNotEnoughCategories(-10,1,0);
			}
			
		}
		switchToCategoriesState(){
			this.switchStates();
			this.gameloop.switchToCategoriesState();
		}
		
	
	}
}
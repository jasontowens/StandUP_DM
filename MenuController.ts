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
			this.notEnoughCat = false;
			this.menuView.render(this.gameloop.currentGame);
		}
		click(X,Y){
			if(Y>(210/667*h) && Y<(505/667*h)){	
				if(X<275/320*w){
					if(Y<285/560*h && Y>200/667*h){	
						this.switchToGameState();		
					}
					else if(Y<350/560*h){
						this.switchToCategoriesState();	
					}
					else if(Y<435/560*h){
						this.gameloop.switchGameModes();
					}
					else if(Y<505/560*h){
						//how to play
					}
				}
			}
		 }
		 
		 
		switchStates(){
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
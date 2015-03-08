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
			this.notEnoughCat = false;
			this.menuView.render(this.gameloop.currentGame);
		}
		click(X,Y){
			
			if(X<2*this.width/3){
				if(Y<2*this.height/7 && Y>this.height/7){
					this.switchToGameState();		
				}
				else if(Y<3*this.height/7 && Y>2*this.height/7){
					this.switchToCategoriesState();	
				}
				else if(Y<4*this.height/7 && Y>3*this.height/7){
					this.gameloop.switchGameModes();
				}
				else if(Y<5*this.height/7 && Y>4*this.height/7){
					//how to play
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
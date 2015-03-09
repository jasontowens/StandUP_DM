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
				if(Y<275*this.height/667 && Y>225*this.height/667){
					this.switchToGameState();		
				}
				else if(Y<325*this.height/667 && Y>275*this.height/667){
					this.switchToCategoriesState();	
				}
				else if(Y<475*this.height/667 && Y>330*this.height/667){
					this.gameloop.switchGameModes();
				}
				else if(Y<430*this.height/667 && Y>480*this.height/667){
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
module Game{
	export class Resources{
	
		menu_background1 = new Image();
		menu_background2 = new Image();
		game_background = new Image();
		game_background2 = new Image();
		forehead = new Image();
		pass = new Image();
		roundPicking = new Image();
		correct = new Image();
		endGame_background = new Image();
		rightArrow = new Image();
		leftArrow = new Image();
		rightArrowPressed = new Image();
		leftArrowPressed = new Image();
		category_background = new Image();
		category_background1 = new Image();
		noCatSel = new Image();
		balloon = new Image();
		kids = new Image();
		
		constructor(){
			this.menu_background1.src = "Menu.png";
			this.menu_background2.src = "Menu2.png";
			this.game_background.src = "InGame.png";
			this.game_background2.src = "InGame2.png";
			this.roundPicking.src = "RoundPickingBackground.png";
			this.forehead.src = "forehead.png";
			this.pass.src = "pass.png";
			this.correct.src = "correct.png";
			this.endGame_background.src = "endGame.png";
			this.rightArrow.src ="rightArrow.png";
			this.leftArrow.src = "leftArrow.png";
			this.rightArrowPressed.src = "rightArrowClicked.png";
			this.leftArrowPressed.src = "leftArrowClicked.png";
			this.category_background.src = "money.png";
			this.category_background1.src = "categories_foreground_menuselected.png";
			this.noCatSel.src = "noCategorySelected.png";
			this.balloon.src = "balloon.png";
			this.kids.src = "kids.png";
		
		}
		hasLoaded():boolean{
		 	return (this.menu_background1.complete && 
		 	this.menu_background2.complete && 
		 	this.game_background.complete && 
		 	this.game_background2.complete &&
			this.roundPicking.complete &&
			this.forehead.complete && 
			this.pass.complete && 
			this.correct.complete && 
			this.endGame_background.complete && 
			this.rightArrow.complete &&
			this.rightArrowPressed.complete && 
			this.leftArrowPressed.complete && 
			this.category_background.complete &&
			this.category_background1.complete &&
			this.noCatSel.complete &&
			this.balloon.complete &&
			this.kids.complete)
		}
		
	}
}
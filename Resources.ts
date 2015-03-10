module Game{
	export class Resources{
	
		menu_background1 = new Image();
		menu_background2 = new Image();
		buttons = new Image();
		buttons2 = new Image();
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
		orangeBackground = new Image();
		stand = new Image();
		slime = new Image();
		blueBackground = new Image();
		
		nextRoundButton = new Image();
		
		constructor(){
			this.menu_background1.src = "thenewMenu.png";
			this.menu_background2.src = "thenewMenu2.png";
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
			this.orangeBackground.src = "orangeBack.png";
			this.stand.src = "stand.png";
			this.slime.src = "slime.png";
			this.blueBackground.src = "blueBackground.png";
			this.buttons.src = "buttons.png";
			this.buttons2.src = "buttons2.png";
			this.nextRoundButton.src = "NextRound.png";
		
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
			this.orangeBackground.complete &&
			this.stand.complete &&
			this.blueBackground.complete &&
			this.slime.complete &&
			this.kids.complete &&
			this.buttons.complete &&
			this.buttons2.complete &&
			this.nextRoundButton.complete);
		}
		
	}
}
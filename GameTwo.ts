module Game{
	export class GameTwo extends Model{
	
		teamOneScore: number;
		teamTwoScore: number;
		chosenCategories:boolean[];
		Categories:string[];
		currentItem:string;
		
		
		constructor(){
			super();
		}
		/*
		setGameView(gv){
			this.gameView = gv
		}
		*/
		
	}
}
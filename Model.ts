module Game{
	export class Model{
	
		chosenCategories:boolean[];
		Categories:string[];//decide which ones are which
		currentItem:string;
		Items:string[];
		size:number;
		currentItemNumber:number;
		
		constructor(){
			this.generateItems();
		}
		generateItems(){
			this.Items = ["hidjnfoda fnoiqwebfo sada" ,"bye", "yo"];
			this.Categories = ["yo mama" ,"butt", "ass"];
			this.size = 3;
		}
	}
}
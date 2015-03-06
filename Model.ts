module Game{
	export class Model{
	
		chosenCategories:boolean[];
		Categories:string[][];//decide which ones are which
		currentItem:string;
		size:number;
		
		playedWords:string[];
		correctPlayedWords:boolean[];
		gameOver:boolean;
		
		currentWordCategory:number;
		
		constructor(){
			this.chosenCategories = [];
			this.playedWords = [];
			this.correctPlayedWords = [];
			this.generateItems();
			this.gameOver = false;
			
		}
		generateItems(){
			//VERY IMPORTANT: FIRST ELEMENT IN EACH CATEGORY IS THE NAME OF THE CATEGORY, DO NOT PRINT IT
			this.Categories= 
				[
					/* 0: College Teams*/ ["College Teams","Florida Gators","LSU Tigers","Tenessee Volunteers","Georgia Bulldogs","Oregon Ducks","Florida State Seminoles","Arkansas Razorbacks",
					"Alabama Crimson Tide","South Carolina Gamecocks","Ole Miss Rebels","Kentucky Wildcats","Texas A&M Aggies","Michigan Wolverines","Michigan State Spartans",
					"Texas Longhorns","Ohio State Buckeyes","Notre Dame FIghting Irish","Duke Blue Devils","Nebraska Cornhuskers","TCU Horned Frogs"],
					
					/* 1: dances*/["Dances","Macarena", "Teach me how to dougie", "Cat Daddy", "Cha Cha Slide", "Cupid Shuffle", "Thriller", "Gangnam Style"],
					
					/* 2: ESPN*/["ESPN","Erin Andrews", "Tim Tebow", "Soccer", "Football", "Baseball", "Softball", "Tennis", "Champion", "Hockey", "Basketball", "College Gameday", "The Gators", "Referee", "Yellow Card", "Red Card", "Goalie", "First Down", "Kicker", "Defense", "Offense", "Punt", "Quarterback", "Michael Jordan", "Sideline", "Cheerleaders", "Halftime Show", "Cleats", "Superbowl", "National Championship", "3 Strikes You’re Out", "Foul Ball", "Heisman", "Overtime", "Sweat", "Tackle", "Wide Receiver", "Striker", "Scoreboard", "Head Coach", "Conditioning", "Two-a-Days", "Gatorade", "Practice Makes Perfect", "Jersey", "Puck", "Kick Off", "Rain Delay", "Fans", "Underdog", "Comeback", "Undefeated Season", "Marching Band", "Umpire", "Nike", "3-pointer", "Dribble", "Homerun", "Pitcher", "Stadium", "Under Armor", "Dazzlers", "Time Out", "Fantasy Football", "Just Do It", "Get Your Head in the Game", "Rivalry", "Sponsor", "Tie", "Semi-Finals"],

					/* 3: Medieval*/ ["Medieval","Chivalry", "Jousting", "Dark Ages", "Sword in the Stone", "Duke", "Knight", "Renaissance", "Melee", "Gauntlet", "Chalice", "Alms", "Prince", "Queen", "King", "Princess", "Jester", "Feast", "Cannon", "Chainmail", "Goblet", "Armor", "Axe", "Bow", "Arrow", "Duel", "Castle", "Helmet"],

					/* 4: NickeloDM*/ ["NickeloDM","Dancing Lobsters", "Orange Soda", "Penelope", "Totally Kyle", "Crazy Courtney", "The Girls Room", "All That", "Tommy Pickles", "Cynthia & Angelica", "Phil & Lil", "Chuckie", "Football Head", "Helga Patnki", "Orange Blimp", "Slime Time Live", "Ren & Shrimpy", "Keenan & Kel", "Are You Afraid of the Dark?", "Ahh Real Monsters", "Spongebob", "The Amanda Show", "The Wild Thornberries", "Rocket Power", "Cat Dog", "Angry Beavers", "Fairly Odd Parents", "Legends of the Hidden Temple"],

					/* 5: Dr. Seuss*/ ["Dr. Seuss","The Lorax", "Cat in the Hat", "Green Eggs and Ham", "Andy Lou Who", "The Grinch", "Thing 1 and Thing 2", "Truffala Trees", "Fish", "39 and ½ Foot Pole", "Horton", "Theodore Geisel", "Star-bellied Sneetch", "Sam I am", "Max"],

					/* 6: Morale Royale*/ ["Morale Royale","Captain", "Karaoke", "Royal Caribbean", "Carnival", "Buffet", "Casino", "Pool Deck", "Formal Night", "Anchor", "Port", "Dock", "Excursion", "Cabin", "Stateroom", "Putt-Putt Golf", "Life Vest", "Titanic", "Comedy Show", "Beach", "Towel", "Swimsuit", "Sunglasses", "Sunscreen", "Spa", "Massage", "Jacuzzi", "Night Club", "Newlyweds", "Vacation", "Bahamas", "Cazumel", "Hair Braiding", "Kids Club", "Tourists", "Sandals", "Soft Serve Ice Cream"],

					/* 7: Dance ‘Merica*/ ["Dance 'Merica","Statue of Liberty", "Bald Eagle", "American Flag", "Fireworks", "Obama", "Golden Retriever", "Football", "Baseball", "BBQ", "Mount Rushmore", "Hot Dog", "Frat", "Miss America", "Shucking Corn", "McDonalds", "Jorts", "Oprah", "George Washington", "Beyonce", "Thanksgiving", "4th of July", "Black Friday", "Pearl Harbor", "Great Depression", "Civil War", "Prohibition", "Michael Jackson", "Forrest Gump", "United States", "Louis and Clark", "Sacagawea", "White House", "Grand Canyon", "Niagra Falls", "Declaration of Independence", "Martin Luther King Jr", "Secret Service", "The Kennedys", "NYPD", "FBI", "CIA", "Coca Cola", "New York", "Washington D.C."]

				];
			for(var i=0; i!= this.Categories.length; ++i){
				this.chosenCategories[i] = true;
			}
			//this.Items = ["hidjnfoda fnoiqwebfo sada" ,"bye", "yo"];
			this.size = this.Categories.length;
		}
		changeWord(){
			var currentCategory = this.randomUsableCategory();
			this.currentWordCategory = currentCategory;
			this.currentItem = this.randomWordInCategory(currentCategory);//category, phrase in category
			
			for(var i=0; i != this.playedWords.length; ++i){
				if(this.playedWords[i]){
					if(this.currentItem == this.playedWords[i]){
						this.changeWord();
						break;
					}
				}
				else{
					console.log("game.playedWords[i] not found");
				}
			}
		 }
		 
		randomUsableCategory(){	//returns an int
			var usableCategories=0;
			for(var i=0; i!=this.chosenCategories.length; ++i){
				if(this.chosenCategories[i]==true){
					++usableCategories;
				}
			}
			//generate random number from 0 to usableCategories -1
			if(usableCategories > 0){	//need at least one category
				var returnCategory =0;
				var categoryToUse = Math.floor((Math.random() * usableCategories)); //note: this is OF the usable categories, still need to skip unusable categories
				for( var i=0; i != categoryToUse; ++i){
					if(this.chosenCategories[i] == false){
						++categoryToUse; // increments forloop check as it encounters an unused category
					}
				}
				return categoryToUse; //is an int
			}
		 }
		 changeChosenCat(i:number){
		 	if(this.chosenCategories[i]){
		 		this.chosenCategories[i] = false;
		 	}else{
		 		this.chosenCategories[i] = true;
		 	}
		 
		 }
		 randomWordInCategory(currentCategory){	//returns a random word in give category (parameter is int)
			var sizeOfCategory = this.Categories[currentCategory].length;
			var currentItemNumber = Math.floor((Math.random() * sizeOfCategory-1))+1;//location in select category of used word, should not be 0 because of category name
			
			return this.Categories[currentCategory][currentItemNumber];
		 }
		 
	}
}
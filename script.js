	

	
	//var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var c = document.getElementById('canvas');
	var ctx = c.getContext('2d');
	
	//declaring image variables	

	var w = canvas.width;
	var h = canvas.height;
	var inMenu = true;
	var inGame = false;

	//global categories arrays
	var usedArrays = [1];
	var arrays;
	
	var timeSpeed = 1000; // 1 means time is correct, .25 means program is running 1/4 speed it should be
	var game = new Object();
	game.gameMode;
	game.category;
	
	/*
	var game = function(){
		this.gameMode = new gameMode;
		this.category = new category;
		this.gameState = new gameState;

	}
	
	game.startGame.prototype = function(){
		kdjfkasjf;
	}
	
	var gameMode = function(){
		this.currentGameMode;
	}
	var category = function(){
		this.currentCategory;
	}
	
	*/
	 var isMobile = false; //boolean for whether or not the device is mobile
	 var mobileClickX = 0; 
	 var mobileClickY = 0;
	 var touchobj;
	

window.onload = function(){
		var cs = new CategoryScreenController(game);
		//var button1 = new Button("hellobitch",4,4,1);
		preloadImagesAndVariables();
		
		//loadMenu();
		//listenForFingers();
		
	};		//starts everything



function preloadImagesAndVariables(){
	game.displayPassFailTime=false;
	game.originalTimeOfRound=30;
	game.passNotCorrect=false;
	
	game.playedWords = [];
	
	game.gameMode = 1; // 1 is head's up, 2 is not in any way legally similar to catchphrase
	game.team1Score = 0;
	game.team2Score = 0;
	game.activeTeam = 1; //is 1 or 2, denotes which team is currently playing
	game.team1Time = 0;
	game.team2Time = 0;
	
	
	game.menu_background = new Image();							//menu background
	game.menu_background.src = "Menu.png";
	
	game.menu_background2 = new Image();
	game.menu_background2.src = "Menu2.png";
	
	
	game.inGame_background = new Image();						//standard in-game background
	game.inGame_background.src = "InGame.png";
	game.inGame_background2 = new Image();						//mode2 in-game background
	game.inGame_background2.src = "InGame2.png";
		
	game.endGame_background=new Image();
	game.endGame_background.src= "endGame.png";	
		
	//game.numOfCategories=2;
	//game.categoriesBoolArray = [1,1];
	instantiateCategoriesArray();
	
	game.buttonsArray = [];
	instantiateButtonsArray();
	
	game.pass_background = new Image();
	game.pass_background.src="pass.png";
	
	game.correct_background = new Image();
	game.correct_background.src="correct.png";
	
	game.forehead_background = new Image();
	game.forehead_background.src="forehead.png";
	
	game.playedWords= [];
	
	game.usedCategories = []; //instantiate
	for(i=0; i != game.categoriesArray.length; ++i){
		game.usedCategories.push(1);	//all categories start off usable
	}
	//game.usedArrays = [1,1,1,1,1,1,1,1];	
	
	
	game.menu_background.onload = function(){
		loadMenu();
		listenForFingers();
	};
}

function instantiateButtonsArray(){
	for(i=0; i!=game.categoriesArray.length; ++i){
		game.buttonsArray.push([game.categoriesArray[i][0], true]);
	}	
}

function instantiateCategoriesArray(){

	//VERY IMPORTANT: FIRST ELEMENT IN EACH CATEGORY IS THE NAME OF THE CATEGORY, DO NOT PRINT IT
	game.categoriesArray= 
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
}	

	
function listenForFingers(){ 
 c.addEventListener('touchstart', mobileClick, false);   
}

function mobileClick(e){
  isMobile = true;
  touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
  /*if(!GameOver){
    e.preventDefault();
  }*/
  var mobileClickX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
  mobileClickX = mobileClickX - (window.innerWidth-canvas.width)/2;
  var mobileClickY = parseInt(touchobj.clientY);
  mobileClickY = mobileClickY - 25;
  
  
  if(inMenu){
	menuClick(mobileClickX, mobileClickY);
  }
  else if(inGame){
	gameClick(mobileClickX, mobileClickY);
  }
  else{
	endClick(mobileClickX, mobileClickY);
  }
  
  
}

function menuClick(X,Y){
	if(Y>(210/667*h) && Y<(505/667*h)){	//first button
		c.removeEventListener("click", menuClick);
		
		if(X<275/320*w){
			if(Y<285/560*h && Y>200/667*h){	
				//start game using currently selected categories and  
				startGame();
				inGame = true;
				inMenu = false;				
			}
			else if(Y<350/560*h){
				//categories
				//display categories
				//tell the game which categorie is chosen
				//game.category 
			}
			else if(Y<435/560*h){
				if(game.gameMode == 1){
					game.gameMode = 2;
					ctx.drawImage(game.menu_background2, 0,0,w,h);
				}
				else{
					ctx.drawImage(game.menu_background, 0,0,w,h);
					game.gameMode = 1;
				}
				//game modes
			}
			else if(Y<505/560*h){
				//how to play
			}
		}
	}
 }
 
 function gameModes(){
	ctx.drawImage(game.gameMode_background, 0,0,w,h);
	
 }

function gameClick(mobileClickX, mobileClickY){
	if(game.gameMode == 2){
		if(mobileClickX > 250/320 * w && mobileClickX < 300/320*w){ //Clicking pass or correct buttons
			if(mobileClickY > 290/580*h){
				game.displayPassFail = true;
				game.passNotCorrect= true;
			}
			else if(mobileClickY < 290/580*h){
				game.displayPassFail = true;
				game.passNotCorrect= false;
			}
			else{
				game.displayPassFail =false;
			}
		}
		else{
			game.displayPassFail =false;
		}
	}
}

function fixTime(firstTime){
	var d = new Date();
	var s = d.getTime();
	
	if(firstTime == 0)
		setTimeout(function(){ fixTime(s); } ,1000);
	else
		timeSpeed = 1000/(s - firstTime);
}

function loadMenu(){
	fixTime(0);
    Menu();     
    //updateScore();
}

function Menu(){ 
  //clearCanvas();
  inMenu = true;
  ctx.drawImage(game.menu_background, 0, 0, w, h); 
  c.addEventListener("click", menuClick); 
}

 function resetGameVariables(){ //for stuff that needs to be reset every game
	delete game.playedWords;
	game.playedWords = [];
 }
 
 function startGame(){
	var originalTimeOfRound = 30;//in seconds
	
	game.team1Score = 0;
	game.team2Score = 0;	
	game.team1Time = 0;
	game.team2Time = 0;
	
	resetGameVariables();
	
	
	clearCanvas();
	ctx.drawImage(game.forehead_background, 0,0,w,h);
	
	if(game.gameRound == 2)
		game.displayPassFail = false;
	
	if(game.displayPassFail)//if device isn't oriented properly (i.e. on forehead)
		setTimeout(function(){startGame();}, 100);
	else{	
		changeWord(); //initializes first word			
		countdown(4000);
	}
	
	
 }
  
 function countdown(timeToGame){	//displays the countdown before game starts
	clearCanvas();
	ctx.drawImage(game.inGame_background, 0,0,w,h);
	ctx.font         = "bold 80px AG Book Rounded";
	ctx.textBaseline = 'bottom';
	ctx.textAlign = 'center';
		
	rotateContext();   
	ctx.fillStyle = "blue";
  
	if(timeToGame>0){
		if(timeToGame > 3000){
			var getReady = "Get Ready!";
			wrapText(ctx, getReady, h/4, w/1.55, h, 89);
		}
		else{
			var numString = Math.floor(timeToGame/1000+1).toString();
			wrapText(ctx, numString, h/4, w/1.55, h, 89);
		}
		ctx.restore();	
		var f = function(){countdown(timeToGame-100);};
		setTimeout(f, 100/timeSpeed);
	}
	else{
		ctx.restore();	//for rotateContext();	
		gameLoop(60); //takes number of seconds in game
	}
 }
  
 function drawPassFailScreen(timeOfRound){
	if(game.displayPassFailTime == 0){	//should only be zero first time method is called
		game.displayPassFailTime=1000;
	}
	if(game.displayPassFailTime == 1000){ //only draw once
		clearCanvas();
		if(game.passNotCorrect){
			ctx.drawImage(game.pass_background, 0,0,w,h);
		}
		else{
			ctx.drawImage(game.correct_background, 0,0,w,h);
		}
		
	}
	
	game.displayPassFailTime -= 10;		//decrementing time left for displaying pass/fail
	
	if(game.gameMode == 2){				//in game mode 2, we don't need the delay
		game.displayPassFailTime = 0;
		game.displayPassFail = false;
	}
	if(game.displayPassFailTime <= 0 && game.displayPassFail == false){
		//game.displayPassFail = false;//stops this method from being called again		
		saveCurrentWord(game.passNotCorrect); //for displaying at end of game.In this if statement so it only calls once.		
		changeWord();	//when pass/fail screen disappears, there should be a new word
		if(game.gameMode == 2 ){
			if(!game.passNotCorrect)
				changeActiveTeam();
		}
		gameLoop(timeOfRound);
	}
	else{
		setTimeout(function(){drawPassFailScreen(timeOfRound);	}, 10);		
	}
 }
 
 function changeActiveTeam(){
	game.activeTeam = ((game.activeTeam) % 2) + 1;
 }
 
 function changeWord(){
	var currentCategory = randomUsableCategory();
	game.currentWordCategory = currentCategory;
	game.currentWord = randomWordInCategory(currentCategory);//category, phrase in category
	
	for(i=0; i != game.playedWords.length; ++i){
		if(game.playedWords[i]){
			if(game.currentWord == game.playedWords[i][0]){
				changeWord();
				break;
			}
		}
		else{
			console.log("game.playedWords[i] not found");
		}
	}
 }
 
 function randomUsableCategory(){	//returns an int
	var usableCategories=0;
	for(i=0; i!=game.usedCategories.length; ++i){
		if(game.usedCategories[i]==1){
			++usableCategories;
		}
	}
	//generate random number from 0 to usableCategories -1
	if(usableCategories > 0){	//need at least one category
		var returnCategory =0;
		var categoryToUse = Math.floor((Math.random() * usableCategories)); //note: this is OF the usable categories, still need to skip unusable categories
		for( i=0; i != categoryToUse; ++i){
			if(game.usedCategories[i] == 0){
				++categoryToUse; // increments forloop check as it encounters an unused category
			}
		}
		return categoryToUse; //is an int
	}
 }
 
 function randomWordInCategory(currentCategory){	//returns a random word in give category (parameter is int)
	var sizeOfCategory = game.categoriesArray[currentCategory].length;
	game.currentWordLocation = Math.floor((Math.random() * sizeOfCategory-1))+1;//location in select category of used word, should not be 0 because of category name
	
	return game.categoriesArray[currentCategory][game.currentWordLocation];
 }
 
 function saveCurrentWord(passNotCorrect){
	game.playedWords.push([game.currentWord, passNotCorrect]);
 }
 
 function gameLoop(timeOfRound,lastTime){			
	
	if(timeOfRound<=0){
		inGame=false;
		gameOver();
	}
	if(inGame){
		if(game.displayPassFail){	//for displaying pass/fail screen when tilting
			drawPassFailScreen(timeOfRound);			
		}
		else{
			clearCanvas();
			if(game.gameMode == 1)
				ctx.drawImage(game.inGame_background, 0,0,w,h);
			else
				ctx.drawImage(game.inGame_background2,0,0,w,h);
			printWord();		
			if(game.gameMode == 1) //in game mode 2, time is shown additively
				printTime(timeOfRound);
			if(game.gameMode == 2){
				Mode2();
			}
			
			var f = function(){gameLoop(timeOfRound-.1);};
			setTimeout(f, 100 / timeSpeed);
		}		
	}
 }
 
 function Mode2(){ //only gets called in game mode 2
	if(game.activeTeam == 1){
		game.team1Time += .1;
	}
	else{
		game.team2Time += .1;
	}
	printTeamTimes();
 }
 
 function printTeamTimes(){
	  ctx.font         = "bold 30px Arial";
	  ctx.textBaseline = 'bottom';
	  ctx.textAlign = 'center';
		
	  ctx.save();
	  ctx.translate(0,h*3/4); //new origin
	  ctx.rotate(-Math.PI / 2);  
	  
	  if(game.activeTeam == 1){
		ctx.fillStyle = "white";
		ctx.fillText( 'TEAM 1 TIME: ' + Math.floor(game.team1Time*10)/10, 0, w*3/16); 
		ctx.fillStyle = "blue";
		ctx.fillText( 'TEAM 2 TIME: ' +  Math.floor(game.team2Time*10)/10, 2*h/4, w*3/16); 
	  }
	  else{
		  ctx.fillStyle = "blue";
		  ctx.fillText( 'TEAM 1 TIME: ' +  Math.floor(game.team1Time*10)/10, 0, w*3/16); 
		  ctx.fillStyle = "white";
		  ctx.fillText( 'TEAM 2 TIME: ' +  Math.floor(game.team2Time*10)/10, 2*h/4, w*3/16); 
	  }
	  ctx.restore();
 }
  
 function rotateContext(){ //essentially rotates context so that you can write text sideways.
	ctx.save();
	ctx.translate(0,h*3/4); //new origin
	ctx.rotate(-Math.PI / 2); //rotate counter-clockwise
 }
 
 function gameOver(){
	ctx.font         = "bold 40px AG Book Rounded";	
	c.addEventListener("click", endClick); 
	printPlayedWords(0,0);		
	if(gameMode==2)
		printTeamScores();
}

function endClick(X,Y){
	if(Y>h/3)
		Menu();
}
 
 function printPlayedWords(i){//remember playedWords stores location and passNotCorrect Bool
		if(!inMenu){	//because you can press leave button before printing is finished (don't want text printing on top of menu screen)
			ctx.drawImage(game.endGame_background, 0,0,w,h);
			
			var numCorrect = 0;
			var shiftUp = 0;
			if(i>14)
				shiftUp = i - 14;
			for( ii = 0; ii <= i; ++ii){ 	
				if(game.playedWords[ii][1]){	//if word was passed
					ctx.fillStyle = "red";		
				}
				else{
					numCorrect++;
					ctx.fillStyle = "green";
				}
				ctx.font = "bold 20px AG Book Rounded";
				ctx.fillText(game.playedWords[ii][0], w/2, h*1/4+ii*23 - shiftUp *23);
			}
			ctx.font = "bold 40px AG Book Rounded";
			ctx.fillStyle = "white";
			ctx.fillText((numCorrect).toString(), w/2, h*1/8);
			if(i<game.playedWords.length-1)
				setTimeout(function(){printPlayedWords(i+1);	}, 1000);		
				
		}
}
 
 
 function clearCanvas(){
	ctx.clearRect(0, 0, w, h);
 }
 
 function printTime(timeLeft){
  ctx.font         = "bold 30px Arial";
  ctx.textBaseline = 'bottom';
  ctx.textAlign = 'center';
    
  ctx.save();
  ctx.translate(0,h*3/4); //new origin
  ctx.rotate(-Math.PI / 2);  
  ctx.fillStyle = "white";
  ctx.fillText( 'TIME REMAINING: ' + Math.floor(timeLeft), h/4, w*15/16); 
  ctx.restore();
  
 }
 
 window.ondeviceorientation = function(event) {
  //game.alpha = Math.round(event.alpha);
  //game.beta = Math.round(event.beta);
  game.gamma = Math.round(event.gamma);
  
  if(game.gameMode == 1){
	  if (game.gamma > 125){
		game.displayPassFail = true;
		game.passNotCorrect= false;
	  }
	  else if(game.gamma< 55){
		game.displayPassFail = true;
		game.passNotCorrect= true;
	  }
	  else{
		game.displayPassFail = false;
	  }
  }
}
 
 function printWord(){
  ctx.font         = "bold 80px AG Book Rounded";
  ctx.textBaseline = 'bottom';
  ctx.textAlign = 'center';
    
  rotateContext(); 
  ctx.fillStyle = "blue";
 // ctx.fillText( 'alpha: '+alpha, h/4, w/2); 
 // ctx.fillText( 'beta: '+beta, h/4, w/2); 
  
  //ctx.fillText( game.currentWordCategory, h/4, w/2); 
  var textString = game.currentWord,
      textWidth = ctx.measureText(textString ).width;

	wrapText(ctx, textString, h/4, w/1.55, h, 89, "bold 60px AG Book Rounded");
	//ctx.fillText(textString , (canvas.width/2) - (textWidth / 2), w/2);
  
  
  //ctx.fillText( , h/4, w/2); 
  // ctx.fillText( game.categoriesArray[game.currentWordCategory][game.currentWordLocation], h/4, w/2); 
  ctx.restore();
 }
 
 function wrapTextEnd(context, text, x, y, maxWidth, lineHeight, font) {
        var cars = text.split("\n");
		var lengthgr = false;
		if(text.length > 19 ){
			lengthgr = true;
			context.font = font;
			lineHeight = 60;
		}
		
        for (var ii = 0; ii < cars.length; ii++) {

            var line = "";
            var words = cars[ii].split(" ");
			var isMultipleLines;
            for (var n = 0; n < words.length; n++) {
				isMultipleLines = false;
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > maxWidth) {
					isMultipleLines = true;
					//y = y/1.25;
                    context.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
				ctx.fillText(line, x, y);
				y += lineHeight;
        }
		return isMultipleLines;
}
 
 function wrapText(context, text, x, y, maxWidth, lineHeight, font) {
        var cars = text.split("\n");
		var lengthgr = false;
		if(text.length > 19 ){
			lengthgr = true;
			context.font = font;
			lineHeight = 60;
		}
		
        for (var ii = 0; ii < cars.length; ii++) {

            var line = "";
            var words = cars[ii].split(" ");
			var isMultipleLines;
            for (var n = 0; n < words.length; n++) {
				isMultipleLines = false;
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > maxWidth) {
					isMultipleLines = true;
					y = y/1.25;
                    context.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
				ctx.fillText(line, x, y);
				y += lineHeight;
        }
		return isMultipleLines;
}

function createButtons(){
}
 
var Button = function(text,width,height,buttonNumber){
	this.text = text;
	this.width = width;
	this.height = height;
	this.buttonNumber = buttonNumber
	this.makePretty();
	
};

Button.prototype.makePretty = function(){
	var baseFont = "px Arial";
	var i = 20;
	var iString = i.toString();
	var fontSize = iString.concat(baseFont);
	ctx.font = fontSize;
	ctx.fillText(this.text,10,10);
}

var CategoryScreen = function(){


}

CategoryScreen.prototype.displayButtons = function(){


}
/*
function hello(){
	console.log("hello");
}
function goodbye(){
	console.log("goodbye");
}
*/
var CategoryScreenController = function(game){
	this.game = game;
	ctx.font = "100px Arial";
	ctx.fillText("hi",10,10);
	c.addEventListener("touchstart",this.Scrolling);
	c.addEventListener("touchend",this.takeInputAndUpdate);
}


CategoryScreenController.prototype.Scrolling = function(){
	console.log("hello");
}
CategoryScreenController.prototype.takeInputAndUpdate = function(){
	console.log("goodbye");
}


 
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
 


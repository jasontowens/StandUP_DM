	
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var c = document.getElementById('canvas');
	var ctx = c.getContext('2d');
	
	//declaring image variables	

	var w = canvas.width;
	var h = canvas.height;
	var inMenu = true;

	//global categories arrays
	var usedArrays = [1];
	var arrays;
	
	

	window.onload = function(){
		preloadImagesAndVariables();
		//loadMenu();
		//listenForFingers();
		
	};		//starts everything

var game = new Object();
 	
function preloadImagesAndVariables(){
	game.displayPassFailTime=false;
	game.originalTimeOfRound=30;
	game.passNotCorrect=false;

	game.menu_background = new Image();							//menu background
	game.menu_background.src = "Menu.png";
	
	
	game.inGame_background = new Image();						//standard in-game background
	game.inGame_background.src = "InGame.png";
		
	game.endGame_background=new Image();
	game.endGame_background.src= "endGame.png";	
		
	game.numOfCategories=2;
	game.categoriesBoolArray = [1,1];
	instantiateCategoriesArray();
	
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

function instantiateCategoriesArray(){
	game.categoriesArray= 
		[
		/* 0: College Teams*/ ["Florida Gators","LSU Tigers","Tenessee Volunteers","Georgia Bulldogs","Oregon Ducks","Florida State Seminoles","Arkansas Razorbacks",
		"Alabama Crimson Tide","South Carolina Gamecocks","Ole Miss Rebels","Kentucky Wildcats","Texas A&M Aggies","Michigan Wolverines","Michigan State Spartans",
		"Texas Longhorns","Ohio State Buckeyes","Notre Dame FIghting Irish","Duke Blue Devils","Nebraska Cornhuskers","TCU Horned Frogs"],
		/* 1: dances*/["Macarena", "Teach me how to dougie", "Cat Daddy", "Cha Cha Slide", "Cupid Shuffle", "Thriller", "Gangnam Style"],
		/* 2: ESPN*/["Erin Andrews", "Tim Tebow", "Soccer", "Football", "Baseball", "Softball", "Tennis", "Champion", "Hockey", "Basketball", "College Gameday", "The Gators", "Referee", "Yellow Card", "Red Card", "Goalie", "First Down", "Kicker", "Defense", "Offense", "Punt", "Quarterback", "Michael Jordan", "Sideline", "Cheerleaders", "Halftime Show", "Cleats", "Superbowl", "National Championship", "3 Strikes You’re Out", "Foul Ball", "Heisman", "Overtime", "Sweat", "Tackle", "Wide Receiver", "Striker", "Scoreboard", "Head Coach", "Conditioning", "Two-a-Days", "Gatorade", "Practice Makes Perfect", "Jersey", "Puck", "Kick Off", "Rain Delay", "Fans", "Underdog", "Comeback", "Undefeated Season", "Marching Band", "Umpire", "Nike", "3-pointer", "Dribble", "Homerun", "Pitcher", "Stadium", "Under Armor", "Dazzlers", "Time Out", "Fantasy Football", "Just Do It", "Get Your Head in the Game", "Rivalry", "Sponsor", "Tie", "Semi-Finals"],

		/* 3: Medieval*/ ["Chivalry", "Jousting", "Dark Ages", "Sword in the Stone", "Duke", "Knight", "Renaissance", "Melee", "Gauntlet", "Chalice", "Alms", "Prince", "Queen", "King", "Princess", "Jester", "Feast", "Cannon", "Chainmail", "Goblet", "Armor", "Axe", "Bow", "Arrow", "Duel", "Castle", "Helmet"],

		/* 4: NickeloDM*/ ["Dancing Lobsters", "Orange Soda", "Penelope", "Totally Kyle", "Crazy Courtney", "The Girls Room", "All That", "Tommy Pickles", "Cynthia & Angelica", "Phil & Lil", "Chuckie", "Football Head", "Helga Patnki", "Orange Blimp", "Slime Time Live", "Ren & Shrimpy", "Keenan & Kel", "Are You Afraid of the Dark?", "Ahh Real Monsters", "Spongebob", "The Amanda Show", "The Wild Thornberries", "Rocket Power", "Cat Dog", "Angry Beavers", "Fairly Odd Parents", "Legends of the Hidden Temple"],

		/* 5: Dr. Seuss*/ ["The Lorax", "Cat in the Hat", "Green Eggs and Ham", "Andy Lou Who", "The Grinch", "Thing 1 and Thing 2", "Truffala Trees", "Fish", "39 and ½ Foot Pole", "Horton", "Theodore Geisel", "Star-bellied Sneetch", "Sam I am", "Max"],

		/* 6: Morale Royale*/ ["Captain", "Karaoke", "Royal Caribbean", "Carnival", "Buffet", "Casino", "Pool Deck", "Formal Night", "Anchor", "Port", "Dock", "Excursion", "Cabin", "Stateroom", "Putt-Putt Golf", "Life Vest", "Titanic", "Comedy Show", "Beach", "Towel", "Swimsuit", "Sunglasses", "Sunscreen", "Spa", "Massage", "Jacuzzi", "Night Club", "Newlyweds", "Vacation", "Bahamas", "Cazumel", "Hair Braiding", "Kids Club", "Tourists", "Sandals", "Soft Serve Ice Cream"],

		/* 7: Dance ‘Merica*/ ["Statue of Liberty", "Bald Eagle", "American Flag", "Fireworks", "Obama", "Golden Retriever", "Football", "Baseball", "BBQ", "Mount Rushmore", "Hot Dog", "Frat", "Miss America", "Shucking Corn", "McDonalds", "Jorts", "Oprah", "George Washington", "Beyonce", "Thanksgiving", "4th of July", "Black Friday", "Pearl Harbor", "Great Depression", "Civil War", "Prohibition", "Michael Jackson", "Forrest Gump", "United States", "Louis and Clark", "Sacagawea", "White House", "Grand Canyon", "Niagra Falls", "Declaration of Independence", "Martin Luther King Jr", "Secret Service", "The Kennedys", "NYPD", "FBI", "CIA", "Coca Cola", "New York", "Washington D.C."]

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
			if(Y<285/667*h && Y>200/667*h){	
				//start game using currently selected categories and  
				startGame();
				inMenu = false;
				
			}
			else if(Y<360/667*h){
				//categories
			}
			else if(Y<435/667*h){
				inMenu = false;
				gameModes();
				//game modes
			}
			else if(Y<505/667*h){
				//how to play
			}
		}
	}
 }
 
 function gameModes

function gameClick(mobileClickX, mobileClickY){
	
}


function loadMenu(){
    Menu();     
    //updateScore();
}



function Menu(){ 
  //clearCanvas();
  inMenu = true;
  ctx.drawImage(game.menu_background, 0, 0, w, h); 
  c.addEventListener("click", menuClick); 
}




 var isMobile = false; //boolean for whether or not the device is mobile
 var mobileClickX = 0; 
 var mobileClickY = 0;
 var touchobj;
 
 
 function resetGameVariables(){ //for stuff that needs to be reset every game
	delete game.playedWords;
	game.playedWords = [];
 }
 
 function startGame(){
	inGame=true;
	var originalTimeOfRound = 30;//in seconds
	
	resetGameVariables();
	
	
	clearCanvas();
	ctx.drawImage(game.forehead_background, 0,0,w,h);
	
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
		var f = function(){countdown(timeToGame-10);};
		setTimeout(f, 10);
	}
	else{
		ctx.restore();	//for rotateContext();	
		gameLoop(10);
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
	if(game.displayPassFailTime <= 0 && game.displayPassFail == false){
		//game.displayPassFail = false;//stops this method from being called again		
		saveCurrentWord(game.passNotCorrect); //for displaying at end of game.In this if statement so it only calls once.		
		changeWord();	//when pass/fail screen disappears, there should be a new word
		gameLoop(timeOfRound);
	}
	else{
		setTimeout(function(){drawPassFailScreen(timeOfRound);	}, 10);		
	}
 }
 
 function changeWord(){
	var currentCategory = randomUsableCategory();
	game.currentWordCategory = currentCategory;
	game.currentWord = randomWordInCategory(currentCategory);//category, phrase in category
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
	game.currentWordLocation = Math.floor((Math.random() * sizeOfCategory));//location in select category of used word
	
	return game.categoriesArray[currentCategory][game.currentWordLocation];
 }
 
 function saveCurrentWord(passNotCorrect){
	game.playedWords.push([game.currentWord, passNotCorrect]);
 }
 
 function gameLoop(timeOfRound){		//this 
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
			ctx.drawImage(game.inGame_background, 0,0,w,h);
			printWord();		
			printTime(timeOfRound);
			var f = function(){gameLoop(timeOfRound-.01);};
			setTimeout(f, 10);
		}
		
		
		//gameLoop();
	}
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
	
}

function endClick(X,Y){
	if(Y>h/3)
		Menu();
}
 
 function printPlayedWords(i, ii){//remember playedWords stores location and passNotCorrect Bool
		if(!inMenu){	//because you can press leave button before printing is finished (don't want text printing on top of menu screen)
			ctx.drawImage(game.endGame_background, 0,0,w,h);
			
			var numCorrect =0;
			for( ii = 0; ii <= i; ++ii){ 	
				if(game.playedWords[ii][1]){	//if word was passed
					ctx.fillStyle = "red";		
				}
				else{
					numCorrect++;
					ctx.fillStyle = "green";
				}
				ctx.font = "bold 20px AG Book Rounded";
				ctx.fillText(game.playedWords[ii][0], w/2, h*1/4+ii*23);
			}
			ctx.font = "bold 40px AG Book Rounded";
			ctx.fillStyle = "white";
			ctx.fillText((i+1).toString(), w/2, h*1/8);
			if(i<game.playedWords.length-1)
				setTimeout(function(){printPlayedWords(i+1,ii);	}, 1000);		
				
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
 
 
 


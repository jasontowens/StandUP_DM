/// <reference path="GameLoop.ts" />
var Game;
(function (Game) {
    var MenuController = (function () {
        function MenuController(gameloop, canvas, width, height, model) {
            this.gameloop = gameloop;
            this.canvas = canvas;
            this.model = model;
        }
        MenuController.prototype.takeInput = function () {
            this.mobileClick = this.mobileClick.bind(this);
            this.canvas.addEventListener('click', this.mobileClick);
        };
        MenuController.prototype.mobileClick = function (e) {
            var mobileClickY = event.y;
            mobileClickY -= this.canvas.offsetTop;
            var mobileClickX = event.x;
            mobileClickX -= this.canvas.offsetLeft;
            this.click(mobileClickX, mobileClickY);
        };
        MenuController.prototype.click = function (X, Y) {
            if (Y > (210 / 667 * h) && Y < (505 / 667 * h)) {
                if (X < 275 / 320 * w) {
                    if (Y < 285 / 560 * h && Y > 200 / 667 * h) {
                        this.switchToGameState();
                    }
                    else if (Y < 350 / 560 * h) {
                        this.switchToCategoriesState();
                    }
                    else if (Y < 435 / 560 * h) {
                        this.gameloop.switchGameModes();
                    }
                    else if (Y < 505 / 560 * h) {
                    }
                }
            }
        };
        MenuController.prototype.switchStates = function () {
            this.canvas.removeEventListener('click', this.mobileClick);
            console.log("switching states");
        };
        MenuController.prototype.switchToGameState = function () {
            this.switchStates();
            this.gameloop.switchToGameState();
        };
        MenuController.prototype.switchToCategoriesState = function () {
            this.switchStates();
            this.gameloop.switchToCategoriesState();
        };
        return MenuController;
    })();
    Game.MenuController = MenuController;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var MenuView = (function () {
        function MenuView(context, width, height, gameMode) {
            this.menu_background1 = new Image();
            this.menu_background2 = new Image();
            this.menu_background1.src = "Menu.png";
            this.menu_background2.src = "Menu2.png";
            this.context = context;
            this.width = width;
            var self = this;
            this.height = height;
            this.menu_background1.onload = function () {
                self.render(gameMode);
            };
        }
        MenuView.prototype.render = function (gameMode) {
            var self = this;
            if (gameMode == 1) {
                self.context.drawImage(self.menu_background1, 0, 0, self.width, self.height);
            }
            else {
                self.context.drawImage(self.menu_background2, 0, 0, self.width, self.height);
            }
        };
        return MenuView;
    })();
    Game.MenuView = MenuView;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Model = (function () {
        function Model() {
            this.chosenCategories = [];
            this.playedWords = [];
            this.correctPlayedWords = [];
            this.generateItems();
            this.gameOver = false;
        }
        Model.prototype.generateItems = function () {
            //VERY IMPORTANT: FIRST ELEMENT IN EACH CATEGORY IS THE NAME OF THE CATEGORY, DO NOT PRINT IT
            this.Categories = [
                ["College Teams", "Florida Gators", "LSU Tigers", "Tenessee Volunteers", "Georgia Bulldogs", "Oregon Ducks", "Florida State Seminoles", "Arkansas Razorbacks", "Alabama Crimson Tide", "South Carolina Gamecocks", "Ole Miss Rebels", "Kentucky Wildcats", "Texas A&M Aggies", "Michigan Wolverines", "Michigan State Spartans", "Texas Longhorns", "Ohio State Buckeyes", "Notre Dame FIghting Irish", "Duke Blue Devils", "Nebraska Cornhuskers", "TCU Horned Frogs"],
                ["Dances", "Macarena", "Teach me how to dougie", "Cat Daddy", "Cha Cha Slide", "Cupid Shuffle", "Thriller", "Gangnam Style"],
                ["ESPN", "Erin Andrews", "Tim Tebow", "Soccer", "Football", "Baseball", "Softball", "Tennis", "Champion", "Hockey", "Basketball", "College Gameday", "The Gators", "Referee", "Yellow Card", "Red Card", "Goalie", "First Down", "Kicker", "Defense", "Offense", "Punt", "Quarterback", "Michael Jordan", "Sideline", "Cheerleaders", "Halftime Show", "Cleats", "Superbowl", "National Championship", "3 Strikes You’re Out", "Foul Ball", "Heisman", "Overtime", "Sweat", "Tackle", "Wide Receiver", "Striker", "Scoreboard", "Head Coach", "Conditioning", "Two-a-Days", "Gatorade", "Practice Makes Perfect", "Jersey", "Puck", "Kick Off", "Rain Delay", "Fans", "Underdog", "Comeback", "Undefeated Season", "Marching Band", "Umpire", "Nike", "3-pointer", "Dribble", "Homerun", "Pitcher", "Stadium", "Under Armor", "Dazzlers", "Time Out", "Fantasy Football", "Just Do It", "Get Your Head in the Game", "Rivalry", "Sponsor", "Tie", "Semi-Finals"],
                ["Medieval", "Chivalry", "Jousting", "Dark Ages", "Sword in the Stone", "Duke", "Knight", "Renaissance", "Melee", "Gauntlet", "Chalice", "Alms", "Prince", "Queen", "King", "Princess", "Jester", "Feast", "Cannon", "Chainmail", "Goblet", "Armor", "Axe", "Bow", "Arrow", "Duel", "Castle", "Helmet"],
                ["NickeloDM", "Dancing Lobsters", "Orange Soda", "Penelope", "Totally Kyle", "Crazy Courtney", "The Girls Room", "All That", "Tommy Pickles", "Cynthia & Angelica", "Phil & Lil", "Chuckie", "Football Head", "Helga Patnki", "Orange Blimp", "Slime Time Live", "Ren & Shrimpy", "Keenan & Kel", "Are You Afraid of the Dark?", "Ahh Real Monsters", "Spongebob", "The Amanda Show", "The Wild Thornberries", "Rocket Power", "Cat Dog", "Angry Beavers", "Fairly Odd Parents", "Legends of the Hidden Temple"],
                ["Dr. Seuss", "The Lorax", "Cat in the Hat", "Green Eggs and Ham", "Andy Lou Who", "The Grinch", "Thing 1 and Thing 2", "Truffala Trees", "Fish", "39 and ½ Foot Pole", "Horton", "Theodore Geisel", "Star-bellied Sneetch", "Sam I am", "Max"],
                ["Morale Royale", "Captain", "Karaoke", "Royal Caribbean", "Carnival", "Buffet", "Casino", "Pool Deck", "Formal Night", "Anchor", "Port", "Dock", "Excursion", "Cabin", "Stateroom", "Putt-Putt Golf", "Life Vest", "Titanic", "Comedy Show", "Beach", "Towel", "Swimsuit", "Sunglasses", "Sunscreen", "Spa", "Massage", "Jacuzzi", "Night Club", "Newlyweds", "Vacation", "Bahamas", "Cazumel", "Hair Braiding", "Kids Club", "Tourists", "Sandals", "Soft Serve Ice Cream"],
                ["Dance 'Merica", "Statue of Liberty", "Bald Eagle", "American Flag", "Fireworks", "Obama", "Golden Retriever", "Football", "Baseball", "BBQ", "Mount Rushmore", "Hot Dog", "Frat", "Miss America", "Shucking Corn", "McDonalds", "Jorts", "Oprah", "George Washington", "Beyonce", "Thanksgiving", "4th of July", "Black Friday", "Pearl Harbor", "Great Depression", "Civil War", "Prohibition", "Michael Jackson", "Forrest Gump", "United States", "Louis and Clark", "Sacagawea", "White House", "Grand Canyon", "Niagra Falls", "Declaration of Independence", "Martin Luther King Jr", "Secret Service", "The Kennedys", "NYPD", "FBI", "CIA", "Coca Cola", "New York", "Washington D.C."]
            ];
            for (var i = 0; i != this.Categories.length; ++i) {
                this.chosenCategories[i] = true;
            }
        };
        Model.prototype.changeWord = function () {
            var currentCategory = this.randomUsableCategory();
            this.currentWordCategory = currentCategory;
            this.currentItem = this.randomWordInCategory(currentCategory); //category, phrase in category
            for (var i = 0; i != this.playedWords.length; ++i) {
                if (this.playedWords[i]) {
                    if (this.currentItem == this.playedWords[i]) {
                        this.changeWord();
                        break;
                    }
                }
                else {
                    console.log("game.playedWords[i] not found");
                }
            }
        };
        Model.prototype.randomUsableCategory = function () {
            var usableCategories = 0;
            for (var i = 0; i != this.chosenCategories.length; ++i) {
                if (this.chosenCategories[i] == true) {
                    ++usableCategories;
                }
            }
            //generate random number from 0 to usableCategories -1
            if (usableCategories > 0) {
                var returnCategory = 0;
                var categoryToUse = Math.floor((Math.random() * usableCategories)); //note: this is OF the usable categories, still need to skip unusable categories
                for (var i = 0; i != categoryToUse; ++i) {
                    if (this.chosenCategories[i] == false) {
                        ++categoryToUse; // increments forloop check as it encounters an unused category
                    }
                }
                return categoryToUse; //is an int
            }
        };
        Model.prototype.changeChosenCat = function (i) {
            if (i < this.chosenCategories.length) {
                if (this.chosenCategories[i]) {
                    this.chosenCategories[i] = false;
                }
                else {
                    this.chosenCategories[i] = true;
                }
            }
        };
        Model.prototype.randomWordInCategory = function (currentCategory) {
            var sizeOfCategory = this.Categories[currentCategory].length;
            var currentItemNumber = Math.floor((Math.random() * sizeOfCategory - 1)) + 1; //location in select category of used word, should not be 0 because of category name
            return this.Categories[currentCategory][currentItemNumber];
        };
        return Model;
    })();
    Game.Model = Model;
})(Game || (Game = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="GameView.ts" />
var Game;
(function (Game) {
    var GameTwo = (function (_super) {
        __extends(GameTwo, _super);
        function GameTwo() {
            _super.call(this);
            this.gameStarted = false;
            this.changeWord();
            this.activeTeam = 1;
            this.teamOneTime = 2;
            this.teamTwoTime = 2;
            this.teamOneScore = 0;
            this.teamTwoScore = 0;
            this.currentRound = 0;
            this.totalRoundsOption = [1, 3, 7, 9, 11];
            this.totalRoundsOptionNumber = 0;
            this.totalRounds = this.totalRoundsOption[this.totalRoundsOptionNumber];
        }
        GameTwo.prototype.setGameView = function (gv) {
            this.gameView = gv;
        };
        GameTwo.prototype.changeActiveTeam = function () {
            if (this.activeTeam == 1) {
                this.activeTeam = 2;
            }
            else {
                this.activeTeam = 1;
            }
            this.newItem = true;
        };
        GameTwo.prototype.changeItem = function () {
            this.newItem = true;
        };
        GameTwo.prototype.setTotalRounds = function () {
            this.totalRounds = this.totalRoundsOption[this.totalRoundsOptionNumber % 5];
        };
        GameTwo.prototype.beginGame = function (height) {
            this.gameView.renderRoundNumber(height / 2, this.totalRounds, true);
        };
        GameTwo.prototype.slideLeft = function (width) {
            this.gameView.slideLeft(this.totalRoundsOption[(this.totalRoundsOptionNumber) % 5], this.totalRoundsOption[(++this.totalRoundsOptionNumber) % 5], width / 2, width + 5);
        };
        GameTwo.prototype.slideRight = function (width) {
            if (this.totalRoundsOptionNumber - 1 >= 0) {
                this.gameView.slideRight(this.totalRoundsOption[(this.totalRoundsOptionNumber) % 5], this.totalRoundsOption[(--this.totalRoundsOptionNumber) % 5], width / 2, 0);
            }
        };
        GameTwo.prototype.selectedRoundNumber = function () {
            this.gameView.renderSelectedRoundNumber();
        };
        GameTwo.prototype.countdown = function () {
            this.gameView.renderCountdown();
        };
        GameTwo.prototype.notEnoughCategories = function () {
            this.gameView.renderNotEnoughCategories;
        };
        GameTwo.prototype.startGame = function () {
            this.inBetweenRounds = false;
            this.playingGame = true;
            this.gameStarted = true;
            this.teamOneTime = 2;
            this.teamTwoTime = 2;
            this.teamOneTotalTime = 0;
            this.teamTwoTotalTime = 0;
            this.currentRound++;
            this.startGame1();
        };
        GameTwo.prototype.startGame1 = function () {
            var act;
            if (this.activeTeam == 1) {
                act = this.teamOneTime;
            }
            else {
                act = this.teamTwoTime;
            }
            this.gameView.renderCurrentWordTwo(this.currentItem, act, this.activeTeam);
            var self = this;
            var f = function () {
                self.startGame1();
            };
            var timeout = setTimeout(f, 100);
            if (this.teamOneTime < 0 || this.teamTwoTime < 0) {
                if (this.currentRound == this.totalRounds) {
                    if (this.teamOneTotalTime > this.teamTwoTotalTime) {
                        ++this.teamTwoScore;
                    }
                    else {
                        ++this.teamOneScore;
                    }
                    this.playingGame = false;
                    this.gameOver = true;
                    this.gameView.renderGameOverTwo(this.teamOneScore, this.teamTwoScore);
                }
                else {
                    if (this.teamOneTotalTime > this.teamTwoTotalTime) {
                        ++this.teamTwoScore;
                    }
                    else {
                        ++this.teamOneScore;
                    }
                    this.playingGame = false;
                    this.inBetweenRounds = true;
                    this.gameView.renderInBetweenRounds(this.teamOneScore, this.teamTwoScore, this.currentRound, this.totalRounds);
                }
                clearTimeout(timeout);
            }
            if (this.newItem) {
                this.playedWords.push(this.currentItem);
                this.changeWord();
                this.newItem = false;
            }
            if (this.activeTeam == 1) {
                this.teamOneTotalTime += .1;
                this.teamOneTime -= .1;
            }
            else {
                this.teamTwoTotalTime += .1;
                this.teamTwoTime -= .1;
            }
        };
        return GameTwo;
    })(Game.Model);
    Game.GameTwo = GameTwo;
})(Game || (Game = {}));
/// <reference path="Model.ts" />
/// <reference path="GameOne.ts" />
/// <reference path="GameTwo.ts" />
var Game;
(function (Game) {
    var GameView = (function () {
        function GameView(context, width, height, model) {
            this.game_background = new Image();
            this.game_background2 = new Image();
            this.forehead = new Image();
            this.pass = new Image();
            this.roundPicking = new Image();
            this.correct = new Image();
            this.endGame_background = new Image();
            this.game_background.src = "InGame.png";
            this.game_background2.src = "InGame2.png";
            this.roundPicking.src = "RoundPickingBackground.png";
            this.forehead.src = "forehead.png";
            this.pass.src = "pass.png";
            this.correct.src = "correct.png";
            this.endGame_background.src = "endGame.png";
            this.context = context;
            this.width = width;
            this.height = height;
            this.model = model;
        }
        GameView.prototype.renderForehead = function () {
            var self = this;
            this.forehead.onload = function () {
                self.context.drawImage(self.forehead, 0, 0, self.width, self.height);
            };
        };
        GameView.prototype.renderCountdown = function () {
        };
        GameView.prototype.renderPass = function () {
            this.context.drawImage(this.pass, 0, 0, this.width, this.height);
        };
        GameView.prototype.renderCorrect = function () {
            this.context.drawImage(this.correct, 0, 0, this.width, this.height);
        };
        GameView.prototype.renderCurrentWordOne = function (currword, currTime) {
            this.clearCanvas();
            currTime = Math.floor(currTime);
            this.context.drawImage(this.game_background, 0, 0, this.width, this.height);
            this.printWord(currword);
            this.printTime(currTime);
        };
        GameView.prototype.renderCurrentWordTwo = function (currWord, teamTime, activeTeam) {
            this.clearCanvas();
            teamTime = Math.floor(teamTime);
            this.context.drawImage(this.game_background2, 0, 0, this.width, this.height);
            this.printWord(currWord);
            this.printTimeTwo(teamTime, activeTeam);
        };
        GameView.prototype.renderInBetweenRounds = function (teamOneScore, teamTwoScore, currentRound, totalRounds) {
            this.clearCanvas();
            this.context.drawImage(this.game_background, 0, 0, this.width, this.height);
            this.context.font = "50px AG Book Rounded";
            this.context.textBaseline = 'center';
            this.context.textAlign = 'center';
            this.context.fillText("ROUND " + currentRound + "/" + totalRounds, this.width / 2, this.height / 4);
            this.context.fillText("Team 1", this.width / 4, this.height / 2);
            this.context.fillText("Team 2", 3 * this.width / 4, this.height / 2);
            this.context.fillText(teamOneScore, this.width / 4, 3 * this.height / 4);
            this.context.fillText(teamTwoScore, 3 * this.width / 4, 3 * this.height / 4);
        };
        GameView.prototype.renderRoundNumber = function (height, rounds, up) {
            var self = this;
            /*
            this.roundPicking.onload = function(){
                    self.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
            }
            */
            this.clearCanvas();
            this.bouncingHeight = height;
            var self = this;
            if (up) {
                --height;
            }
            else {
                ++height;
            }
            if (height > this.height / 2 + 10) {
                up = true;
            }
            else if (height < this.height / 2 - 20) {
                up = false;
            }
            var f = function () {
                self.renderRoundNumber(height, rounds, up);
            };
            this.bouncingAnimation = setTimeout(f, 20);
            self.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
            this.context.font = "150px AG Book Rounded";
            this.context.textBaseline = 'center';
            this.context.textAlign = 'center';
            this.context.fillText(rounds, this.width / 2, height);
        };
        GameView.prototype.slideLeft = function (rounds1, rounds2, width1, width2) {
            this.clearCanvas();
            var self = this;
            self.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
            width1 -= 5;
            width2 -= 5;
            clearTimeout(this.bouncingAnimation);
            var f = function () {
                self.slideLeft(rounds1, rounds2, width1, width2);
            };
            this.slideLeftAnimation = setTimeout(f, 5);
            if (width2 <= Math.floor(this.width / 2)) {
                clearTimeout(this.slideLeftAnimation);
                this.renderRoundNumber(this.bouncingHeight, rounds2, true);
            }
            this.context.font = "150px AG Book Rounded";
            this.context.textBaseline = 'center';
            this.context.textAlign = 'center';
            this.context.fillText(rounds1, width1, this.bouncingHeight);
            this.context.fillText(rounds2, width2, this.bouncingHeight);
        };
        GameView.prototype.slideRight = function (rounds1, rounds2, width1, width2) {
            this.clearCanvas();
            var self = this;
            self.context.drawImage(self.roundPicking, 0, 0, self.width, self.height);
            width1 += 5;
            width2 += 5;
            clearTimeout(this.bouncingAnimation);
            var f = function () {
                self.slideRight(rounds1, rounds2, width1, width2);
            };
            this.slideRightAnimation = setTimeout(f, 5);
            if (width2 >= Math.floor(this.width / 2)) {
                clearTimeout(this.slideRightAnimation);
                this.renderRoundNumber(this.bouncingHeight, rounds2, true);
            }
            this.context.font = "150px AG Book Rounded";
            this.context.textBaseline = 'center';
            this.context.textAlign = 'center';
            this.context.fillText(rounds1, width1, this.bouncingHeight);
            this.context.fillText(rounds2, width2, this.bouncingHeight);
        };
        GameView.prototype.renderSelectedRoundNumber = function () {
            clearTimeout(this.bouncingAnimation);
        };
        GameView.prototype.renderNotEnoughCategories = function () {
        };
        GameView.prototype.renderGameOverTwo = function (score1, score2) {
            this.clearCanvas();
            this.context.drawImage(this.endGame_background, 0, 0, this.width, this.height);
            this.context.font = "50px AG Book Rounded";
            this.context.textBaseline = 'center';
            this.context.textAlign = 'center';
            if (score1 > score2) {
                this.context.fillText("TEAM 1 WINS!", this.width / 2, this.height / 3);
            }
            else if (score1 == score2) {
                this.context.fillText("IT'S A TIE!", this.width / 2, this.height / 3);
            }
            else {
                this.context.fillText("TEAM 2 WINS!", this.width / 2, this.height / 3);
            }
        };
        GameView.prototype.renderGameOver = function (numItems, playedWords, correct) {
            this.clearCanvas();
            this.context.drawImage(this.endGame_background, 0, 0, this.width, this.height);
            var numCorrect = 0;
            var shiftUp = 0;
            for (var i = 0; i < numItems; ++i) {
                if (!correct[i]) {
                    this.context.fillStyle = "red";
                }
                else {
                    numCorrect++;
                    this.context.fillStyle = "green";
                }
                this.context.font = "20px AG Book Rounded";
                this.context.fillText(playedWords[i], this.width / 2, this.height * 1 / 4 + i * 23 - shiftUp * 23);
            }
            this.context.font = "40px AG Book Rounded";
            this.context.fillStyle = "white";
            this.context.fillText((numCorrect).toString(), this.width / 2, this.height * 1 / 8);
        };
        GameView.prototype.clearCanvas = function () {
            this.context.clearRect(0, 0, this.width, this.height);
        };
        GameView.prototype.printWord = function (currword) {
            this.context.font = "80px AG Book Rounded";
            this.context.textBaseline = 'bottom';
            this.context.textAlign = 'center';
            this.rotateContext();
            this.context.fillStyle = "blue";
            var textWidth = this.context.measureText(currword).width;
            this.wrapText(this.context, currword, this.height / 4, this.width / 1.55, this.height, 89, "bold 60px AG Book Rounded");
            this.context.restore();
        };
        GameView.prototype.rotateContext = function () {
            this.context.save();
            this.context.translate(0, h * 3 / 4); //new origin
            this.context.rotate(-Math.PI / 2); //rotate counter-clockwise
        };
        GameView.prototype.wrapText = function (context, text, x, y, maxWidth, lineHeight, font) {
            var cars = text.split("\n");
            var lengthgr = false;
            if (text.length > 19) {
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
                        y = y / 1.25;
                        context.fillText(line, x, y);
                        line = words[n] + " ";
                        y += lineHeight;
                    }
                    else {
                        line = testLine;
                    }
                }
                context.fillText(line, x, y);
                y += lineHeight;
            }
        };
        GameView.prototype.printTime = function (timeLeft) {
            this.context.font = "30px AG Book Rounded";
            this.context.textBaseline = 'bottom';
            this.context.textAlign = 'center';
            this.rotateContext();
            this.context.fillStyle = "white";
            this.context.fillText('TIME REMAINING: ' + Math.floor(timeLeft), this.height / 4, this.width * 15 / 16);
            this.context.restore();
        };
        GameView.prototype.printTimeTwo = function (timeLeft, teamNumber) {
            this.context.font = "30px AG Book Rounded";
            this.context.textBaseline = 'bottom';
            this.context.textAlign = 'center';
            this.rotateContext();
            this.context.fillStyle = "white";
            this.context.fillText("TEAM " + teamNumber + ' TIME REMAINING: ' + Math.floor(timeLeft), this.height / 4, this.width * 2 / 15 + 5);
            this.context.restore();
        };
        return GameView;
    })();
    Game.GameView = GameView;
})(Game || (Game = {}));
/// <reference path="GameView.ts" />
var Game;
(function (Game) {
    var GameOne = (function (_super) {
        __extends(GameOne, _super);
        function GameOne() {
            _super.call(this);
            this.gameStarted = false;
            this.changeWord();
        }
        GameOne.prototype.setGameView = function (gv) {
            this.gameView = gv;
        };
        GameOne.prototype.setRecentPassOrFail = function (p) {
            this.recentPassOrFail = p;
            this.newItem = true;
        };
        GameOne.prototype.beginGame = function () {
            this.gameView.renderForehead();
        };
        GameOne.prototype.countdown = function () {
            this.gameView.renderCountdown();
        };
        GameOne.prototype.notEnoughCategories = function () {
            this.gameView.renderNotEnoughCategories;
        };
        GameOne.prototype.startGame = function (timeOfRound) {
            this.gameStarted = true;
            var self = this;
            var f = function () {
                self.startGame(timeOfRound);
            };
            var timeout = setTimeout(f, 100);
            this.gameView.renderCurrentWordOne(this.currentItem, timeOfRound);
            if (timeOfRound <= 0) {
                clearTimeout(timeout);
                this.gameOver = true;
                this.gameView.renderGameOver(this.playedWords.length, this.playedWords, this.correctPlayedWords);
            }
            if (this.newItem) {
                this.playedWords.push(this.currentItem);
                this.correctPlayedWords.push(this.recentPassOrFail);
                console.log("len" + this.playedWords.length);
                console.log("cuur" + this.currentItem);
                this.changeWord();
                this.newItem = false;
            }
            if (this.heldSideways) {
                if (this.recentPassOrFail) {
                    this.gameView.renderCorrect();
                }
                else {
                    this.gameView.renderPass();
                }
            }
            else {
                timeOfRound = timeOfRound - 0.1;
            }
        };
        return GameOne;
    })(Game.Model);
    Game.GameOne = GameOne;
})(Game || (Game = {}));
/// <reference path="GameLoop.ts" />
/// <reference path="Model.ts" />
/// <reference path="GameOne.ts" />
/// <reference path="GameTwo.ts" />
var Game;
(function (Game) {
    var GameController = (function () {
        function GameController(gameloop, canvas, width, height, model) {
            this.gameloop = gameloop;
            this.canvas = canvas;
            this.width = width;
            this.height = height;
            this.model = model;
            this.gameShallStart = false;
            this.gamma = 0;
        }
        GameController.prototype.takeInput = function () {
            if (this.model instanceof Game.GameOne) {
                this.gameOneTakeInput();
            }
            if (this.model instanceof Game.GameTwo) {
                this.gameTwoTakeInput();
            }
        };
        GameController.prototype.gameOneTakeInput = function () {
            if (this.gameCanStart()) {
                //console.log("start");
                this.startGameOne();
            }
            else {
                //console.log("nostart");
                this.model.notEnoughCategories();
            }
        };
        GameController.prototype.startGameOne = function () {
            this.model.beginGame();
            var self = this;
            this.mobileClick = this.mobileClick.bind(this);
            this.canvas.addEventListener("click", this.mobileClick);
            var mostRecentState = 100;
            var mostRecentTimeItWasBeingHeldSideways;
            window.ondeviceorientation = function (event) {
                console.log(self.gamma);
                self.gamma = Math.round(event.gamma);
                if (self.gamma > 125 || self.gamma < 55) {
                    mostRecentTimeItWasBeingHeldSideways = new Date().getTime();
                }
                if (self.gamma > 125 && mostRecentState <= 125) {
                    self.model.setRecentPassOrFail(true); //they got the answer right
                    self.model.heldSideways = true;
                }
                else if (self.gamma < 55 && mostRecentState >= 55) {
                    self.model.setRecentPassOrFail(false); //they got the answer wrong
                    self.model.heldSideways = true;
                }
                else if (self.gamma >= 55 && self.gamma <= 125) {
                    self.gameShallStart = true;
                    while ((new Date().getTime()) - mostRecentTimeItWasBeingHeldSideways < 1000) {
                    }
                    self.model.heldSideways = false;
                }
                mostRecentState = self.gamma;
            };
            this.startDaGame();
        };
        GameController.prototype.startDaGame = function () {
            this.clearVariablesOne();
            var self = this;
            console.log(!this.model.gameStarted + " " + this.gameShallStart);
            var f = function () {
                self.startDaGame();
            };
            var t = setTimeout(f, 100);
            if (!this.model.gameStarted && this.gameShallStart) {
                self.model.countdown();
                self.model.startGame(5);
                clearTimeout(t);
            }
        };
        GameController.prototype.gameCanStart = function () {
            for (var i = 0; i != this.model.chosenCategories.length; ++i) {
                if (this.model.chosenCategories[i] == true) {
                    console.log(i);
                    return true;
                }
            }
            return false;
        };
        GameController.prototype.mobileClick = function (e) {
            if (this.model.gameOver) {
                var mobileClickY = event.y;
                mobileClickY -= this.canvas.offsetTop;
                var mobileClickX = event.x;
                mobileClickX -= this.canvas.offsetLeft;
                this.click(mobileClickX, mobileClickY);
            }
        };
        GameController.prototype.click = function (X, Y) {
            var menuButton = (550 / 667) * this.height;
            if (Y > menuButton) {
                console.log("badddd");
                this.switchToMenuState();
            }
        };
        GameController.prototype.gameTwoTakeInput = function () {
            if (this.gameCanStart()) {
                this.startGameTwo();
            }
            else {
                console.log("nostart");
                this.model.notEnoughCategories();
            }
        };
        GameController.prototype.startGameTwo = function () {
            this.mobileClickTwo = this.mobileClickTwo.bind(this);
            this.canvas.addEventListener("click", this.mobileClickTwo);
            this.model.beginGame(this.height);
        };
        GameController.prototype.mobileClickTwo = function (event) {
            var mobileClickY = event.y;
            mobileClickY -= this.canvas.offsetTop;
            var mobileClickX = event.x;
            mobileClickX -= this.canvas.offsetLeft;
            if (this.model.inBetweenRounds) {
                this.clickNextRoundOption(mobileClickX, mobileClickY);
            }
            else if (this.model.playingGame) {
                this.clickTwo(mobileClickX, mobileClickY);
            }
            else if (this.model.gameOver) {
                this.clickMenuOption(mobileClickX, mobileClickY);
            }
            else {
                this.clickSelectTotalRounds(mobileClickX, mobileClickY);
            }
        };
        GameController.prototype.clickNextRoundOption = function (X, Y) {
            var menuButton = (550 / 667) * this.height;
            if (Y > menuButton) {
                if (X < this.width / 2) {
                    this.switchToMenuState();
                }
                else {
                    this.model.startGame();
                }
            }
        };
        GameController.prototype.clickMenuOption = function (X, Y) {
            var menuButton = (550 / 667) * this.height;
            if (Y > menuButton) {
                this.switchToMenuState();
            }
        };
        GameController.prototype.clickSelectTotalRounds = function (X, Y) {
            var leftArrowStartingX = (260 / 375) * this.width;
            var leftArrowStartingY = (250 / 667) * this.height;
            var leftArrowEndingY = (320 / 667) * this.height;
            if (X > leftArrowStartingX && X < this.width) {
                if (Y > leftArrowStartingY && Y < leftArrowEndingY) {
                    this.model.slideLeft(this.width);
                }
            }
            else if (X > 0 && X < (50 / 375) * this.width) {
                if (Y > leftArrowStartingY && Y < leftArrowEndingY) {
                    this.model.slideRight(this.width);
                }
            }
            else {
                if (Y > 550 / 667 * this.height) {
                    this.model.setTotalRounds();
                    this.model.selectedRoundNumber();
                    this.model.startGame();
                }
            }
        };
        GameController.prototype.clickTwo = function (X, Y) {
            var buttonStartingX = 290 / 375 * this.width;
            var buttonEndingX = 360 / 375 * this.width;
            var CorrectStartingY = 10 / 667 * this.height;
            var CorrectEndingY = 330 / 667 * this.height;
            var PassStartingY = 370 / 667 * this.height;
            var PassEndingY = 650 / 667 * this.height;
            if (X > buttonStartingX && X < buttonEndingX) {
                if (Y > CorrectStartingY && Y < CorrectEndingY) {
                    this.model.changeActiveTeam();
                }
                else if (Y > PassStartingY && Y < PassEndingY) {
                    this.model.changeItem();
                }
            }
        };
        GameController.prototype.switchToMenuState = function () {
            this.switchStates();
            this.gameloop.switchToMenuState();
        };
        GameController.prototype.switchStates = function () {
            if (this.model instanceof Game.GameOne) {
                this.canvas.removeEventListener("click", this.mobileClick);
                this.clearVariablesOne();
            }
            else {
                this.canvas.removeEventListener("click", this.mobileClickTwo);
                this.clearVariablesTwo();
            }
        };
        GameController.prototype.clearVariablesOne = function () {
            this.model.gameOver = false;
            this.model.gameStarted = false;
            this.model.newItem = false;
            this.model.heldSideways = false;
            while (this.model.playedWords.length > 0) {
                this.model.playedWords.pop();
                this.model.correctPlayedWords.pop();
            }
        };
        GameController.prototype.clearVariablesTwo = function () {
            this.model.gameOver = false;
            this.model.playingGame = false;
            this.model.newItem = false;
            this.model.activeTeam = 1;
            this.model.currentRound = 0;
            this.model.teamOneTime = 30;
            this.model.teamTwoTime = 30;
            this.model.teamOneScore = 0;
            this.model.teamTwoScore = 0;
            this.model.totalRoundsOptionNumber = 0;
            this.model.teamOneTotalTime = 0;
            this.model.teamTwoTotalTime = 0;
        };
        return GameController;
    })();
    Game.GameController = GameController;
})(Game || (Game = {}));
/// <reference path="GameLoop.ts" />
var Game;
(function (Game) {
    var CategoriesController = (function () {
        function CategoriesController(gameloop, canvas, width, height, model, categoriesView) {
            this.gameloop = gameloop;
            this.canvas = canvas;
            this.width = width;
            this.height = height;
            this.startingHeight = 0;
            this.oldY = 0;
            this.model = model;
            this.categoriesView = categoriesView;
            this.categoriesView.setCategories(this.model.Categories, this.model.chosenCategories);
            this.categoriesView.renderCategories(this.startingHeight, this.model.chosenCategories);
        }
        CategoriesController.prototype.takeInput = function () {
            this.Scrolling = this.Scrolling.bind(this);
            this.endScrolling = this.endScrolling.bind(this);
            this.updateGame = this.updateGame.bind(this);
            this.canvas.addEventListener("touchmove", this.Scrolling);
            this.canvas.addEventListener("touchend", this.endScrolling);
            this.canvas.addEventListener("click", this.updateGame);
        };
        CategoriesController.prototype.Scrolling = function (event) {
            event.preventDefault();
            var screenHeight = this.height - (this.height / 4);
            var numCatPages = Math.ceil(this.model.Categories.length / 6);
            var maxHeight = screenHeight * numCatPages; //fix this once there is new categories
            var canvas_x = event.targetTouches[0].pageX;
            var canvas_y = event.targetTouches[0].pageY;
            if (this.fingerLifted) {
                this.startX = canvas_x;
                this.startY = canvas_y;
            }
            if (!this.fingerLifted) {
                var difference = this.oldY - canvas_y;
                var newStartingHeight = this.startingHeight + difference;
                if (newStartingHeight < 0) {
                    this.startingHeight = 0;
                }
                else if (newStartingHeight + this.height > (maxHeight)) {
                    this.startingHeight = this.startingHeight;
                }
                else {
                    this.startingHeight = newStartingHeight;
                }
                console.log("hi" + canvas_y);
                this.categoriesView.renderCategories(Math.round(this.startingHeight), this.model.chosenCategories);
            }
            this.oldY = canvas_y;
            this.endY = canvas_y;
            this.endX = canvas_x;
            this.fingerLifted = false;
        };
        CategoriesController.prototype.endScrolling = function (event) {
            this.fingerLifted = true;
        };
        CategoriesController.prototype.updateGame = function (event) {
            var canvas_y = event.y;
            canvas_y -= this.canvas.offsetTop;
            var screenHeight = this.height - (this.height / 4);
            var buttonHeight = screenHeight / 7;
            var gap = 10;
            var startingGap = this.height / 9 + 10;
            var menuButton = (550 / 667) * this.height;
            var click = this.startingHeight + canvas_y;
            if (click > startingGap) {
                var i = Math.floor((click - startingGap) / (buttonHeight + gap)); // i
                this.model.changeChosenCat(i);
                this.categoriesView.renderCategories(this.startingHeight, this.model.chosenCategories);
            }
            if (canvas_y > menuButton) {
                this.switchToMenuState();
            }
        };
        CategoriesController.prototype.switchStates = function () {
            this.canvas.removeEventListener("touchmove", this.Scrolling);
            this.canvas.removeEventListener("touchend", this.endScrolling);
            this.canvas.removeEventListener("click", this.updateGame);
        };
        CategoriesController.prototype.switchToMenuState = function () {
            this.switchStates();
            this.gameloop.switchToMenuState();
        };
        return CategoriesController;
    })();
    Game.CategoriesController = CategoriesController;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var CategoriesView = (function () {
        function CategoriesView(context, width, height) {
            this.category_background = new Image();
            this.category_background.src = "categories_foreground.png";
            this.context = context;
            this.width = width;
            this.height = height;
            this.font = "pt AG Book Rounded";
        }
        CategoriesView.prototype.setCategories = function (categories, boolcat) {
            this.categories = categories;
            this.boolCategories = boolcat;
        };
        CategoriesView.prototype.render = function () {
            var self = this;
            this.category_background.onload = function () {
                self.renderCategories(0, self.boolCategories);
            };
        };
        CategoriesView.prototype.fillRoundedRect = function (x, y, w, h) {
            var r = 20;
            this.context.beginPath();
            this.context.moveTo(x + r, y);
            this.context.lineTo(x + w - r, y);
            this.context.quadraticCurveTo(x + w, y, x + w, y + r);
            this.context.lineTo(x + w, y + h - r);
            this.context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            this.context.lineTo(x, y + h);
            this.context.lineTo(x, y);
            this.context.closePath();
            this.context.strokeStyle = "black";
            this.context.lineWidth = 5;
            this.context.fill();
            this.context.stroke();
        };
        CategoriesView.prototype.drawText = function (rectX, rectY, width, height, i) {
            var fontSize = 30;
            var fontSizeString = fontSize.toString();
            this.context.font = fontSizeString + this.font;
            this.context.textAlign = "center";
            this.context.textBaseline = "middle";
            this.context.fillStyle = "black";
            var metrics = this.context.measureText(this.categories[i][0]);
            var metricsWidth = metrics.width;
            while (metricsWidth >= width) {
                --fontSize;
                var fontSizeString = fontSize.toString();
                this.context.font = fontSizeString + this.font;
                metrics = this.context.measureText(this.categories[i][0]);
                metricsWidth = metrics.width;
            }
            this.context.fillText(this.categories[i][0], rectX + (width / 2), rectY + (height / 2));
            this.context.fillText(this.categories[i][0], rectX + (width / 2), rectY + (height / 2));
        };
        CategoriesView.prototype.renderCategories = function (startingHeight, boolCategories) {
            this.clearCanvas();
            var screenHeight = this.height - (this.height / 4);
            var tempStartingHeight = startingHeight;
            var h = screenHeight / 7;
            var gap = 10;
            var startingGap = this.height / 9 + 10;
            for (var i = 0; i != this.categories.length; ++i) {
                var width = this.width / 1.2;
                var height = h;
                var rectX = this.width / 20;
                var rectY = startingGap - tempStartingHeight;
                if (boolCategories[i]) {
                    this.context.fillStyle = "#00FF00";
                }
                else {
                    this.context.fillStyle = "#FF3300";
                }
                this.fillRoundedRect(rectX, rectY, width, height);
                this.drawText(rectX, rectY, width, height, i);
                tempStartingHeight -= (h + gap);
            }
            this.context.drawImage(this.category_background, 0, 0, this.width, this.height);
        };
        CategoriesView.prototype.fontLoaded = function () {
            var what = "kajdshfluakhfasn";
            var metrics = this.context.measureText(what);
            var metricsWidth = metrics.width;
            if (Math.floor(metricsWidth) == 304) {
                return true;
            }
            else {
                return false;
            }
        };
        CategoriesView.prototype.clearCanvas = function () {
            this.context.clearRect(0, 0, this.width, this.height);
        };
        return CategoriesView;
    })();
    Game.CategoriesView = CategoriesView;
})(Game || (Game = {}));
/// <reference path="MenuController.ts" />
/// <reference path="MenuView.ts" />
/// <reference path="GameController.ts" />
/// <reference path="GameView.ts" />
/// <reference path="CategoriesController.ts" />
/// <reference path="CategoriesView.ts" />
/// <reference path="Model.ts" />
/// <reference path="GameOne.ts" />
/// <reference path="GameTwo.ts" />
var Game;
(function (Game) {
    var GameLoop = (function () {
        function GameLoop(canvas, context, width, height) {
            this.canvas = canvas;
            this.context = this.canvas.getContext('2d');
            this.width = width;
            this.height = height;
            this.model = new Game.GameOne();
            this.controller = new Game.MenuController(this, canvas, width, height, this.model); //add model
            this.view = new Game.MenuView(context, width, height, 1); //add model		
        }
        GameLoop.prototype.runGame = function () {
            this.controller.takeInput();
        };
        GameLoop.prototype.switchGameModes = function () {
            if (this.model instanceof Game.GameOne) {
                this.model = new Game.GameTwo();
                this.view.render(2);
            }
            else if (this.model instanceof Game.GameTwo) {
                this.model = new Game.GameOne();
                this.view.render(1);
            }
        };
        GameLoop.prototype.switchToGameState = function () {
            var newView = new Game.GameView(this.context, this.width, this.height, this.model);
            this.view = newView;
            this.model.setGameView(newView);
            var newController = new Game.GameController(this, this.canvas, this.width, this.height, this.model);
            this.controller = newController;
            this.controller.takeInput();
        };
        GameLoop.prototype.switchToCategoriesState = function () {
            var newView = new Game.CategoriesView(this.context, this.width, this.height); //add model
            this.view = newView;
            var newController = new Game.CategoriesController(this, this.canvas, this.width, this.height, this.model, newView);
            this.controller = newController;
            this.controller.takeInput();
            //this.view.render();
        };
        GameLoop.prototype.switchToMenuState = function () {
            var gm;
            if (this.model instanceof Game.GameOne) {
                gm = 1;
            }
            else if (this.model instanceof Game.GameTwo) {
                gm = 2;
            }
            var newView = new Game.MenuView(this.context, this.width, this.height, gm); //add model
            this.view = newView;
            var newController = new Game.MenuController(this, this.canvas, this.width, this.height, this.model); //add model
            this.controller = newController;
            this.controller.takeInput();
        };
        return GameLoop;
    })();
    Game.GameLoop = GameLoop;
})(Game || (Game = {}));
/// <reference path="GameLoop.ts" />
var c = document.getElementById('canvas');
c.width = window.innerWidth;
c.height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;
var ctx = c.getContext('2d');
ctx.font = "50px AG Book Rounded";
var game = new Game.GameLoop(c, ctx, w, h);
game.runGame();

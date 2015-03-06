/// <reference path="GameLoop.ts" />
var Game;
(function (Game) {
    var MenuController = (function () {
        function MenuController(gameloop, canvas, width, height) {
            this.gameloop = gameloop;
            this.canvas = canvas;
        }
        MenuController.prototype.takeInput = function () {
            this.mobileClick = this.mobileClick.bind(this);
            this.canvas.addEventListener('touchstart', this.mobileClick);
        };
        MenuController.prototype.mobileClick = function (e) {
            var touchobj = e.changedTouches[0];
            var mobileClickX = parseInt(touchobj.clientX);
            mobileClickX = mobileClickX - (window.innerWidth - this.gameloop.width) / 2;
            var mobileClickY = parseInt(touchobj.clientY);
            mobileClickY = mobileClickY - 25;
            this.click(mobileClickX, mobileClickY);
        };

        MenuController.prototype.click = function (X, Y) {
            if (Y > (210 / 667 * h) && Y < (505 / 667 * h)) {
                if (X < 275 / 320 * w) {
                    if (Y < 285 / 560 * h && Y > 200 / 667 * h) {
                        this.switchToGameState();
                    } else if (Y < 350 / 560 * h) {
                        this.switchToCategoriesState();
                    } else if (Y < 435 / 560 * h) {
                        this.gameloop.switchGameModes();
                    } else if (Y < 505 / 560 * h) {
                        //how to play
                    }
                }
            }
        };

        MenuController.prototype.switchStates = function () {
            this.canvas.removeEventListener('touchstart', this.mobileClick);
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
        function MenuView(context, width, height) {
            this.menu_background = new Image();
            this.menu_background.src = "Menu.png";
            this.context = context;
            this.width = width;
            this.height = height;
        }
        MenuView.prototype.render = function () {
            var self = this;
            this.menu_background.onload = function () {
                self.context.drawImage(self.menu_background, 0, 0, self.width, self.height);
            };
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
                [
                    "College Teams", "Florida Gators", "LSU Tigers", "Tenessee Volunteers", "Georgia Bulldogs", "Oregon Ducks", "Florida State Seminoles", "Arkansas Razorbacks",
                    "Alabama Crimson Tide", "South Carolina Gamecocks", "Ole Miss Rebels", "Kentucky Wildcats", "Texas A&M Aggies", "Michigan Wolverines", "Michigan State Spartans",
                    "Texas Longhorns", "Ohio State Buckeyes", "Notre Dame FIghting Irish", "Duke Blue Devils", "Nebraska Cornhuskers", "TCU Horned Frogs"],
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

            //this.Items = ["hidjnfoda fnoiqwebfo sada" ,"bye", "yo"];
            this.size = this.Categories.length;
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
                } else {
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
                var categoryToUse = Math.floor((Math.random() * usableCategories));
                for (var i = 0; i != categoryToUse; ++i) {
                    if (this.chosenCategories[i] == false) {
                        ++categoryToUse; // increments forloop check as it encounters an unused category
                    }
                }
                return categoryToUse;
            }
        };

        Model.prototype.randomWordInCategory = function (currentCategory) {
            var sizeOfCategory = this.Categories[currentCategory].length;
            this.currentItemNumber = Math.floor((Math.random() * sizeOfCategory - 1)) + 1; //location in select category of used word, should not be 0 because of category name

            return this.Categories[currentCategory][this.currentItemNumber];
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
var Game;
(function (Game) {
    var GameTwo = (function (_super) {
        __extends(GameTwo, _super);
        function GameTwo() {
            _super.call(this);
        }
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
            this.forehead = new Image();
            this.pass = new Image();
            this.correct = new Image();
            this.endGame_background = new Image();
            this.game_background.src = "InGame.png";
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
        GameView.prototype.renderGameOver = function (numItems, playedWords, correct) {
            this.clearCanvas();
            this.context.drawImage(this.endGame_background, 0, 0, w, h);
            var numCorrect = 0;
            var shiftUp = 0;

            for (var i = 0; i < numItems; ++i) {
                if (!correct[i]) {
                    this.context.fillStyle = "red";
                } else {
                    numCorrect++;
                    this.context.fillStyle = "green";
                }
                this.context.font = "bold 20px AG Book Rounded";
                this.context.fillText(playedWords[i], this.width / 2, this.height * 1 / 4 + i * 23 - shiftUp * 23);
            }
            this.context.font = "bold 40px AG Book Rounded";
            this.context.fillStyle = "white";
            this.context.fillText((numCorrect).toString(), w / 2, h * 1 / 8);
        };

        GameView.prototype.clearCanvas = function () {
            this.context.clearRect(0, 0, this.width, this.height);
        };

        GameView.prototype.printWord = function (currword) {
            this.context.font = "bold 80px AG Book Rounded";
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
                    } else {
                        line = testLine;
                    }
                }
                context.fillText(line, x, y);
                y += lineHeight;
            }
            //return isMultipleLines;
        };
        GameView.prototype.printTime = function (timeLeft) {
            this.context.font = "bold 30px Arial";
            this.context.textBaseline = 'bottom';
            this.context.textAlign = 'center';
            this.rotateContext();
            this.context.fillStyle = "white";
            this.context.fillText('TIME REMAINING: ' + Math.floor(timeLeft), h / 4, w * 15 / 16);
            this.context.restore();
        };

        GameView.prototype.gameTwoRender = function () {
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
            this.currentItemNumber = 0;
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
        GameOne.prototype.startGame = function (timeOfRound) {
            this.gameStarted = true;
            this.gameView.renderCurrentWordOne(this.currentItem, timeOfRound);
            var self = this;
            var f = function () {
                self.startGame(timeOfRound);
            };
            var timeout = setTimeout(f, 100);
            if (timeOfRound <= 0) {
                clearTimeout(timeout);
                this.gameOver = true;
                this.gameView.renderGameOver(this.playedWords.length, this.playedWords, this.correctPlayedWords);
            }
            if (this.newItem) {
                this.playedWords.push(this.currentItem);
                this.correctPlayedWords.push(this.recentPassOrFail);
                this.changeWord();
                this.newItem = false;
            }
            if (this.heldSideways) {
                if (this.recentPassOrFail) {
                    this.gameView.renderCorrect();
                } else {
                    this.gameView.renderPass();
                }
            } else {
                timeOfRound = timeOfRound - 0.1;
            }
            //TODO figure out how to hold scores.
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
            var self = this;
            this.model.beginGame();
            this.mobileClick = this.mobileClick.bind(this);
            this.canvas.addEventListener("touchstart", this.mobileClick);
            window.ondeviceorientation = function (event) {
                var gamma = Math.round(event.gamma);
                if (gamma > 125) {
                    self.model.setRecentPassOrFail(true); //they got the answer right
                    var seconds = new Date().getTime() / 1000;
                    self.model.heldSideways = true;
                } else if (gamma < 55) {
                    self.model.setRecentPassOrFail(false); //they got the answer wrong
                    var seconds = new Date().getTime() / 1000;
                    self.model.heldSideways = true;
                } else {
                    if (!self.model.gameStarted) {
                        self.model.countdown();
                        self.model.startGame(5);
                    }
                    self.model.heldSideways = false;
                }
            };
        };

        GameController.prototype.mobileClick = function (e) {
            if (this.model.gameOver) {
                var touchobj = e.changedTouches[0];
                var mobileClickX = parseInt(touchobj.clientX);
                mobileClickX = mobileClickX - (window.innerWidth - this.gameloop.width) / 2;
                var mobileClickY = parseInt(touchobj.clientY);
                mobileClickY = mobileClickY - 25;
                this.click(mobileClickX, mobileClickY);
            }
        };

        GameController.prototype.click = function (X, Y) {
            if (Y > h / 3) {
                console.log("badddd");
                this.switchToMenuState();
            }
        };

        GameController.prototype.gameTwoTakeInput = function () {
        };

        GameController.prototype.switchToMenuState = function () {
            this.switchStates();
            this.gameloop.switchToMenuState();
        };
        GameController.prototype.switchStates = function () {
            this.canvas.removeEventListener("click", this.mobileClick);
            this.clearVariables();
        };
        GameController.prototype.clearVariables = function () {
            this.model.gameOver = false;
            this.model.gameStarted = false;

            delete this.model.playedWords;
            this.model.playedWords = [];

            delete this.model.correctPlayedWords;
            this.model.correctPlayedWords = [];
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
            this.model = model;
            this.categoriesView = categoriesView;
        }
        CategoriesController.prototype.takeInput = function () {
            this.Scrolling = this.Scrolling.bind(this);
            this.endScrolling = this.endScrolling.bind(this);
            this.updateGame = this.updateGame.bind(this);
            this.canvas.addEventListener("touchmove", this.Scrolling);
            this.canvas.addEventListener("touchend", this.endScrolling);
            this.canvas.addEventListener("click", this.updateGame);
        };
        CategoriesController.prototype.Scrolling = function (e) {
        };

        CategoriesController.prototype.endScrolling = function (e) {
        };

        CategoriesController.prototype.updateGame = function (e) {
        };

        CategoriesController.prototype.switchStates = function () {
            this.canvas.removeEventListener("touchmove", this.Scrolling);
            this.canvas.removeEventListener("touchend", this.endScrolling);
            this.canvas.removeEventListener("click", this.updateGame);
        };

        CategoriesController.prototype.switchToGameState = function () {
            this.switchStates();
            this.gameloop.switchToGameState();
        };
        CategoriesController.prototype.switchToCategoriesState = function () {
            this.switchStates();
            this.gameloop.switchToCategoriesState();
        };
        return CategoriesController;
    })();
    Game.CategoriesController = CategoriesController;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var CategoriesView = (function () {
        function CategoriesView(context, width, height) {
            this.game_background = new Image();
            this.game_background.src = "inGame.png";
            this.context = context;
            this.width = width;
            this.height = height;
        }
        CategoriesView.prototype.render = function () {
            var self = this;
            this.game_background.onload = function () {
                self.context.drawImage(self.game_background, 0, 0, self.width, self.height);
                self.fillRoundedRect(50, 50, 100, 100, 20);
            };
        };
        CategoriesView.prototype.fillRoundedRect = function (x, y, w, h, r) {
            this.context.beginPath();
            this.context.moveTo(x + r, y);
            this.context.lineTo(x + w - r, y);
            this.context.quadraticCurveTo(x + w, y, x + w, y + r);
            this.context.lineTo(x + w, y + h - r);
            this.context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            this.context.lineTo(x + r, y + h);
            this.context.quadraticCurveTo(x, y + h, x, y + h - r);
            this.context.lineTo(x, y + r);
            this.context.quadraticCurveTo(x, y, x + r, y);
            this.context.fillStyle = "red";
            this.context.fill();
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
            this.controller = new Game.MenuController(this, canvas, width, height); //add model
            this.view = new Game.MenuView(context, width, height); //add model
        }
        GameLoop.prototype.runGame = function () {
            this.controller.takeInput();
            this.view.render();
            console.log("imadeit");
        };

        GameLoop.prototype.switchGameModes = function () {
            if (this.model instanceof Game.GameOne) {
                this.model = new Game.GameTwo();
            } else if (this.model instanceof Game.GameTwo) {
                this.model = new Game.GameOne();
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
            var newView = new Game.CategoriesView(this.context, this.width, this.height);
            this.view = newView;
            this.view.render();

            var newController = new Game.CategoriesController(this, this.canvas, this.width, this.height, this.model, newView);
            this.controller = newController;
            this.controller.takeInput();
        };

        GameLoop.prototype.switchToMenuState = function () {
            var newView = new Game.MenuView(this.context, this.width, this.height);
            this.view = newView;
            this.view.render();

            var newController = new Game.MenuController(this, this.canvas, this.width, this.height);
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

var game = new Game.GameLoop(c, ctx, w, h);
game.runGame();

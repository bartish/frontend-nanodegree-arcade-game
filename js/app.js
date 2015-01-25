// Enemies our player must avoid. Takes in a starting row and a speed
var Enemy = function(starty, speed, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = starty;
    this.speed = speed;
    this.row = row;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Check to see if the enemy if off the board, if so move 
    // to the beginning of a random row
    var row;
    if (this.x > 505) {
        this.x = -100;
        row = getRandomRow();
        this.y = row[0]; //the first element of the array is y location
        this.row = row[1]; // the second element of the array is row number
        
        //increase speed after every time the enemy vehicle cycles, maxing out at 1000
        if (this.speed < 800) {
            this.speed = this.speed + 5;
        }
        
    }
    else {
        this.x = this.x + this.speed*dt;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 390;
    this.row = 5;
    this.col = 2;
}

//This function moves the player after checking that he is within the bounds of the board
Player.prototype.update = function(movex, movey, addrow, addcol) {

    //check that moving left/right doesn't move off the board
    if (this.x + movex >=0 && this.x + movex <= 404) { 
        this.x = this.x + movex;
        this.col = this.col + addcol;
    };

    //check that moving up.down doesn't move off the board
    if (this.row + addrow >= 0 && this.row + addrow <=5) { 
        this.y = this.y + movey;
        this.row = this.row + addrow;
    }
    //give 50 points if the player gets to the water.  Then reset the player's position.
    if (this.row === 0) {
        gameStats.updateScore(50);
        this.reset();
    };
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(keycode) {
    switch (keycode) {
        case 'left':
            player.update(-101, 0, 0, -1);
            break;
        case 'up':
            player.update(0, -83, -1, 0);
            break;
        case 'right':
            player.update(101, 0, 0, 1);
            break;
        case 'down':
            player.update(0, 83, 1, 0);
            break;
    }
}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 390;
    this.row = 5;
    this.col = 2;    
}

var Gem = function(sprite, points, keep, x, y, col, row) {
    this.sprite = sprite;
    this.points = points;
    this.keepfor = keep;
    this.shownfor = 0;
    this.x = x;
    this.y = y;
    this.row = row;
    this.col = col;
} 

Gem.prototype.render = function() {
    //draw the gem on the screen
    //set the size of the gem image so it is smaller than the actual image
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90, 90);
}

//once the gem reachvnes its time alotted, remove it from the board
Gem.prototype.update = function() {
    this.shownfor++;
    if (this.shownfor >= this.keepfor) {
        this.destroy(); 
    }
}

// Remove the Gem from the array either after time has elapsed, or it has been collected
Gem.prototype.destroy = function() {
    allGems.splice(this,1);
}

var GameStats = function() {
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
}

GameStats.prototype.updateScore = function(points)  {
    this.score += points;
}

GameStats.prototype.updateLives = function(lives) {
    this.lives += lives;
}

GameStats.prototype.reset = function() {
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
}

//draw the game stats on the top of the screen
// code from http://stackoverflow.com/questions/5573594/draw-text-on-top-of-rectangle
GameStats.prototype.render = function() {

    ctx.font = "18pt Arial";
    ctx.fillStyle = "#fff";
    ctx.lineWidth = 0.2;
    ctx.fillRect(200, 20, 300, 30);
    ctx.fillStyle = "#f80";
    ctx.fillText("Score: " + this.score, 350, 40);
    ctx.fillText("Lives: " + this.lives, 250, 40);
}

// render the score once the game is over
GameStats.prototype.renderFinalScore = function() {
    ctx.font = 'bold 50pt Arial';
    ctx.textAlign = 'center';

    ctx.fillStyle = '#f80';
    ctx.fillText("Game Over", ctx.canvas.width/2, 120);

    ctx.font = "bold 24pt Arial";
    ctx.fillText("Final Score was:" + this.score + " points.", ctx.canvas.width/2, 180);
    
    ctx.fillStyle = '#f00';
    ctx.fillText('Press an Arrow to Play Again', ctx.canvas.width/2, 450);

} 

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(58,200,1), new Enemy(140,300,2), new Enemy(224,100,3)
];

// Place the player object in a variable called player
var player = new Player;

//create empty gem array to hold all gems
var allGems = [];

//adding array of potential Gems
var gemList = [
    {
        'sprite': 'images/Gem Orange.png',
        'points': 250,
        'keep': 250
    },
    {
        'sprite': 'images/Gem Blue.png',
        'points': 100,
        'keep': 200
    },
    {
        'sprite': 'images/Gem Green.png',
        'points': 500,
        'keep': 300
    },
];

// Place the GameStats object in a variable called gameStats
var gameStats = new GameStats;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // If the Game is over - arrow keys will reset the game
    if (gameStats.gameOver === true) {
        player.reset();
        gameStats.reset();
    }
    else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});

//returns a random row containing y position and row number
function getRandomRow() {
    var rows = [[58,1],[140,2],[224,3]];
    var row = Math.floor(Math.random()*3); //code snippet from: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    return rows[row];
}

//returns a random column containing x position and col number
function getRandomColumn() {
    var cols = [[0,0],[101,1],[202,2],[303,3],[404,4]];
    var col = Math.floor(Math.random()*5); //code snippet from: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    return cols[col];
}

//returns a random GEM (3 possible), with blue being picked most often
function getRandomGem() {
    var randomGem = Math.round(Math.random()*2);
    return gemList[randomGem];
}

function addGem() {

    var gem = getRandomGem();
    var row = getRandomRow();
    var col = getRandomColumn();

    //adding 55 to the row position and 10 to the column position since the gem image has been resized
    var newGem = new Gem(gem.sprite, gem.points, gem.keep, col[0]+5, row[0]+55, col[1], row[1]);
    allGems.push(newGem);
}



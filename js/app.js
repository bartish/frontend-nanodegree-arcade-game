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
        
        //increase speed after every time the enemy vehicle passes
        if (this.speed < 1000) {
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
}
Player.prototype.update = function(dt) {

}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(keycode) {
    switch (keycode) {
        case 'left':
            movePlayer(-101, 0, 0);
            break;
        case 'up':
            movePlayer(0, -83, -1);
            break;
        case 'right':
            movePlayer(101, 0, 0);
            break;
        case 'down':
            movePlayer(0, 83, 1);
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(58,200,1), new Enemy(140,300,2), new Enemy(224,100,3)
    //new Enemy(224,100,3)
];
// Place the player object in a variable called player
var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomRow() {
    var rows = [[58,1],[140,2],[224,3]];
    var row = Math.floor(Math.random()*3); //code snippet from: http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    return rows[row];
}

//This function moves the player after checking that he is within the bounds of the board
function movePlayer(movex, movey, addrow) {

    //check that moving left/right doesn't move off the board
    if (player.x + movex >=0 && player.x + movex <= 404) { 
        player.x = player.x + movex;
    };

    //check that moving up.down doesn't move off the board
    if (player.y + movey >=48 && player.y + movey <= 390) { 
        player.y = player.y + movey;
        player.row = player.row + addrow;
    };
}

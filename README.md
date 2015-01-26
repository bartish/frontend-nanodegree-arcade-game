frontend-nanodegree-arcade-game
===============================

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.

----------Game play----------
Game will start on initial page load.  The game may be reset at anytime using the spacebar. Use the arrow keys (Up, Down, Left, Right) to move the player around the board. 

----------Objective----------
Score as many points before losing all 3 lives

----------Point Scoring----------
Player receives 50 points for reaching the water - upon completion they will be reset back to the original starting position.

Gems will pop-up intermittently through out the game, on a random square somewhere on the road.  Player will receive points for capturing the gems.  Gems will only stay on the board until they are collected or they have stayed on for a predetermined amount of time.  There are 3 different colors of gems:
--Orange: worth 250 points, will remain on the board for 250 time deltas (approximately 5 seconds)
--Blue: worth 100 points, will remain on the board for 200 time deltas (approximately 5 seconds)
--Green: worth 500 points, will remain on the board for 300 time deltas (approximately 6 seconds)

----------Enemies----------
Enemies move across the screen on the road.  Once they move across the board they will respawn in another random row.  Player will lose 1 life if they collide with an enemy.  Enemies increase speed everytime they cross the board.  

----------Game Information----------
Across the top of the screen, the current score and lives remaining will be displayed

----------End of Game----------
Once the player has used all 3 lives, the game is over and the final score will be displayed.  Use the spacebar to reset the game.
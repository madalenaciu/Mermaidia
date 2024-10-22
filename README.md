# Mermaidia
A simple diving game using p5.js and express.

The player has 10 lives and can move up, down, left, and right using the corresponding arrow keys.
The goal of the game is to reach the highest level possible. This is achieved by collecting awards (diamonds, banknotes, gold bars) that fall from the ship. Each award has a different monetary value. For every 100 points, the game level increases.
However, while trying to collect the awards, you must avoid the sharks that move from right to left, the sea snakes that move from left to right, and the octopuses that descend from above. Colliding with any of these will deduct one life.
As time passes, the speed at which obstacles appear is programmed to increase, making survival and collecting awards increasingly difficult.
The game ends when the player loses all their lives.

# Install express
<ol>
<li>Navigate to your project folder in the terminal.</li>
<li>Run the following command to initialize a package.json file: npm init -y</li>
<li>Install the express package running the follow command : npm install express</li>
<li>In the terminal, run:node server.js</li>
</ol>
So you can open your browser and navigate to http://localhost:3000/ to play the game!

# Install p5.js
In our file, we have included the command:
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"></script>
which incorporates the p5.js library, so you don't need to download it on your personal computer. 

Additionally, regarding the game's music, we have included the following command:
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"></script>

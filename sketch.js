let actor; //main character 
let obstacles = []; // list of obstacles(shark , octopus , eel)
let awards=[]; // list of awards(diamonds , money , gold)
let score = 0; //score=sum of awards that collects
let gameStarted = false;
var icon; //background image
var mermaid; //image for female character
var merman; //image for male character
var shark;  //image for shark
var eel;  //image for eel
var octopus; //image for octopus
let gracePeriod=false;
let lives=10; //number of actor's life
var diamonds; //image for diamond
var gold;     //image for gold
var money;    //image for money
var shipImg;  //image for ship
var ship;     //object of ship
var sky;      //image for sky
let incrFrame=80;
let playerChosen = false; //you have to choose a player before the game starts
let numOfgames=1; //indicates the level 
let viewed=false;  //to change the level only one time per 100 points increased
let gameSoundStart; //main background sound
let gameSoundOver;  //game over sound
let userStarted=false; 



function preload(){
  //load all the images and sounds for the game 
   gameSoundStart=loadSound('sunshine-jaunt-163686.mp3');
   gameSoundOver=loadSound('failure-2-89169.mp3');
   icon=loadImage('back.png');
   mermaid=loadImage('mermaid.png');
   merman=loadImage('merman.png');
   shark=loadImage('shark.png');
   eel=loadImage('eel.png');
   octopus=loadImage('kraken.png');
   money=loadImage('money.png');
   gold=loadImage('gold-bars.png');
   diamonds=loadImage('diamond.png');
   shipImg=loadImage('ship.png');
   sky=loadImage('sky.png');
}

function setup() {
  createCanvas(700, 600);
  ship=new Ship();
  actor=new Mermaid();
  startMusic(); 
}



function draw() {
  image(icon , 0 , 100 , 700 , 500); //put the sea image
  image(sky , 0 , 0 , 700 , 100); //put the sky image 

  if (gameStarted && playerChosen) {
    //the game starts 
    actor.display();
    handleInput();
    ship.display();
    ship.move();
  
    //add obstacles 
    if (frameCount % incrFrame === 0) {
      let type = floor(random(3));
      switch (type) {
        case 0:
          obstacles.push(new SharkObstacle());
          break;
        case 1:
          obstacles.push(new EelObstacle());
          break;
        case 2:
          obstacles.push(new OctopusObstacle());
          break;
      }
    }
    

    // Add awards
    if (frameCount % 180 === 0) {
      let awardType = floor(random(3));
      switch (awardType) {
        case 0:
          awards.push(new Diamond());
          break;
        case 1:
          awards.push(new Money());
          break;
        case 2:
          awards.push(new Gold());
          break;
      }
    }

    //each obstacle in list appears and start to move
    for (let obstacle of obstacles) {
      obstacle.display();
      obstacle.move();
      actor.hits(obstacle);  
    }
    //each award in list appears and start to fall
    for (let award of awards) {
      award.display();
      award.move();

      if (actor.collects(award)) {
        awards = awards.filter(a => a !== award); // Remove collected award
        score += award.points; // Increase score based on award type
      }
    }
    //increase the level after each 100 points collected [0-100 points(level1),101-200(level2) ,201-300(level3) etc.]
    if(score%100>=0 && viewed){
      numOfgames++;
      viewed=false;
      incrFrame-=10;//increase the difficulty(appear more obstacles)
      if(incrFrame<=0){
        incrFrame=10;
      }
    }

    if(score>=numOfgames*100){
      viewed=true; 
    }
  
    // Remove off-screen obstacles
    obstacles = obstacles.filter(obstacle => !obstacle.offscreen());
    //Display the level
    textSize(18);
    fill(255,0,0);
    text(`Level: ${numOfgames}`, 40, 70);
    //Display lives
    textSize(16);
    fill(0);
    text(`Lives: ${lives}`, 40, 50);
    // Display the score
    textSize(16);
    fill(0);
    text(`Score: ${score}`, 40, 30);

  }else{
    //the first screen of the game
    textSize(100);
    fill(255,255,255);
    textAlign(CENTER, CENTER);
    text(`Mermaidia` , width/2 , 200);
    
  }
}

//function for the moves of the main character
function handleInput() {
    if (keyIsDown(RIGHT_ARROW) && actor.x < width - 50) {
      actor.move(1, 0);
    }
    if (keyIsDown(LEFT_ARROW) && actor.x > 0) {
      actor.move(-1, 0);
    } 
    if (keyIsDown(DOWN_ARROW) && actor.y < height-70) {
      actor.move(0, 1);
    }
    if (keyIsDown(UP_ARROW) && actor.y > 100) {
      actor.move(0, -1);
    }
}

function startMusic(){
    userStarted=false;
    gameSoundStart.setVolume(0.2);
    gameSoundStart.loop();//the music plays continuously
}

function startGame() {
    var button = document.getElementById('startButton');
    button.style.display = 'none';
    if(playerChosen===false){
      //the section of choosing the player
      var container = document.getElementById('container');
      var paragraph = document.createElement('h1');
      paragraph.innerHTML = "Choose Player";
      container.appendChild(paragraph);
      paragraph.style.color='white';
      //Create the first button
      var button1 = document.createElement('button');
      button1.innerHTML = "Male";
      styleButton(button1);
      // Create the second button
      var button2 = document.createElement('button');
      button2.innerHTML = "Female";
      styleButton(button2);
      // Append buttons to the container
      container.appendChild(button1);
      container.appendChild(button2); 
      // window.onload
      button1.onclick=function(){
        ClickButton(button1 , button2 , paragraph , false);
      };
      button2.onclick=function(){
        ClickButton(button1,button2, paragraph , true);
      };
  }else{
    //the game starts
    gameStarted=true;
    loop();      
  }
}


function mousePressed() {
  // Check if the user has interacted with the page
  if (!userStarted) {
    // Start the audio context on the first user interaction
    userStarted = true;
    getAudioContext().resume().then(() => {
      console.log("Audio context resumed");
    });
  }
}

//function for the gender button
function ClickButton(btn1 , btn2 , par , gen){
    playerChosen=true;
    gameStarted=true;
    btn1.style.display='none';
    btn2.style.display='none';
    par.style.display='none';
    actor.setGender(gen);
    loop();        
}

function styleButton(btn){
  btn.style.padding='10px 20px';
  btn.style.fontSize='25px';
  btn.style.display='block';
  btn.style.backgroundColor='blueviolet';
  btn.style.color='white';
  btn.style.borderRadius='5px';
  btn.style.border='none';
}


function gameOver() {
  // Stop the game loop
  gameStarted = false;
  noLoop();
  //stop the main music and plays the game over music
  gameSoundStart.stop();
  gameSoundOver.play();
  //Display the game over message
  image(icon , 0 , 100 , 700 , 500);
  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 30);
  text(`Your Score: ${score}`, width / 2, height / 2 + 30);
  text("Press Enter to Play Again", width / 2, height / 2 + 90);      
}


function keyPressed() {
  // Check if the game is not started and the key pressed is the "Enter" key
  if (!gameStarted && keyCode === ENTER) {
    numOfgames=1;
    viewed=false;
    incrFrame=80;
    lives = 10; // Reset lives
    score = 0; // Reset score
    obstacles = []; // Reset obstacles
    awards = []; // Reset awards
    gracePeriod=false;
    startMusic();
    startGame(); // Start the game

  }
}


class Mermaid {
  constructor() {
    this.gender=true; //true==female , false == male
    this.width = 80;
    this.height = 80;
    this.x = width / 2 - this.width / 2;
    this.y = height- this.height - 10;
    this.speed = 5;
  }
  setGender(gen){
    this.gender=gen;
  }
  display() {
    if(this.gender){
      image(mermaid, this.x, this.y, this.width, this.height);
    }else{
      image(merman, this.x, this.y, this.width, this.height);
    } 
  }

  move(xDirection, yDirection) {
    this.x += xDirection * this.speed;
    this.y += yDirection * this.speed;
  }

  hits(obstacle) {
    if (gracePeriod) {
      return;
    }
    if (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      ) {
        lives--;
        gracePeriod=true;
        if(lives==0){
          gameOver();
          return;
       }
        setTimeout(function(){
           gracePeriod=false;
        },2000);
      }
    return false;
  }

  collects(award) {
    return (
      this.x < award.x + award.width &&
      this.x + this.width > award.x &&
      this.y < award.y + award.height &&
      this.y + this.height > award.y
    );
  }

}


class Obstacle {
  constructor() {
    if (new.target === Obstacle) {
      throw new Error('Cannot instantiate abstract class Obstacle');
    }
    this.x = random(width - 50);
    this.y = 100;
    this.width = 50;
    this.height = 50;
  }
  display(){
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }
  move() {}
  offscreen() {}

}
class SharkObstacle extends Obstacle {
  constructor() {
    super();
    this.color = color(0, 0, 255);
    this.speed = 3; 
    this.x=width;
    this.y=floor(random(100 , 500));
  }

  move() {
    this.x-= this.speed; //Shark moves horizontally from right to left
     
  }

  display() {
   image(shark, this.x, this.y, this.width, this.height);
  }
}

class EelObstacle extends Obstacle {
  constructor() {
    super();
    this.color = color(0, 255, 0);
    this.speed = 5; 
    this.x=0;
    this.y=floor(random(100 , 500));
  }

  move() {
    this.x += this.speed; // Eel moves horizontally from left to right
  }
  display() {
    image(eel, this.x, this.y, this.width, this.height);
  }
}

class OctopusObstacle extends Obstacle {
  constructor() {
    super();
    this.color =color(119, 0,200);
    this.speed = 7;
  }
  move(){
    this.y+=this.speed;
  }

  display() {
    image(octopus, this.x, this.y, this.width, this.height);
  }
}

class Award {
  constructor() {
    this.x=ship.x;// the ship throws the awards 
    this.y = 100;
    this.width=40;
    this.height=40;
  }

  move() {
    this.y += 5;
  }

  offscreen() {
    return this.y > height-100;
  }
}

class Diamond extends Award {
  constructor() {
    super();
    this.points = 20; // Customize points for a diamond
  }

  display() {
    image(diamonds, this.x, this.y, this.width, this.height);
  }
}

class Money extends Award {
  constructor() {
    super();
    this.points = 15; // Customize points for money
  }

  display() {
    image(money, this.x, this.y, this.width, this.height);
  }
}

class Gold extends Award {
  constructor() {
    super();
    this.points = 30; // Customize points for gold
  }

  display() {
    image(gold, this.x, this.y, this.width, this.height);
  }
}

class Ship {
  constructor() {
    this.width=60;
    this.height=60;
    this.x = width / 2 - this.width / 2;
    this.y =40; // Adjusted the y-position to be at the top of the canvas
    this.speed = 2;
    this.direction = 1; // 1 for right, -1 for left
  }

  display() {
    image(shipImg, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed * this.direction;
    // Change direction when reaching the canvas boundaries
    if (this.x <= 0 || this.x + this.width >= width) {
      this.direction *= -1;
    }
  }
}
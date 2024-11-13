let player;
let obstacles = [];// Array to store obstacles
let obstacleSpeed = 3;// Speed of the obstacles
let score = 0;

function setup() {
  createCanvas(400, 400);
  player = new Player();
  frameRate(60);// Set the frame rate to 60 frames per second
}

function draw() {
  background(220);

  // Display the score
  textSize(16);
  fill(0);
  text("Score: " + score, 10, 20);

  // Update and display the player
  player.update();
  player.display();

 // Generate a new obstacle every second
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
    score++;
  }
// Update and display each obstacle
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].display();

    // Check for collision with the player
    if (obstacles[i].hits(player)) {
      textSize(32);
      fill(255, 0, 0);
      text("Game Over!", width / 2 - 80, height / 2);
      noLoop(); // Stop the game loop
    }

    // Remove obstacles that are off the screen
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }
}
// Detect key presses
function keyPressed() {
  // If 'A' or 'a' is pressed, move player left
  if (key === 'A' || key === 'a') {
    player.move(-1);
    // If 'D' or 'd' is pressed, move player right
  } else if (key === 'D' || key === 'd') {
    player.move(1);
  }
}
// Player class definition
class Player {
  constructor() {
    this.w = 40;
    this.h = 20;
    this.x = width / 2 - this.w / 2;
    this.y = height - this.h - 10;
    this.speed = 5;
  }
// Move the player method
  move(dir) {
    this.x += dir * this.speed;
    this.x = constrain(this.x, 0, width - this.w);
  }

  update() {
    this.x = constrain(this.x, 0, width - this.w);
  }

  display() {
    fill(0, 0, 255);
    rect(this.x, this.y, this.w, this.h);
  }
}
// Obstacle class definition
class Obstacle {
  constructor() {
    this.w = random(20, 50);
    this.h = 20;
    this.x = random(0, width - this.w);
    this.y = 0;
  }
// Update the obstacle's position
  update() {
    this.y += obstacleSpeed;
  }
 // Display the obstacle
  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }
// Check if the obstacle is off the screen
  offscreen() {
    return this.y > height;// Return true if the obstacle is past the bottom of the canvas
  }
// Check if the obstacle collides with the player
  hits(player) {
    return (
      this.y + this.h > player.y &&
      this.y < player.y + player.h &&
      this.x + this.w > player.x &&
      this.x < player.x + player.w
    );
  }
}
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//These 2 variables determine the starting circles location, in this case, the top left of the screen.
var ball = {x: c.width/2, y: c.height/2, ballSize: 16, dx:0, dy:10}
var rightPressed = false;
var leftPressed = false;
var gravity = .20; //Sets the gravity pulling the ball to the ground.
var damping = 0.75; //The rate at which the ball slows down.

//this function draws the bird
function drawCircle() {
  ctx.save();
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "FF00FF";
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  //ctx.beginPath();
  //ctx.arc(ball.x, ball.y, ball.ballSize, 0, Math.PI*2); //The circle, on frame one, will always start at the top left, and its size will always be set to ballSize.
  //ctx.fillStyle = "#FF00FF"; //Sets the color of the circle to light blue.
  //ctx.fill(); //Fills in the circle with the color provided in fillStyle.
  //ctx.stroke();
}

//This function checks for collision with the pipes and if the ball has passed trought a pipe
function collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight) {
  if ((ball.x + ball.dx + ball.ballSize > lowRectX) && (ball.x + ball.dx + ball.ballSize < lowRectX + 2)) {//checks if the ball has passed between the pipes
    score ++; //it yes, add one to score
    console.log(score); //log the score in the console
    document.getElementById('score').innerHTML = "Score = " + score;// shows the score on the screen
  }
  if ((ball.x + ball.dx + ball.ballSize > upRectX) && (ball.y + ball.ballSize < upRectHeight) && (ball.ballSize + ball.x < upRectX + upRectWid)) { //checks for collision with the top pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((ball.y + ball.dy - ball.ballSize < upRectHeight) && (ball.x + ball.ballSize < upRectWid + upRectX + 50) && (ball.ballSize + ball.x > upRectX)) { //checks for collision with the bottom of the top pipe
    gameState = 2;//if true, ends the game
  }
  if ((ball.x + ball.dx + ball.ballSize > lowRectX) && (ball.y + ball.ballSize > lowRectY) && (ball.ballSize + ball.x < lowRectX + lowRectWid)) { //checks for the collision with the bottom pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((ball.y + ball.dy + ball.ballSize > lowRectY) && (ball.x + ball.ballSize < lowRectWid + lowRectX + 50) && (ball.ballSize + ball.x > lowRectX)) { //checks for collision with the top of the bottom pipe
    gameState = 2;//if true, ends the game
  }
}

//This function draws the pipes and the ball as well as sicking the score up and checking for collision
function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  drawCircle();//draws the ball
  if (ball.x + ball.dx > c.width - ball.ballSize || ball.x + ball.dx < ball.ballSize) { //If the circle's x position exceeds the width of the canvas...
    ball.dx = -ball.dx; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
  }
  if(ball.y + ball.dy > c.height - ball.ballSize || ball.y + ball.dy < ball.ballSize) { //If the circle's y position exceeds the height of the canvas...
    ball.dy = 0; //Its y direction will be flipped, and it's speed will decrease.
  }
  ball.dy += gravity; //Adds the gravity value to the ball's ball.dy value, giving it a artificial force of gravity.
  ball.x += ball.dx;
  if (((ball.y + ball.dy) + ball.ballSize) <= c.height) {//prevents the ball from falling off the canvas
    ball.y += ball.dy;
  }
  if(rightPressed) {
    ball.dx = 3;
    if (ball.dx + ball.ballSize > c.width){
      ball.dx = c.width - ball.ballSize;
    }
  }
  else if(leftPressed) {
    ball.dx = -3;
    if (ball.dx < 0){
      ball.dx = -3;
    }
  }
  else if (rightPressed == false || leftPressed == false) {
    ball.dx = 0;
  }
}

setInterval(draw, 10);//makes the game run

document.addEventListener("keydown", makeBounce);//listens for a key press
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function makeBounce(e) {
 if (e.key == " ") {//if the spacebar is pressed the ball gains y velcity
   ball.dy -= 8;
 }
 if (e.key == "x") {//if thr "r" key is pressed the x direction is flipped
   window.location.reload();
 }
}

function keyDownHandler(e) {
    if(e.key == "d") {
        rightPressed = true;
    }
    else if(e.key == "a") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "d") {
        rightPressed = false;
    }
    else if(e.key == "a") {
        leftPressed = false;
    }
}
//

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//These 2 variables determine the starting circles location, in this case, the top left of the screen.
var rect = {x: c.width/2, y: c.height/2, width: 30,height: 60,  dx:0, dy:10}
var rightPressed = false;
var leftPressed = false;
var gravity = .20; //Sets the gravity pulling the rect to the ground.
var damping = 0.75; //The rate at which the rect slows down.

//this function draws the bird
function drawCircle() {
  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.fillStyle = "FF00FF";
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  //ctx.beginPath();
  //ctx.arc(rect.x, rect.y, rect.rectSize, 0, Math.PI*2); //The circle, on frame one, will always start at the top left, and its size will always be set to rectSize.
  //ctx.fillStyle = "#FF00FF"; //Sets the color of the circle to light blue.
  //ctx.fill(); //Fills in the circle with the color provided in fillStyle.
  //ctx.stroke();
}

//This function checks for collision with the pipes and if the rect has passed trought a pipe
function collisionCheck(lowRectX, lowRectY, lowRectWid, lowRectHeight, upRectX, upRectY, upRectWid, upRectHeight) {
  if ((rect.x + rect.dx + rect.width > lowRectX) && (rect.x + rect.dx + rect.width < lowRectX + 2)) {//checks if the ball has passed between the pipes
    score ++; //it yes, add one to score
    console.log(score); //log the score in the console
    document.getElementById('score').innerHTML = "Score = " + score;// shows the score on the screen
  }
  if ((rect.x + rect.dx + rect.width > upRectX) && (rect.y + rect.width < upRectHeight) && (rect.width + rect.x < upRectX + upRectWid)) { //checks for collision with the top pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((rect.y + rect.dy - rect.width < upRectHeight) && (rect.x + rect.width < upRectWid + upRectX + 50) && (rect.width + rect.x > upRectX)) { //checks for collision with the bottom of the top pipe
    gameState = 2;//if true, ends the game
  }
  if ((rect.x + rect.dx + rect.width > lowRectX) && (rect.y + rect.width > lowRectY) && (rect.width + rect.x < lowRectX + lowRectWid)) { //checks for the collision with the bottom pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((rect.y + rect.dy + rect.width > lowRectY) && (rect.x + rect.width < lowRectWid + lowRectX + 50) && (rect.width + rect.x > lowRectX)) { //checks for collision with the top of the bottom pipe
    gameState = 2;//if true, ends the game
  }
}

//This function draws the pipes and the ball as well as sicking the score up and checking for collision
function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  drawCircle();//draws the ball
  if (rect.x + rect.dx > c.width - rect.width || rect.x + rect.dx < rect.width) { //If the circle's x position exceeds the width of the canvas...
    rect.dx = 0; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
  }
  if(rect.y + rect.dy > c.height - rect.width || rect.y + rect.dy < rect.width) { //If the circle's y position exceeds the height of the canvas...
    rect.dy = 0; //Its y direction will be flipped, and it's speed will decrease.
  }
  rect.dy += gravity; //Adds the gravity value to the rect's rect.dy value, giving it a artificial force of gravity.
  rect.x += rect.dx;
  if (((rect.y + rect.dy) + rect.height) <= c.height) {//prevents the rect from falling off the canvas
    rect.y += rect.dy;
  }
  if(rightPressed) {
    rect.dx = 3;
    if (rect.dx + rect.width > c.width){
      rect.dx = c.width - ball.width;
    }
  }
  else if(leftPressed) {
    rect.dx = -3;
    if (rect.dx < 0){
      rect.dx = -3;
    }
  }
  else if (rightPressed == false || leftPressed == false) {
    rect.dx = 0;
  }
}

setInterval(draw, 10);//makes the game run

document.addEventListener("keydown", makeBounce);//listens for a key press
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function makeBounce(e) {
 if (e.key == " ") {//if the spacebar is pressed the rect gains y velcity
   rect.dy -= 8;
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

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//These 2 variables determine the starting circles location, in this case, the top left of the screen.
var ball = {x: c.width/2, y: c.height/2, ballSize: 16, dx:10, dy:10}
var gravity = .07; //Sets the gravity pulling the ball to the ground.
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
  if ((ball.x + dx + ball.ballSize > lowRectX) && (ball.x + dx + ball.ballSize < lowRectX + 2)) {//checks if the ball has passed between the pipes
    score ++; //it yes, add one to score
    console.log(score); //log the score in the console
    document.getElementById('score').innerHTML = "Score = " + score;// shows the score on the screen
  }
  if ((ball.x + dx + ball.ballSize > upRectX) && (ball.y + ball.ballSize < upRectHeight) && (ball.ballSize + ball.x < upRectX + upRectWid)) { //checks for collision with the top pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((ball.y + dy - ball.ballSize < upRectHeight) && (ball.x + ball.ballSize < upRectWid + upRectX + 50) && (ball.ballSize + ball.x > upRectX)) { //checks for collision with the bottom of the top pipe
    gameState = 2;//if true, ends the game
  }
  if ((ball.x + dx + ball.ballSize > lowRectX) && (ball.y + ball.ballSize > lowRectY) && (ball.ballSize + ball.x < lowRectX + lowRectWid)) { //checks for the collision with the bottom pipe on the left side
    gameState = 2;//if true, ends the game
  }
  if ((ball.y + dy + ball.ballSize > lowRectY) && (ball.x + ball.ballSize < lowRectWid + lowRectX + 50) && (ball.ballSize + ball.x > lowRectX)) { //checks for collision with the top of the bottom pipe
    gameState = 2;//if true, ends the game
  }
}

//This function draws the pipes and the ball as well as sicking the score up and checking for collision
function draw() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //Clears the canvas every frame, so a new circle can be drawn.
  if (gameState == 1) {
    //makePipe(rectLower.xPos, rectLower.yPos, rectLower.width, rectLower.height, rectUpper.xPos, rectUpper.yPos, rectUpper.width, rectUpper.height);//draws the pipes
    if (difficultTimer == 1000) {//checks the timmer to see how difficult to make the game
      spaceDifficulty = spaceDifficulty - 40;//decreases the space between pipes
      if (spaceDifficulty < 200) {//prevents the pipes from getting to close
        spaceDifficulty = 200;
      }
      difficultTimer = 0;//resets the difficulty
    }
    if (timer == spaceDifficulty) {//checnksn the frequencey at which pipes are made
      var chance = Math.floor(Math.random() * (1 - 4) + 4);// 1 out of 3 chance to draw a pipe of a random height
      if (chance == 1) {//makes a gap between the pipes
        var rectHUp = Math.floor(Math.random() * (190 - 150) + 150);//randomly generates the height of the pipe
        var rectHLow = Math.floor(Math.random() * (190 - 150) + 150);//randomly generates the height of the pipe
      }
      if (chance == 2) {//this makes the pipe gap closer to the bottom of the screen
        var rectHUp = Math.floor(Math.random() * (310 - 290) + 290);//randomly generates the height of the pipe
        var rectHLow = Math.floor(Math.random() * (90 - 70) + 70);//randomly generates the height of the pipe
      }
      if (chance == 3) {//this makes the pipe gap closer to the top of the screen
        var rectHUp = Math.floor(Math.random() * (90 - 70) + 70);//randomly generates the height of the pipe
        var rectHLow = Math.floor(Math.random() * (310 - 290) + 290);//randomly generates the height of the pipe
      }
      var rectW = Math.floor(Math.random() * (125 - 100) + 100);//gives a random width for the rectangle
      var newRect = {xPosL: c.width-rectW, yPosL: c.height-rectHLow, widthL: rectW, heightL: rectHLow, xPosU: c.width-rectW, yPosU: 0, widthU: rectW, heightU: rectHUp};//has the info to draw a top and bottom pipe
      rectArray.push(newRect);//pushes the newly created pipe into to be used later in a loop
      timer = 0;//resets the timer
    }
    for (var i = 0; i < rectArray.length; i++) {//uses rectArray to draw the new pipes on screen
      makePipe(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);//draws the pipes
      rectArray[i].xPosL --;//allows the pipes to move from right to left
      rectArray[i].xPosU --;//allows the pipes to move from right to left
    }
    drawCircle();//draws the ball
    if (ball.x + dx > c.width - ball.ballSize || ball.x + dx < ball.ballSize) { //If the circle's x position exceeds the width of the canvas...
      dx = -dx; //The ball's x direction will be flipped, and it will bounce a specific distance (damping).
    }
    if(ball.y + dy > c.height - ball.ballSize || ball.y + dy < ball.ballSize) { //If the circle's y position exceeds the height of the canvas...
      dy = -dy * damping; //Its y direction will be flipped, and it's speed will decrease.
    }
    dy += gravity; //Adds the gravity value to the ball's dy value, giving it a artificial force of gravity.
    ball.x += dx;
    if (dy < -1) {//tells drawCircle what direction the bird is moving
      imageCounter = 1;
    }
    else if (dy > 2) {//tells drawCircle what direction the bird is moving
      imageCounter = 2;
    }
    else {//tells drawCircle what direction the bird is moving
      imageCounter = 0;
    }
    console.log(imageCounter);
    if (((ball.y + dy) + ball.ballSize) <= c.height) {//prevents the ball from falling off the canvas
      ball.y += dy;
    }
    for (var i = 0; i < rectArray.length; i++) {//checks to see if the ball is colliding with the pipes
      collisionCheck(rectArray[i].xPosL, rectArray[i].yPosL, rectArray[i].widthL, rectArray[i].heightL, rectArray[i].xPosU, rectArray[i].yPosU, rectArray[i].widthU, rectArray[i].heightU);
    }
    timer ++;//increments the timmer to make the pipe placement closer
    difficultTimer ++;//increments to increase the difficulty
  }
  if (gameState == 2) {
    drawEnd();
    //location.reload();
  }
}

setInterval(draw, 10);//makes the game run

document.addEventListener("keydown", makeBounce);//listens for a key press
function makeBounce(e) {
 if (e.key == " ") {//if the spacebar is pressed the ball gains y velcity
   dy -= 3;
   gameState = 1;
 }
 if (e.key == "x") {//if thr "r" key is pressed the x direction is flipped
   window.location.reload();
 }
}

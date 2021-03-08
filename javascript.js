var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var rect = {x: c.width/2, y: c.width/2, width: 30, height: 60, dx: 0, dy: 10};
var rightPressed = false;
var leftPressed = false;
var gravity = .07;

//this function draws the character (currently only drawing a rectangle)
function drawRect() {
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.fill();
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  drawRect();
  if (rect.x + rect.dx > c.width - rect.width || rect.x + rect.dx < rect.width) {
    rect.dx = 0;
  }
  if (rect.y + rect.dy > c.height || rect.y + rect.dy < rect.width) {
    rect.dx = 0;
  }
  rect.dy += gravity;
  rect.x += rect.dx
  if (((rect.y + rect.dy) + rect.width) <= c.height) {
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

setInterval(draw, 10);

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

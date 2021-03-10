var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var rect = {x: 10, y: 10, width: 30, height: 60, dx: 0, dy: 0};
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function drawRect() {
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.fillStyle = "magenta";
  ctx.fill();
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  drawRect();
  if ((rect.x + rect.dx) > (c.width - rect.width) || (rect.x + rect.dx) < rect.width) {
    rect.dx = rect.dx * -1;
  }
  if ((rect.y + rect.dy) > (c.height - rect.height) || (rect.y + rect.dy) < rect.height) {
    rect.dy = rect.dy * -1;
  }
  rect.x += rect.dx;
  if (((rect.y + rect.dy) + rect.height) <= c.height) {
    rect.y +- rect.dy;
  }
  if(rightPressed) {
    rect.dx = 3;
    if (rect.dx + rect.width > c.width){
      rect.dx = c.width - ball.width;
    }
    console.log("right");
  }
  else if(leftPressed) {
    rect.dx = -3;
    if (rect.dx < 0){
      rect.dx = -3;
    }
    console.log("left");
  }
  else if(upPressed) {
    rect.dy = 3;
    if (rect.dy < 0){
      rect.dy = 3;
    }
    console.log("up");
  }
  else if(downPressed) {
    rect.dy = -3;
    if (rect.dy < 0){
      rect.dy = -3;
    }
    console.log("down");
  }
  else if (rightPressed == false || leftPressed == false || upPressed == false || downPressed == false) {
    rect.dx = 0;
  }
  console.log("false");
}

setInterval(draw, 10);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keydown", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "d") {
    rightPressed = true;
  }
  else if (e.key == "a") {
    leftPressed = true;
  }
  else if (e.key == "w") {
    upPressed = true;
  }
  else if (e.key == "s") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "d") {
    rightPressed = false;
  }
  else if (e.key == "a") {
    leftPressed = false;
  }
  else if (e.key == "w") {
    upPressed = false;
  }
  else if (e.key == "s") {
    downPressed = false;
  }
}

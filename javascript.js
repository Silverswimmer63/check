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
}

setInterval(draw, 10);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keydown", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key) {

  }
}

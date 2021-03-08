var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var rect = {x: c.width/2, y: c.width/2, width: 30, height: 60, dx: 0, dy: 10};
var gravity = .07;

//this function draws the character (currently only drawing a rectangle)
function drawRect() {
  ctx.beginPath();
  ctx.rect(ball.x, ball.y, ball.width, ball.height);
  ctx.fill();
  ctx.stroke();
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//Make a function that will take 2 sets of coordinates in form {x:number y:number} and determine the straight line distiance
//done on problem 27
function check1(start, end) {
  var one = start.x - end.x;
  var two = start.y - end.y;
  var dist = Math.sqrt(one * one + two * two);
  return dist;
}

//Make a function that will take a string and capitalize the first letter of each word, and return the result
//done on problem 13
function check2(string) {
  var words = string.split(" ");
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    var out = words.join(" ");
  }
  return out;
}

//Make a function that draws a circle in a random location on a 400 x 400 canvas
//done on problem 22
function check3() {
  var rad = Math.floor(Math.random() * 50) + 1;
  var xPos = Math.floor(Math.random() * (c.width - (rad * 2))) + rad;
  var yPos = Math.floor(Math.random() * (c.height - (rad * 2))) + rad;
  //var xPos = (Math.floor(Math.random() * 400 - (rad * 2))) + rad;
  //var yPos = (Math.floor(Math.random() * 400 - (rad * 2))) + rad;
  ctx.beginPath();
  ctx.arc(xPos, yPos, rad , 0, 2 * Math.PI);
  ctx.stroke();
}

setInterval(check3, 500);

//Make a function called maketop that take for input an object in the form of {x: number, y:number, width:number, height:number, color: string} and returns an object
//(using Pipepart if you've made that, if not, then just a {} object) that is a topper for the pipe. It should be 20 wider than the pipe (so 10 on each side)
//and 10 tall, and positioned on top of the pipe. You need not draw just, just get the numbers
//done for problem 34
function maketop(obj) {
  
}

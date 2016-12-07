var canvas = document.getElementById("bcg-cnvs");
var context = canvas.getContext("2d");
var PIXEL = 20;

// set background to a transparent grid
context.fillStyle = "grey";
context.fillRect(0,0,canvas.width,canvas.height);
var i = 0;
var j = 0;
while (j<canvas.height){
  if (j%2==0){
    i = 0;
  }
  else {
    i = 1;
  }
  while (i<canvas.width){
    context.fillStyle = "rgb(204,204,204)"
    context.fillRect(i*20,j*20,PIXEL,PIXEL)
    i+=2;
  }
  j+=1;
}

context.fillText("MIDDLE AISLE",600,0);
context.rotate(Math.PI*2/(i*6));
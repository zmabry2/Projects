var canvas = document.getElementById("draw-cnvs");
var context = canvas.getContext("2d");
var isMouseDown = false;
var mouseX = 0;
var mouseY = 0;
var PIXEL = 20;
var w = canvas.width;
var h = canvas.height;
var total = w*h/(PIXEL*PIXEL)-2*PIXEL*h/(PIXEL*PIXEL);

var clear = true;
// middle aisle
context.fillStyle = "black";
context.fillRect(600,0,40,520);

// draw text
context.save();
context.fillStyle = "white";
context.translate(0,0);
context.rotate(Math.PI/2);
context.font = "40px san-serif";
context.textAlign = "left";
context.fillText("MIDDLE AISLE",100,-605);
context.restore();

context.fillStyle = "rgba(255,165,0,255)";
// swatch interactivity
var palette = document.getElementById("palette");
var swatches = palette.children;
var currentSwatch; // we'll keep track of what swatch is active in this.
var currentColor = "rgba(255,165,0,255)";
var count = {"rgba(0,0,0,0)":total,"rgba(255,165,0,255)":0,"rgba(255,255,0,255)":0,"rgba(0,0,0,255)":0,"rgba(165,42,42,255)":0,"rgba(0,0,255,255)":0,"rgba(255,0,0,255)":0,"rgba(0,128,0,255)":0,"rgba(255,255,255,255)":0};
var storage = [];
var storeCount = [];

for (var i = 0; i < swatches.length; i++) {
    var swatch = swatches[i];
    if (i == 0) {
        currentSwatch = swatch;
    }

    // when we click on a swatch...
    swatch.addEventListener("click",function (evt) {
        this.className = "active"; // give the swatch a class of "active", which will trigger the CSS border.
        currentSwatch.className = ""; // remove the "active" class from the previously selected swatch
        currentSwatch = this; // set this to the current swatch so next time we'll take "active" off of this.

        context.fillStyle = this.style.backgroundColor; // set the background color for the canvas.
        currentColor = this.style.backgroundColor;
        currentColor = toRGBA(currentColor);
    });
}

// when the user presses their mouse down on the canvas.
canvas.addEventListener("mousedown",function (evt) {
    isMouseDown = true;

    mouseX = evt.offsetX;
    mouseY = evt.offsetY;

    // context.beginPath();
    context.moveTo(mouseX, mouseY);
});

// when the user lifts their mouse up anywhere on the screen.
window.addEventListener("mouseup",function (evt) {
    isMouseDown = false;
    storage.push(writeData());
    storeCount.push(writeCount());
});

var lastX=0;
var lastY=0;
// as the user moves the mouse around.
canvas.addEventListener("mousemove",function (evt){
    if (isMouseDown) {
        mouseX = evt.offsetX;
        mouseY = evt.offsetY;
        currentX = parseInt(mouseX/PIXEL)*PIXEL;
        currentY = parseInt(mouseY/PIXEL)*PIXEL;

        var pastData = context.getImageData(currentX,currentY,1,1).data;
        var pastColor = "rgba("+pastData[0]+","+pastData[1]+","+pastData[2]+","+pastData[3]+")";

        // context.lineTo(mouseX, mouseY);
        if ((currentX != lastX)||(currentY != lastY)){
	        if (mouseX < 600 || mouseX > 640){
	        context.fillRect(currentX,currentY,PIXEL,PIXEL);
	        if (currentColor in count){
            count[currentColor]++;
          }else{
            count[currentColor] = 1;
          }
          count[pastColor]--;

          document.getElementById(currentColor).innerHTML = count[currentColor];
          document.getElementById(pastColor).innerHTML = count[pastColor];
        }
        lastX = currentX;
        lastY = currentY;
    }
  }
});

canvas.addEventListener("click",function (evt){
        mouseX = evt.offsetX;
        mouseY = evt.offsetY;
        currentX = parseInt(mouseX/PIXEL)*PIXEL;
        currentY = parseInt(mouseY/PIXEL)*PIXEL;

        var pastData = context.getImageData(currentX,currentY,1,1).data;
        var pastColor = "rgba("+pastData[0]+","+pastData[1]+","+pastData[2]+","+pastData[3]+")";

        // context.lineTo(mouseX, mouseY);
        if ((currentX != lastX)||(currentY != lastY)){
	        if (mouseX < 600 || mouseX > 640){
	        context.fillRect(currentX,currentY,PIXEL,PIXEL);
	        if (currentColor in count){
            count[currentColor]++;
          }else{
            count[currentColor] = 1;
          }
          count[pastColor]--;

          document.getElementById(currentColor).innerHTML = count[currentColor];
          document.getElementById(pastColor).innerHTML = count[pastColor];
        }
        lastX = currentX;
        lastY = currentY;
    }
    storage.push(writeData());
    storeCount.push(writeCount());
  }
);
// when the clear button is clicked
var clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click",function(evt) {
    var r = window.confirm("Are you sure you want to clear the canvas?");
    if(r){
    context.clearRect(0,0,600,canvas.height);
    context.clearRect(640,0,canvas.width, canvas.height);
    resetCount();
    count["rgba(0,0,0,0)"] = total;
    };
});

//when the fill button is clicked
var fillBtn = document.getElementById("fill");
fillBtn.addEventListener("click",function(evt) {
    var s = window.confirm("Are you sure you want to Fill? (This will cover your current design with the fill color!)");
    	if(s){
	context.fillRect(0,0,600,canvas.height);
    	context.fillRect(640,0,canvas.width, canvas.height);
    	resetCount();
    	count[currentColor] = 1560;
    	document.getElementById(currentColor).innerHTML = count[currentColor];
    	};
});
// when the save button is clicked
var saveBtn = document.getElementById("save");
saveBtn.addEventListener("click",function (evt) {
if(!isValid()){
    window.alert("Invalid submission!");
}else{
var r = window.confirm("Are you sure you want to submit the canvas?");
    if(r){
    var r = window.confirm("Canvas submitted.");
	var dataURL = canvas.toDataURL();
	$.ajax({
  type: "POST",
  url: "script.php",
  data: { 
     imgBase64: dataURL
  }
}).done(function(o) {
  console.log('saved'); 
  // If you want the file to be visible in the browser 
  // - please modify the callback in javascript. All you
  // need is to return the url to the file, you just saved 
  // and than put the image in your browser.
});
}
}

//
// in older browsers you may need to substitute those last two lines of code with this:
     //window.open(dataUri,"_blank");
});


var undoBtn = document.getElementById("undo");
undoBtn.addEventListener("click",function(evt){
  readData();
  displayCount();
  context.fillStyle = currentColor;
});

function toRGBA(str) {
  str = str.split(' ').join('');
  if (str.charAt(3) != 'a'){
    var temp = str.substring(0,3);
    rgb = str.substring(3,str.length-1);
    str = temp+"a"+rgb+",255)";
  }
  return str
}


function toColor(array){
  return "rgba("+array[0]+","+array[1]+","+array[2]+","+array[3]+")"
}

function maxCount(){
    count[currentColor] = 1560;
}

function resetCount() {
  for (var key in count){
  try{
    count[key] = 0;
    document.getElementById(key).innerHTML = 0;
    }
  catch(TypeError){
    continue;
  }
  }
}


function writeData(){
  currentCanvas = new Array(w);
  for (var i=0;i<w/PIXEL;i++){
    currentCanvas[i] = new Array(h);
  }
  for (var i=0;i<w;i+=PIXEL){
    for (var j=0;j<h;j+=PIXEL){
      var currentPixel = toColor(context.getImageData(i,j,1,1).data);
      currentCanvas[i/PIXEL][j/PIXEL] = currentPixel;
    }
  }
  return currentCanvas;
}

function readData(){
  storage.pop();
  storage.pop();
  storage.pop();
  if (storage.length == 0){
  	context.clearRect(0,0,600,canvas.height);
    	context.clearRect(640,0,canvas.width, canvas.height);
    	return;
  }
  data = storage.pop();
  for (var i=0;i<w/PIXEL;i++){
    for (var j=0;j<h/PIXEL;j++){
      if (data[i][j]=="rgba(0,0,0,0)"){
        context.clearRect(i*PIXEL,j*PIXEL,PIXEL,PIXEL);
      }
      if (i*PIXEL < 600 || i*PIXEL > 640){
        context.fillStyle = data[i][j];
        context.fillRect(i*PIXEL,j*PIXEL,PIXEL,PIXEL);
      }
    }
  }
}

function displayCount() {
  storeCount.pop();
  storeCount.pop();
  storeCount.pop();
  if (storeCount.length==0){
    resetCount();
    count["rgba(0,0,0,0)"] = total;
    return;
  }
  count = storeCount.pop();
  for (var key in count){
  try{
    document.getElementById(key).innerHTML = count[key];
    }
  catch(TypeError){
    continue;
  }
  }
}

function writeCount(){
  var c = {};
  for (key in count){
    c[key] = count[key];
  }
  return c;
}

function isValid(){
  if (count["rgba(0,0,0,0)"] != 0){
    return false;
  }
  if (count["rgba(255,165,0,255)"]>1860){
    return false;
  }
  if (count["rgba(255,255,0,255)"]>900){
    return false;
  }
  if (count["rgba(0,0,0,255)"]>1020){
    return false;
  }
  if (count["rgba(165,42,42,255)"]>660){
    return false;
  }
  if (count["rgba(0,0,255,255)"]>1860){
    return false;
  }
  if (count["rgba(255,0,0,255)"]>780){
    return false;
  }
  if (count["rgba(0,128,0,255)"]>1050){
    return false;
  }
  if (count["rgba(255,255,255,255)"]>1830){
    return false;
  }
  return true;
}
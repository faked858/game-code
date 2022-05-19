17/05/22

//get canvas
window.onload=startCanvas
//listen for a keypress
window.addEventListener('keydown', keyFunction)

var WIDTH = 75
var HEIGHT = 75
var ctx


//load canvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 10)
}



//this is used to update the canvas every frame, anything that moves must be put in here
function updateCanvas() {
	//ctx.fillstyle = "white";
	ctx.fillRect(0,0, HEIGHT, WIDTH)
	console.log("frame")
	
}


//this function is called when a key is pressed 
function keyFunction(keyboardEvent){
	var keyPress = keyboardEvent.key
	///console.log("you pressed ", keyPress)
	
} 
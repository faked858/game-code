//author: parker

//get canvas
window.onload=startCanvas
//listen for a keypress
window.addEventListener('keydown', keyFunction)
window.addEventListener('keyup', keyFunction)


var WIDTH = 75
var HEIGHT = 75
var ctx

var playerX = 100
var playerY = 100

var velocityX = 3
var velocityY = 3

var upPressed = false
var downPressed = false
var leftPressed = false
var rightPressed = false


//load canvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 10)
}

console.log(upPressed)

//this is used to update the canvas every frame, anything that moves must be put in here
function updateCanvas() {
	//ctx.fillstyle = "white";
	ctx.fillRect(playerX, playerY, HEIGHT, WIDTH)
	///console.log("frame")
	
	if(upPressed == true){
		playerX += velocityX
	}


}


//this function is called when a key is pressed 
function keyFunction(keyboardEvent){
	var keyPress = keyboardEvent.key
	
	///console.log("you pressed ", keyPress)
	
	if (keyPress=="w"){
		upPressed = true
	}
	if (keyPress=="a"){
		leftPressed = true
	}
	if (keyPress=="s"){
		downPressed = true
	}
	if (keyPress=="d"){
		rightPressed = true
	}


} 
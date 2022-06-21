//author: parker

//get canvas
window.onload=startCanvas
//listen for a keypress
window.addEventListener('keydown', keyDownFunction)
window.addEventListener('keyup', keyUpFunction)

var playerHeight = 75;
var playerWidth = 75;

var WIDTH = 1000;
var HEIGHT = 800;
var ctx

var playerX = 100;
var playerY = 100;

var velocityX = 3;
var velocityY = 3;

var upPressed = false
var downPressed = false
var leftPressed = false
var rightPressed = false

var gravity = 0.5;
var gravitySpeed = 0.5;
var friction = 0.9;

//load canvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 10)
}

console.log(upPressed)

//this is used to update the canvas every frame, anything that moves must be put in here
function updateCanvas() {
	ctx.fillStyle="white"
	ctx.fillRect(0,0,WIDTH, HEIGHT)

	
	
	ctx.fillStyle = "black";
	ctx.fillRect(playerX, playerY, playerHeight, playerWidth)
	///console.log("frame")
	
	if(rightPressed == true){
		playerX += velocityX
	}
	if(leftPressed == true){
		playerX -= velocityX
	}
	if(downPressed == true){
		playerY += velocityY
	}
	if(upPressed == true){
		playerY -= velocityY
	}

	//boundry collison
	if (playerX + playerWidth >= WIDTH){
		playerX = WIDTH - playerWidth
		
	}
	if(playerX < WIDTH - WIDTH){
		playerX = WIDTH - WIDTH
	}
	if(playerY + playerHeight >= HEIGHT){
		playerY = HEIGHT - playerHeight
	}
	if(playerY < HEIGHT - HEIGHT){
		playerY = HEIGHT - HEIGHT
	}
		
	//console.log(velocityY)
	//gravity
	//if(playerY < WIDTH - playerHeight){
	//	playerY = playerY + velocityY + gravity
	//}
	this.gravitySpeed += this.gravity;
        this.playerY += this.velocityY + this.gravitySpeed;
	}


//this function is called when a key is pressed 
function keyDownFunction(keyboardEvent){
	var keyPress = keyboardEvent.key
	
	///console.log("you pressed ", keyPress)
	//move when key is pressed
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

function keyUpFunction(keyboardEvent){
	//stop moving when key is relesed 
	upPressed = false
	leftPressed = false
	rightPressed = false
	downPressed = false
}

function collide(){
	if (playerX + playerWidth >= WIDTH){
		playerX = WIDTH - playerWidth
	}

}
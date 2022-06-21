//author: parker

//get canvas
window.onload=startCanvas
//listen for a keypress
window.addEventListener('keydown', keyDownFunction)
window.addEventListener('keyup', keyUpFunction)

const PLAYER_IMAGE = new Image()
PLAYER_IMAGE.src = "pixilart-drawing.png"

var playerHeight = 75;
var playerWidth = 75;

var WIDTH = 1000;
var HEIGHT = 800;
var ctx

var velocityX = 3;
var velocityY = 3;

var upPressed = false
var downPressed = false
var leftPressed = false
var rightPressed = false

var gravity = 0.5;
var gravitySpeed = 0.25;
var friction = 0.9;

var jump = 0.15
var jumpSpeed = 50
var trueJump = false 

class GameObject{
	constructor(id,image,x,y,width,height,pWidth,pHeight){
		this.id=id;
		this.image=image
		this.x=x
		this.y=y
		this.width=width
		this.height=height
		this.pWidth=75
		this.pHeight=75
	}

	collide(){
		if(this.x + this.pWidth >= WIDTH){
			this.x = WIDTH - this.pWidth}
		if(this.x <= WIDTH - WIDTH){
		this.x = WIDTH - WIDTH}
		if(this.y + this.pHeight >= HEIGHT){
			this.y = HEIGHT - this.pHeight}
		if(this.y < HEIGHT - HEIGHT){
			this.y = HEIGHT - HEIGHT
		}
	}
	
	setPos(x,y){
		this.x=x
		this.y=y
	}

	draw(){
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
	}


}

var player = new GameObject("player",PLAYER_IMAGE,100,100,playerWidth,playerHeight)

//load canvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 10)
}



//this is used to update the canvas every frame, anything that moves must be put in here
function updateCanvas() {
	ctx.fillStyle="white"
	ctx.fillRect(0,0,WIDTH, HEIGHT)
	
	player.draw()
	
	ctx.fillStyle = "black";
	//ctx.fillRect(player.x, player.y, playerHeight, playerWidth)
	///console.log("frame")
	
	//calls the player movement functon
	movementFunction()

	//boundry collison function
	//collisionFunction()
		
	//gravityFunction
	gravityFunction()	
	
	//jump
	jumpFunction()
	
	//friction

	player.collide()
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
//allows player collision with the boundrys, might be redundent later because i need to make a new collision system
/*function collisionFunction() {
if (player.x + playerWidth >= WIDTH){
	player.x = WIDTH - playerWidth
}
if(player.x < WIDTH - WIDTH){
	player.x = WIDTH - WIDTH
}
if(player.y + playerHeight >= HEIGHT){
	player.y = HEIGHT - playerHeight
}
if(player.y < HEIGHT - HEIGHT){
	player.y = HEIGHT - HEIGHT
}
}*/

//this is the gravity function, makes gravity work 
function gravityFunction() {
if(player.y < HEIGHT - playerHeight && upPressed != true){
	gravitySpeed += gravity;
    player.y += velocityY + gravitySpeed;
	} else{
		gravitySpeed = 0
	}
}

//makes the player move
function movementFunction(){
if(rightPressed == true){
	player.x += velocityX
}
if(leftPressed == true){
	player.x -= velocityX
}
if(downPressed == true){
	player.y += velocityY
}
if(upPressed == true){
	player.y -= velocityY
}
}

function jumpFunction() {
if(upPressed == true && player.y < HEIGHT - player.height){
	jumpSpeed -= jump;
	player.y -= velocityY + jumpSpeed
	trueJump = true
} else{
	jumpSpeed = 0
	trueJump = false
}
}


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

var velocityX = 0;
var velocityY = 0;

var upPressed = false
var leftPressed = false
var rightPressed = false

var gravity = 0.5;
var friction = 0.9;

var jump = 0.15
var trueJump = false 

var tick = 0


//player object
class GameObject{
	constructor(id,image,x,y,width,height,pWidth,pHeight,){
		this.id=id;
		this.image=image
		this.x=x
		this.y=y
		this.width=width
		this.height=height
		this.pWidth=playerWidth
		this.pHeight=playerHeight
		//contsructor variable
	}

	collide(){//collision detection
		if(this.x + this.pWidth >= WIDTH){//if right side of player is more than or equal to the right side of the canvas
			this.x = WIDTH - this.pWidth}//make sure player doesnt clip out of map
		if(this.x <= WIDTH - WIDTH){//if left side of player is less than or equal to left side of the canvas
		this.x = WIDTH - WIDTH}//stops left side of player leaving canvas
		if(this.y + this.pHeight >= HEIGHT){//if the bottom of the player is more than or equal to the bottom of the canvas
			this.y = HEIGHT - this.pHeight}//stop the player from leaving the map from the bottom
		if(this.y < HEIGHT - HEIGHT){//if the top of the player is more than or equal to the top of the canvas
			this.y = HEIGHT - HEIGHT//stop the player from leaving the canvas from the top
		}
	}
	
	setPos(x,y){
		this.x=x
		this.y=y
	}

	draw(){//draw the player
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
	}


}

var obsticales = [];//obsticales
var num = 2//number of obsticales
function generateObstacles(){//create obsticales
	for(i = 0; i < num; i++) {
		platforms.push(
			{//obsticale data
			x: 100 * i,
			y: 200 + (30 * i),
			width: 110,
			height: 15
			}
		);
	}
}

function renderObsticales(){//render obsticales
	ctx.fillStyle ="black"
	ctx.fillRect(obsticales[0].x, obsticales[0].y, obsticales[0].width, obsticales[0].height);//obsticale 1
    ctx.fillRect(obsticales[1].x, obsticales[1].y, obsticales[1].width, obsticales[1].height);//obsticale 2
	console.log("is this working?")
}


//create the player, using info from the gameobject 
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
	
	renderObsticales()

	//draw the player
	player.draw()
	
	//calls the player movement functon
	movementFunction()
	
	//friction
	frictionFunction()

	//calls the collide function
	player.collide()
	
	console.log(trueJump)//used for trobleshooting my jump code
}


//this function is called when a key is pressed 
function keyDownFunction(keyboardEvent){
	///console.log("you pressed ", keyPress)
	//move when key is pressed
	switch(keyboardEvent.key){
		case "w":
		upPressed = true
		break;
		case "a":
		leftPressed = true
		break;
		case "d":
		rightPressed = true
	}
} 



function keyUpFunction(keyboardEvent){
	//stop moving when key is relesed 
	switch(keyboardEvent.key){
		case "w":
		upPressed = false
		break;
		case "a":
		leftPressed = false
		break;
		case "d":
		rightPressed = false
	}
	
}
if(upPressed == false && velocityY < -2){
	velocityY = -3
}


//makes the player move
function movementFunction(){
if(rightPressed == true){
	velocityX = 3 //if the right key is pressed then velocity = 3
}
if(leftPressed == true){//when the left key is pressed, go left
	velocityX = - 3
}
if(upPressed == true && trueJump == false){
	velocityY = -10//jump
}
if(rightPressed || leftPressed == true){
	player.x += velocityX//adds X velocity to player x position
}
player.y += velocityY//adds y velocity value to player y position
}


function frictionFunction(){//this function also calculates gravity
	if(trueJump == false){//if player isnt jumping then theres friction
		velocityX *= friction
	}else{//if the player is off the ground then apply gravity
		velocityY += gravity;//gravity mechanism
	}
	if(player.y + player.pHeight >= HEIGHT){//when truejump should be false or true
		trueJump = false
	}else{
		trueJump = true
	}
}

//author: parker

//get canvas
window.onload=startCanvas
//listen for a keypress
window.addEventListener('keydown', keyDownFunction)
window.addEventListener('keyup', keyUpFunction)

const PLAYER_IMAGE = new Image()
PLAYER_IMAGE.src = "pixilart-drawing.png"

const playerHeight = 75
const playerWidth = 75

var WIDTH = 1000
var HEIGHT = 800
var ctx

var velocityX = 0
var velocityY = 0

var upPressed = false
var leftPressed = false
var rightPressed = false

var gravity = 0.5
var friction = 0.9

var jump = 0.15
var trueJump = false 

//player object
class GameObject{
	constructor(id,image,x,y,width,height){
		this.id=id;
		this.image=image
		this.x=x
		this.y=y
		this.width=width
		this.height=height
		//contsructor variable
	}

	collide(){//collision detection
		if(this.x + playerWidth >= WIDTH){//if right side of player is more than or equal to the right side of the canvas
			this.x = WIDTH - playerWidth}//make sure player doesnt clip out of map
		if(this.x <= WIDTH - WIDTH){//if left side of player is less than or equal to left side of the canvas
		this.x = WIDTH - WIDTH}//stops left side of player leaving canvas
		if(this.y + playerHeight >= HEIGHT){//if the bottom of the player is more than or equal to the bottom of the canvas
			this.y = HEIGHT - playerHeight}//stop the player from leaving the map from the bottom
		if(this.y < HEIGHT - HEIGHT){//if the top of the player is more than or equal to the top of the canvas
			this.y = HEIGHT - HEIGHT//stop the player from leaving the canvas from the top
		}
	}
	
	setPos(x,y){//might need this later
		this.x=x
		this.y=y
	}

	draw(){//draw the player
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
	}


}

class obstacle{//obsticales
	constructor(x,y,width,height,colour){
		this.x=x
		this.y=y
		this.width=width
		this.height=height
		this.colour=colour
	}

	checkCollision(){
	let i = -1;
    if(player.x + playerWidth > this.x &&//if right side of player is more than left side of obsticle
		player.x < this.x + this.width &&//if left side of player is less than right side of obsticle
		player.y + playerHeight > this.y &&//if bottom of player is more than the top of the obsticle
		player.y < this.y +this.height){//if top of player is less than bottom of obsticle 
			i++//add one to i
		}else{
			i = -1
		}
		if (i > -1){//if i is more than -1 then not jumping and set player y to obsticle top
			trueJump = false;
			player.y = obsticales[i].y - playerHeight;   
		}
	}
	
}

var obsticales = []
function generateObstacles(num){//create obsticales, num is amount of obsticales
	for(i = 1; i < num; i++){// keep making obsticales till obsticale amount == num
		obsticales.push(new obstacle(//create new obsticale with this data
			100 * i,//x
			650 + (30 * i),//y
			110,//width
			15,//height
			"black"//colour
		)
		)
	}
}

function obsticalesColision(){
	for(i = 0; i < obsticales.length; i++){//serches through the array
		obsticales[i].checkCollision();//adds colision to any object 
	}
}

function renderObsticales(){//render obsticales
	ctx.fillStyle = "black";
	ctx.fillRect(obsticales[0].x, obsticales[0].y, obsticales[0].width, obsticales[0].height, obsticales[0].colour)//obsticale 1
    ctx.fillRect(obsticales[1].x, obsticales[1].y, obsticales[1].width, obsticales[1].height, obsticales[1].colour)//obsticale 2
	
}

//create the player, using info from the gameobject 
var player = new GameObject("player",PLAYER_IMAGE,100,100,playerWidth,playerHeight)

//load canvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	generateObstacles(3)//3 is number of obsticles i want to make
	console.log(obsticales.length)
	timer = setInterval(updateCanvas, 10)
}



//this is used to update the canvas every frame, anything that moves must be put in here
function updateCanvas() {
	ctx.fillStyle="white"
	ctx.fillRect(0,0,WIDTH, HEIGHT)
	
	renderObsticales()
	
	obsticalesColision()

	//draw the player
	player.draw()
	
	//calls the player movement functon
	movementFunction()
	
	//friction
	frictionFunction()

	//calls the collide function
	player.collide()

	player.x += velocityX//adds velocity to player.x
}


//this function is called when a key is pressed 
function keyDownFunction(keyboardEvent){
	var keyPress = keyboardEvent.key
	
	///console.log("you pressed ", keyPress)
	//move when key is pressed
	switch(keyPress){
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
	if(player.y + playerHeight >= HEIGHT){//when truejump should be false or true
		trueJump = false
	}else{
		trueJump = true
	}
}

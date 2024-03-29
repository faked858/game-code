//author: parker

//get canvas
window.onload=startCanvas
//listen for a keypress
window.addEventListener('keydown', keyDownFunction)
window.addEventListener('keyup', keyUpFunction)

const FPS = 10//amount of times to update canvas every second
const PLAYER_IMAGE = new Image()//player sprite
PLAYER_IMAGE.src = "pixilart-drawing.png"//player sprite source

const COIN_IMAGE = new Image()//coin sprite
COIN_IMAGE.src = "Coin.png"//coin sprite image source

const MAIN_MENU = new Image()//main menu 
MAIN_MENU.src = "MainMenu.png"//main menu source

const WIN_SCREEN = new Image()//win screen
WIN_SCREEN.src = "YouWinScreen.png"//win screen source

const PLAYERSIZE = 75//player dimensions

const PLAYERSPEED = 3//speed of player
const SPAWNLOCATION = 100// where the player spawns, i use this for x and y coordinates

const CANVASCOORDS = 0//coordinates to draw the canvas frame refresh(white square)

var WIDTH = 1000//canvas width
var HEIGHT = 800//canvas height
var ctx//getting context

var velocityX = 0//x speed
var velocityY = 0//y speed

var upPressed = false//used for movement
var leftPressed = false//used for movement
var rightPressed = false//used for movement

var gravity = 0.5//gravity
var friction = 0.9//used for friction in friction function

var jump = 0.15//minus this from momentum to create realistic jump
var trueJump = false//if player is in air or not
const JUMPHEIGHT = -10//height of player jump

var obstNum = 9//amount of obsticles i want to generate
const OBSTICALEWIDTH = 110//obsticle width
const OBSTICALEHEIGHT = 15//obsticle height
const OBSTICLECOLOUR = "black"//obsticle colour
var obsacleSpace = 50//move obsticales by this amount if needed

var startScreen = false//the start screen

var coinXOffset = 40//coins are drawn reletive to the platforms, this is the x offset from each platform 
var coinYOffset = -50//coins are drawn reletive to the platforms, this is the y offset from each platform 
var coinScore = 0//coinscore goes up by one each time a coin is taken
const COINTAKEOFFSET = -3000//when coins are taken, add this to their coordinates to make them dissapear
const COIN_SIZE = 30//width and height for coins


//player object
class GameObject{
	constructor(id,image,x,y,width,height){
		this.id=id
		this.image=image
		this.x=x
		this.y=y
		this.width=width
		this.height=height
		//contsructor variables
	}

	collide(){//collision detection
		if(this.x + PLAYERSIZE >= WIDTH){//if right side of player is more than or equal to the right side of the canvas
			this.x = WIDTH - PLAYERSIZE}//make sure player doesnt clip out of map
		if(this.x <= WIDTH - WIDTH){//if left side of player is less than or equal to left side of the canvas
		this.x = WIDTH - WIDTH}//stops left side of player leaving canvas
		if(this.y + PLAYERSIZE >= HEIGHT){//if the bottom of the player is more than or equal to the bottom of the canvas
			this.y = HEIGHT - PLAYERSIZE}//stop the player from leaving the map from the bottom
		if(this.y < HEIGHT - HEIGHT){//if the top of the player is more than or equal to the top of the canvas
			this.y = HEIGHT - HEIGHT//stop the player from leaving the canvas from the top
		}
	}

	draw(){//draw the player
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
	} 

	movementFunction(){//makes the player move
		if(rightPressed == true){
			velocityX = PLAYERSPEED //if the right key is pressed then velocity = 3
		}
		if(leftPressed == true){//when the left key is pressed, go left
			velocityX = - PLAYERSPEED
		}
		if(upPressed == true && trueJump == false){
			velocityY = JUMPHEIGHT//jump
		}
		if(rightPressed || leftPressed == true){
			player.x += velocityX//adds X velocity to player x position
		}
		player.y += velocityY//adds y velocity value to player y position
	}

	frictionFunction(){//this function also calculates gravity
		if(trueJump == false){//if player isnt jumping then theres friction
			velocityX *= friction
		}else{//if the player is off the ground then apply gravity
			velocityY += gravity;//gravity mechanism
		}
		if(player.y + PLAYERSIZE >= HEIGHT){//determens wether truejump should be false or true
			trueJump = false
		}else{
			trueJump = true
		}
	}
}


class Obstacle{//obsticales
	constructor(x,y,width,height,colour,id){
		this.x=x
		this.y=y
		this.width=width
		this.height=height
		this.colour=colour
		this.id=id
	}

	checkCollision(){
    if(player.x + PLAYERSIZE > this.x &&//if right side of player is more than left side of obsticle
		player.x < this.x + this.width &&//if left side of player is less than right side of obsticle
		player.y + PLAYERSIZE > this.y &&//if bottom of player is more than the top of the obsticle
		player.y < this.y +this.height){//if top of player is less than bottom of obsticle 
			trueJump = false;
			player.y = this.y - PLAYERSIZE;//player is sitting on top of obstacle
		}
	}
}

function obstacleRelocate(){
	for(i = 0; i < obsticales.length; i++){//searches through the array
		if(obsticales[i].x + obsticales[i].width >= WIDTH){//if right side of obsticale is past the right edge of the canvas
			//console.log("there is an obsticle outside the right side of the canvas")
			obsticales[i].x -= obsacleSpace//move obsticale inside the canvas
			coin[i].x -= obsacleSpace//move the coin with the obsticale
		}
		if(obsticales[i].y >= HEIGHT - obsacleSpace){//if the top of the obsticale is below 50 pixles above the bottom of the canvas
			//console.log("there is an obsticale outisde the bottom of the canvas")
			obsticales[i].y -= obsacleSpace//move obsticale up from beneath
			coin[i].y -= obsacleSpace//move coin with obsticale
		}
	}
}

/*
WIP
function obsticaleBubble(){//spaces out the obsticales so they arent so close to eachother
	for(i = 1; i < obstNum; i++){
		let ii = i - 1;
	if(obsticales[i].x - obsacleSpace < obsticales[ii].x + obsticales[ii].width + obsacleSpace &&//if left side of obsticale A bubble is overlapping right side of obsticale B bubble
 		obsticales[i].x + obsticales[i].width + obsacleSpace > obsticales[ii].x - obsacleSpace &&//if the right side of obsticale A bubble is more than left side of obsticale B bubble
 		obsticales[i].y + obsticales[i].height + obsacleSpace > obsticales[ii].y - obsacleSpace &&//if bottom of obsticale A bubble overlaps top of obsticale B bubble
 		obsticales[i].y - obsacleSpace < obsticales[ii].y + obsticales[ii].y + obsacleSpace){//if top of obsticale A bubble is less than bottom of obsticale B bubble
		console.log("obsticale 2 is coliding with obsticale 3")
		//obsticales[i].x += Math.floor(Math.random() * 25)
		//obsticales[i].y += Math.floor(Math.random() * 25)
 		}
	}
}
*/

var obsticales = []//obsticles 
function generateObstacles(num){//create obsticales, num is amount of obsticales
	let randomX = 250
	let randomY = 500
	let YMultiply = 200
	for(i = 0; i < obstNum; i++){// keep making obsticales till obsticale amount == num
		obsticales.push(new Obstacle(//create new obsticale with this data
		randomX * i * Math.random(),//random ish x position
		randomY + (YMultiply * i) * Math.random(),//random ish y position
			OBSTICALEWIDTH,//width
			OBSTICALEHEIGHT,//height
			OBSTICLECOLOUR,//colour
			i
		)
		)
	}
}


function obsticalesColision(){//add collision to all obsticales for the player
	for(i = 0; i < obsticales.length; i++){//serches through the array
		obsticales[i].checkCollision()//adds colision to any object 
	}
}


function renderObsticales(){//render obsticales
	ctx.fillStyle = OBSTICLECOLOUR;//colour the obsticles
	for(let i = 0; i < obsticales.length; i ++){//how many obsticles to draw
		//console.log(i+","+obsticales.length)//troubleshooting
		ctx.fillRect(obsticales[i].x, obsticales[i].y, obsticales[i].width, obsticales[i].height, obsticales[i].colour)//draws obsticles
	}
}


//create the player, using info from the gameobject 
var player = new GameObject("player",PLAYER_IMAGE,SPAWNLOCATION,SPAWNLOCATION,PLAYERSIZE,PLAYERSIZE)

function startScreenFunction(){
	if(startScreen == false){//if startScreen is false, then draw main menu
		ctx.drawImage(MAIN_MENU, CANVASCOORDS, CANVASCOORDS, WIDTH, HEIGHT)//show the start screen
	}
	if(coinScore >= obsticales.length){//when you collect all the coins
		ctx.drawImage(WIN_SCREEN, CANVASCOORDS, CANVASCOORDS, WIDTH, HEIGHT)//display the win screen
		console.log("you win!")
	}
}


//load canvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	generateObstacles(obstNum)//obstNum is obsticles amount
	generateCoins()//create the coins
	//console.log("obsticles length, " + obsticales.length)//used for troubleshooting
	timer = setInterval(updateCanvas, FPS)//update canvas
}


//this is used to update the canvas every frame, anything that moves must be put in here
function updateCanvas(){
	ctx.fillStyle="white"
	ctx.fillRect(CANVASCOORDS,CANVASCOORDS,WIDTH, HEIGHT)//refrshes canvas every frameawd
	ctx.font = "30px Arial"
	ctx.fillStyle = "black"
	ctx.fillText("your coinScore is "+ coinScore, 10, 30)

	renderObsticales()//draws the obsticles
	
	obsticalesColision()//colision function for obsticles 

	//draw the player
	player.draw()

	//calls the player movement functon
	player.movementFunction()
	
	//friction
	player.frictionFunction()

	//calls the collide function
	player.collide()

	drawCoin()//draws coins

	coinCollideCheck()//collision for coins

	console.log("coin score is "+ coinScore)

	player.x += velocityX//adds velocity to player.x

	startScreenFunction()//loads the start screen

	obstacleRelocate()//stops obsticales from leaving canvas

	//obsticaleBubble()

	//console.log(obsticales.length)
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
		break;
		case "W":
		upPressed = true
		break;
		case "A":
		leftPressed = true
		break;
		case "D":
		rightPressed = true

	}
	if(keyboardEvent.key == "f"){//if f pressed, stop drawing startScreen
		startScreen = true
	}
	if(keyboardEvent.key == "F"){//the or statement wasnt working in the if statement above so i just made another one for capital F
		startScreen = true
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
		break;
		case "W":
		upPressed = false
		break;
		case "A":
		leftPressed = false
		break;
		case "D":
		rightPressed = false
	}
}

class coins{
	constructor(x,y,image,coinTaken,width,height){
		this.x=x
		this.y=y
		this.image=image
		this.coinTaken=coinTaken
		this.width=width
		this.height=height
	}

	coinCollide(){
		if(player.x + PLAYERSIZE > this.x &&//if right side of player is more than left side of obsticle
		player.x < this.x + this.width &&//if left side of player is less than right side of obsticle
		player.y + PLAYERSIZE > this.y &&//if bottom of player is more than the top of the obsticle
		player.y < this.y +this.height){//if top of player is less than bottom of obsticle 
			return true
		}
	}
}


var coin = []//coin array, stores all coin info
function generateCoins(){
	for(let i = 0; i < obsticales.length; i ++){//generate a coin per obsticle 
		coin.push(new coins(//push new coin into array
		obsticales[i].x + coinXOffset,//x position within all the obsticles 
		obsticales[i].y + coinYOffset,//y position above all the obsticles 
		COIN_IMAGE,//add the coin image
		false,//cointaken is false
		COIN_SIZE,//width for colision
		COIN_SIZE//height for colision
		)
		)
	}
}


function drawCoin(){//draw the coins
	for(let i = 0; i < coin.length; i ++){//i is how many coins to draw, only draw as many coins as there are obsticales, coin length should be obsticale length
		if(coin[i].coinTaken == false){//if coin isnt touched
			ctx.drawImage(COIN_IMAGE, coin[i].x, coin[i].y)//draw each coin with the coin image and its x and y coordinates
		}
	}
}

function coinCollideCheck(){//adds colision to any object in the array
	for(i = 0; i < coin.length; i++){//serches through the array
		if(coin[i].coinCollide()){//if player touches coins
			coin[i].coinTaken = true//coin has been taken
			coinScore++//coin score is used to tell the player what their score will be
			coin[i].x = COINTAKEOFFSET//take the coins off the screen 
		}
	}
}
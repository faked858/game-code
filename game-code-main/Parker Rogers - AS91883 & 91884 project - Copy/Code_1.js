17/05/22

//get canvas
window.onload=startCanvas
window.addEventListener('keydown', keyFunction)

var WIDTH = 75
var HEIGHT = 75
var ctx

//load canvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 10)

}

function updateCanvas() {
	//ctx.fillstyle = "white";
	ctx.fillRect(0,0, HEIGHT, WIDTH)
	
	
}

function keyFunction(keyboardEvent){
	var keyPress = keyboardEvent.key
	///console.log("you pressed ", keyPress)
	
} 
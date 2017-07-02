var ship;
var bullets = [];
var asteroids = [];
var state = "start";
var key_pressed = false;
function preload(){
	fontVector = loadFont("./libraries/Vectorb.ttf");
	
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	textFont(fontVector);
	textAlign(CENTER,CENTER);
	stroke(255);
	noFill();
	
}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	//should have 3 states: start, playing, and game_over
	
	background(0);

	
	if (state == "start"){
		textSize(100);
		text("ASTEROIDS",width/2,height/3); 
		textSize(25);
		text("Press any key to begin",width/2,2*height/3);
		
		if (keyIsPressed){
			state = "playing";
			ship = new spaceship();
			key_pressed = false;
		}
	}
	
	if (state == "playing"){
		ship.update();
		ship.show();
		for (i = bullets.length-1 ; i >= 0 ; i--){
			bullets[i].show();
		}

	}
	if (state == "game_over"){
		textSize(100);
		text("GAME OVER",width/2,height/2);
		if (keyIsPressed)
			key_pressed = true;
		if(!keyIsPressed && key_pressed){
			state = "start";
			asteroids.splice(0,asteroids.length);
		}
	}

	if(asteroids.length == 0){
		for(i = 0; i < 10; i++){
			asteroids.push(new asteroid(createVector(random(width/3)+(width/3)*random([0,2]),random(height/3)+(height/3)*random([0,2]))));
		}
	} 
	for (i = asteroids.length-1 ; i >= 0 ; i--){
		asteroids[i].show();
	}
}





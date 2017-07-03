var ship;
var bullets = [];
var asteroids = [];
var dead_asteroids = [];
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
	noCursor();
	
}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	//should have 3 states: start, playing, and game_over
	
	background(0);

	
	if (state == "start"){
		ship = new spaceship();
		textSize(100);
		text("ASTEROIDS",width/2,height/3); 
		textSize(25);
		text("Press any key to begin",width/2,2*height/3);
		
		if (keyIsPressed){
			state = "playing";
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
		while(asteroids.length<=10){
			var aster = new asteroid(createVector(random(width),random(height)),3);
			if (aster.distance(ship.pos)>400)
				asteroids.push(aster);
		}
	} 
	for (i = asteroids.length-1 ; i >= 0 ; i--){
		asteroids[i].show();
	}
}





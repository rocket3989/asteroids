var ship;
var bullets = [];
var asteroids = [];
var state = "start";
var key_pressed = false;
var score = 0;
var lives = 5;
var alive = true;
var dead = false;
var last_beep = 0;
var playing = 0;
var interval = 50;

function preload(){
	fontVector = loadFont("./libraries/Vectorb.ttf");
	sound_fire = loadSound("./sounds/fire.wav");
	sound_bangL = loadSound("./sounds/bangLarge.wav");
	sound_bangM = loadSound("./sounds/bangMedium.wav");
	sound_bangS = loadSound("./sounds/bangSmall.wav");
	sound_thrust = loadSound("./sounds/thrust.wav");
	sound_thrust.setVolume(.25);
	sound_high = loadSound("./sounds/beat1.wav");
	sound_low = loadSound("./sounds/beat2.wav");
	// sound_ = loadSound("./sounds/.wav");
	// sound_ = loadSound("./sounds/.wav");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new spaceship();
	textFont(fontVector);
	textAlign(CENTER,CENTER);
	stroke(255);
	noFill();
	frameRate(100);
	//noCursor();
	
}
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	//should have 3 states: start, playing, and game_over
	
	background(0);

	
	if (state == "start"){
		score = 0;
		textSize(100);
		text("ASTEROIDS",width/2,height/3); 
		textSize(25);
		text("Press any key to begin",width/2,2*height/3);
		
		if (keyIsPressed){
			ship.state = alive;
			state = "playing";
			key_pressed = false;
			ship.pos = createVector(width/2,height/2)
		}
	}
	
	if (state == "playing"){
		for (i = bullets.length-1 ; i >= 0 ; i--){
			bullets[i].show();
		}
		if (frameCount - last_beep>interval){
			if (playing)
				sound_high.play();
			else
				sound_low.play();
			interval--;
			if (interval < 10)
				interval = 60;
			playing = !playing;
			this.last_beep = frameCount;
		}
	}
	if (state == "game_over"){
		textSize(100);
		text("GAME OVER",width/2,height/2);
		
		if (keyIsPressed)
			key_pressed = true;
		if(!keyIsPressed && key_pressed){
			lives = 5;
			state = "start";
			asteroids.splice(0,asteroids.length);
			bullets.splice(0,bullets.length);
		}
	}
	
	ship.update();
	ship.show();
	
	if(asteroids.length == 0){
		while(asteroids.length<=9){
			var aster = new asteroid(createVector(random(width),random(height)),3);
			if (aster.distance(ship.pos)>400)
				asteroids.push(aster);
		}
	} 
	for (i = asteroids.length-1 ; i >= 0 ; i--){
		asteroids[i].show();
	}
	
	for(x = 0; x < lives; x++){
		push();
			translate(10+(25*x),50);
			rotate(3*PI/2);
			beginShape();
				vertex(15,0);
				vertex(-14,8);
				vertex(-8,6);
				vertex(-8,-6);
				vertex(-14,-8);
			endShape(CLOSE);
		pop();
	}
	
	push();		
		textAlign(LEFT,TOP);
		textSize(20);
		text(score,1,1);
		text(parseInt(frameRate()),1,100);
	pop();
}
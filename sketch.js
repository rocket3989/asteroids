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
		text("ASTEROIDS",100,200); 
		textSize(25);
		text("Press any key to begin", 225,300);
		
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
		text("GAME OVER",100,200);
		if (keyIsPressed)
			key_pressed = true;
		if(!keyIsPressed && key_pressed){
			state = "start";
			asteroids.splice(0,asteroids.length);
		}
	}

	if(asteroids.length == 0){
		for(i = 0; i < 10; i++){
			console.log(width);
			asteroids[i] = new asteroid(createVector(random(width/5)*random([1,5]),random(height/5)*random([1,5])));
		}
	} 
	for (i = asteroids.length-1 ; i >= 0 ; i--){
		asteroids[i].show();
	}
}



function bullet(velocity,position,angle){
	//constants
	this.max_life = 50;
	this.bullet_velocity = 10;
	
	this.life = 0;
	this.pos = position;
	this.angle = angle;
	this.vel = p5.Vector.fromAngle(this.angle).setMag(this.bullet_velocity);
	this.vel.add(velocity);
	
	
	
	this.show = function(){
		this.pos.add(this.vel);                     
		this.pos.set((width+this.pos.x)%width,(height+this.pos.y)%height);
		this.life ++;
		if (this.life > this.max_life){
			this.kill();
			
		}
		point(this.pos.x,this.pos.y);
		
	}
	this.kill = function(){
		bullets.splice(bullets.indexOf(this),1);
	}
	this.distance = function(target_pos){
		return this.pos.dist(target_pos);
	}

}
function asteroid(position,size){
	//constants
	this.max_component = 1;
	
	this.size = size
	this.vel = createVector(random(this.max_component),random(this.max_component));
	this.pos = position;
	this.points = [];
	for (index = 0; index < 12; index++){
		this.points[index]=random(20,50);
	}
	
	
	
	this.show = function(){
		this.pos.add(this.vel);
		this.pos.set((width+this.pos.x)%width,(height+this.pos.y)%height);
		
		for(index = 0; index < bullets.length; index++){
			if (bullets[index].distance(this.pos)< 40){
				this.kill();
				bullets[index].kill();
			}
		}
		
		
		
		
		
		push();
			translate(this.pos.x,this.pos.y);
			rotate(this.angle);
			beginShape();
				var a = 0;
				for (index = 0; index < this.points.length; index++){
					a += PI/6;
					vertex(this.points[index] * cos(a),this.points[index] * sin(a));
				}
			endShape(CLOSE);
		pop();
		
	}
	this.kill = function(){
		asteroids.splice(asteroids.indexOf(this),1);
	}
	this.distance = function(target_pos){
		return this.pos.dist(target_pos);
	}
	

	
}



function spaceship(){
	//constants
	this.max_vel = 10;
	this.max_acc = .1;
	this.angle_acc = .1;
	
	this.last_bullet = frameCount;
	this.pos = createVector(width/2,height/2);
	this.vel = createVector(0,0);
	this.angle = -PI/2;
	
	this.show = function(){
		push();
			
			translate(this.pos.x,this.pos.y);
			rotate(this.angle);
			beginShape();
				vertex(15,0);
				vertex(-14,8);
				vertex(-8,6);
				vertex(-8,-6);
				vertex(-14,-8);
			endShape(CLOSE);
		pop();
	}
	this.update = function(){
			if (keyIsDown(UP_ARROW))
					this.vel.add(p5.Vector.fromAngle(this.angle).setMag(this.max_acc));

			if (keyIsDown(RIGHT_ARROW))
					this.angle += this.angle_acc;
			if (keyIsDown(LEFT_ARROW))
					this.angle -= this.angle_acc;
			if (keyIsDown(32)){
				if (frameCount - this.last_bullet>10){
					bullets[bullets.length]=new bullet(this.vel.copy(),this.pos.copy(),this.angle);
					this.last_bullet = frameCount;
			 	}
			}
			for(index = 0; index < asteroids.length; index++){
				if (asteroids[index].distance(this.pos)< 40){
					this.kill();
			}
		}
		this.vel.limit(this.max_vel);
		this.pos.add(this.vel);
		//console.log(this.vel.mag());
		this.pos.set((width+this.pos.x)%width,(height+this.pos.y)%height);
		
		
		
	}
	this.kill = function(){
		state = "game_over";
	}

}
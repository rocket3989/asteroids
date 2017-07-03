var alive = true
var dead = false
function asteroid(position,size){
	//constants
	this.max_speed = 4*(4-size);
	this.max_death = 30;
	
	this.death_time = 0;
	this.state = alive;
	this.size = size
	this.vel = p5.Vector.random2D().setMag(random(this.max_speed));
	this.pos = position;
	this.points = [];
	this.rocks = [];
	for (index = 0; index < 12; index++){
		this.points[index]=random(7*this.size,17*this.size);
	}
	
	
	
	this.show = function(){
		if (this.state){ //if the asteroid has not been destroyed
			this.pos.add(this.vel);
			this.pos.set((width+this.pos.x)%width,(height+this.pos.y)%height);
			if (this.distance(ship.getPos())<13*this.size)
				ship.kill();
			for(index = 0; index < bullets.length; index++){
				if (bullets[index].distance(this.pos)< 40){
					bullets[index].kill();
					this.kill();
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
		else{ //if the asteroid has been destroyed
			push();
				strokeWeight(2);
				translate(this.pos.x,this.pos.y);
				rotate(this.angle);
				var a = 0;
				for (index = 0; index < this.rocks.length; index++){
					a += PI/6;
					point(this.rocks[index] * cos(a)*this.death_time,this.rocks[index] * sin(a)*this.death_time);
				}
			pop();
			if (this.death_time++ > this.max_death)
				asteroids.splice(asteroids.indexOf(this),1);
		}
	}
	this.kill = function(){
		for(index = 0;index<12;index++){
			this.rocks[index] = random(0.5,3);
		}
		this.state = dead;
		if (size>1){
			asteroids.push(new asteroid(this.pos.copy(),size - 1));
			asteroids.push(new asteroid(this.pos.copy(),size - 1));
		}
	}
	this.distance = function(target_pos){
		return this.pos.dist(target_pos);
	}
}
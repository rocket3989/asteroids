function asteroid(position,size,velocity){
	//constants
	this.max_speed = 2*(4-size);
	this.max_death = 30;
	
	this.death_time = 0;
	this.state = alive;
	this.size = size
	if(velocity)
		this.vel = velocity.limit(this.max_speed);
	else
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
			if (this.distance(ship.getPos())<15*this.size) 
				ship.kill();
			for(index = 0; index < bullets.length; index++){
				if (bullets[index].distance(this.pos)< 40){
					var velbul = bullets[index].vel.copy();
					bullets[index].kill();
					this.kill(velbul);
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
				this.pos.add(this.vel);
				strokeWeight(2);
				translate(this.pos.x,this.pos.y);
				rotate(this.angle);
				for (index = 0; index < this.rocks.length; index++){
					var a = index*PI/6;
					point(this.rocks[index] * cos(a)*this.death_time,this.rocks[index] * sin(a)*this.death_time);
				}
			pop();
			if (this.death_time++ > this.max_death)
				asteroids.splice(asteroids.indexOf(this),1);
		}
	}
	this.kill = function(invel){
		for(index = 0;index<12;index++){
			this.rocks[index] = random(0,3);
		}
		this.state = dead;
		if (size>1){
			var offset = invel.rotate(PI/4).setMag(2);//p5.Vector.random2D().setMag(2);
			asteroids.push(new asteroid(this.pos.copy(),size - 1,this.vel.copy().mult(2).add(offset)));
			offset.rotate(-PI/2);
			asteroids.push(new asteroid(this.pos.copy(),size - 1,this.vel.copy().mult(2).add(offset)));
		}
		var mod = floor(score / 10000);
		switch(size){
			case 3:
				score += 20;
				sound_bangL.play()
				break;
			case 2:
				score += 50;
				sound_bangM.play();
				break;
			case 1:
				score += 100;
				sound_bangS.play();
				break;
		}
		if (floor(score / 10000) != mod)
			lives++;
	}
	this.distance = function(target_pos){
		return this.pos.dist(target_pos);
	}
}
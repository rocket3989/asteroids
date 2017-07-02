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
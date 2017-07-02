function spaceship(){
	//constants
	
	this.max_vel = 10;
	this.max_acc = .1;
	this.angle_acc = .1;
	
	this.space_press = false;
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
			if (keyIsDown(32)&&!this.space_press){
				bullets.push(new bullet(this.vel.copy(),this.pos.copy(),this.angle));
				this.space_press = true;
			}
			if (!keyIsDown(32)&&this.space_press){
				this.space_press = false;
			}
				
				
				
				/*     Continuous firing 
				if (frameCount - this.last_bullet>10){
					bullets.push(new bullet(this.vel.copy(),this.pos.copy(),this.angle));
					this.last_bullet = frameCount;
			 	}
				*/
			
			for(index = 0; index < asteroids.length; index++){
				if (asteroids[index].distance(this.pos)< 40){
					this.kill();
			}
		}
		this.vel.limit(this.max_vel);
		this.pos.add(this.vel);
		this.pos.set((width+this.pos.x)%width,(height+this.pos.y)%height);
		
		
		
	}
	this.kill = function(){
		state = "game_over";
	}

}
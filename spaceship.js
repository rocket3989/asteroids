function spaceship(){
	//constants
	
	this.max_vel = 10;
	this.max_acc = .1;
	this.angle_acc = .1;
	
	this.key_press = true;
	this.rocks = [];
	this.offset = [1,1,1,1,1,1,1,1,1];
	this.death_time = 1000;
	this.state = dead;
	this.prevmillis = 0;
	this.space_press = false;
	this.pos = createVector(width/2,height/2);
	this.vel = createVector(0,0);
	this.angle = 0;
	this.engines = false;
	
	this.show = function(){
		if(this.state){
			push();
				translate(this.pos.x,this.pos.y);
				rotate(this.angle);
				line(15,0,-14,8);
				line(-8,6,-8,-6);
				line(-14,-8,15,0);
				if (this.engines&&Math.random()<.3){
					line(-10,4,-13,0);
					line(-13,0,-10,-4);
					line(-10,-4,-10,4);
					sound_thrust.play();
				}
			pop();
		}
		else{
			push();
				translate(this.pos.x,this.pos.y);
				rotate(this.angle);
				push();
					translate(this.offset[0]*this.death_time,this.offset[1]*this.death_time);
					rotate(this.offset[2]/10*this.death_time);
					line(15,0,-14,8);
				pop();
				push();
					translate(this.offset[3]*this.death_time,this.offset[4]*this.death_time);
					rotate(this.offset[5]/10*this.death_time);
					line(-8,6,-8,-6);
				pop();
				push();
					translate(this.offset[6]*this.death_time,this.offset[7]*this.death_time);
					rotate(this.offset[8]/10*this.death_time);
					line(-14,-8,15,0);
				pop();
				strokeWeight(2);
				for (index = 0; index < this.rocks.length; index++){
					var a = index*PI/3;
					point(this.rocks[index] * cos(a)*this.death_time,this.rocks[index] * sin(a)*this.death_time);
				}
			pop();
			this.death_time ++;
			if (!keyIsPressed)
				this.key_press = false;
			if ((!this.key_press&&keyIsPressed)||this.death_time>100){
				this.prevmillis = millis();
				if (state == "playing"){
					this.state = alive;
					this.pos = createVector(width/2,height/2);
					this.vel = createVector(0,0);
				}
				this.key_press = true;
			}
		}
	}
	this.update = function(){
		this.engines = false;
		if(this.state){
			if (keyIsDown(UP_ARROW)){
					this.vel.add(p5.Vector.fromAngle(this.angle).setMag(this.max_acc));
					this.engines = true;
					}

			if (keyIsDown(RIGHT_ARROW))
					this.angle += this.angle_acc;
			if (keyIsDown(LEFT_ARROW))
					this.angle -= this.angle_acc;
			if (keyIsDown(32)&&!this.space_press){
				bullets.push(new bullet(this.vel.copy(),this.pos.copy().add(this.vel),this.angle));
				this.space_press = true;
				sound_fire.play();
			}
			if (!keyIsDown(32)&&this.space_press){
				this.space_press = false;
			}
		}
				
				
				
				/*     Continuous firing 
				if (frameCount - this.last_bullet>10){
					bullets.push(new bullet(this.vel.copy(),this.pos.copy(),this.angle));
					this.last_bullet = frameCount;
			 	}
				*/
		this.vel.limit(this.max_vel);
		this.pos.add(this.vel);
		if(this.state)
			this.pos.set((width+this.pos.x)%width,(height+this.pos.y)%height);
		
		
		
	}
	this.getPos = function(){
		return this.pos;
	}
	this.kill = function(){
		if (this.state){
			if (millis() > this.prevmillis + 1000){
				this.state = dead;
				sound_bangM.play();
				this.death_time = 0;
				if (lives--<1)
					state = "game_over";
				for(index = 0;index<9;index++){
					this.rocks[index] = random(0,3);
					this.offset[index] = random(-1.5,1.5);
				}
			}
			this.prevmillis = millis();
		}
	}
}
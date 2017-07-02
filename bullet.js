function bullet(velocity,position,angle){
	//constants
	this.max_life = 50;
	this.bullet_velocity = 20;
	
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
		strokeWeight(4);
		point(this.pos.x,this.pos.y);
		strokeWeight(1);
		
	}
	this.kill = function(){
		bullets.splice(bullets.indexOf(this),1);
	}
	this.distance = function(target_pos){
		return this.pos.dist(target_pos);
	}
}
class eShooter extends eDefault {
	constructor(x, y, dirDeg, reach = 550, reachWidthHalf = 300) {
		super(x, y, dirDeg)
		
		//sight
		this.reach = reach;
		this.viewArea = new hbTriangle(this.p5spr.x, this.p5spr.y, -reachWidthHalf, -this.reach, reachWidthHalf, -this.reach);
		this.viewArea.setA(this.p5spr.position);

		this.millisAtLastShot = 0;
		this.millisBetweenShots = 1000;
	}

	update() {
		//movement
		if(this.viewArea.pointCheck(objPlayer.p5spr.position)) { //is player in view
			let dis = p5.Vector.dist(this.p5spr.position, objPlayer.p5spr.position); //distance to player
			let p = p5.Vector.add(objPlayer.p5spr.position, p5.Vector.mult(objPlayer.p5spr.velocity, 3)); //player position + velocity, for leading shots
			this.p5spr.setSpeed(constrain(map(dis, 0, this.reach, 5, 0.1), 0.1, 5), //set speed backwards
				degrees(p5.Vector.sub(p, this.p5spr.position).heading())+180);
			this.millisBetweenShots = map(dis, 0, this.reach, 1200, 800);
			this.p5spr.collide(grpObstaclesSolid);
			this.p5spr.collide(grpObstaclesDashthrough);
			this.p5spr.collide(enemies.group);
			if (this.p5spr.position.x < 0) this.p5spr.position.x = 0;
			if (this.p5spr.position.y < 0) this.p5spr.position.y = 0;
			if (this.p5spr.position.x > SCENE_W) this.p5spr.position.x = SCENE_W;
			if (this.p5spr.position.y > SCENE_H) this.p5spr.position.y = SCENE_H;
		} else {
			if(!objPlayer.dashing)
				this.p5spr.setSpeed(0);
		}
		this.viewArea.setA(this.p5spr.position);
		this.viewArea.setRotation(radians(this.p5spr.rotation+180));

		//shooting
		if(millis() - this.millisAtLastShot > this.millisBetweenShots && this.viewArea.pointCheck(objPlayer.p5spr.position)) {
			let spawnpos = this.p5spr.position.copy().add(p5.Vector.fromAngle(radians(this.p5spr.rotation+180)).mult(64));
			enemies.add(new Bullet(spawnpos.x, spawnpos.y, this.p5spr.rotation+180));
			this.millisAtLastShot = millis();
		}
	}

	render() {
		drawSprite(this.p5spr);
		if(DEBUG_MODE) {
			this.viewArea.drawDebug();
		}
	}
}
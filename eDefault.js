class eDefault {
	constructor(x, y, dirDeg, reach = 420, reachWidthHalf = 300) {
		this.p5spr = createSprite(x, y, 64, 64);
		this.p5spr.addImage(imgEnemyDefault);
		this.p5spr.setCollider("circle", 0, 0, 24);
		this.p5spr.scale = 1.4;
		this.p5spr.rotation = this.dirDeg = dirDeg;
		this.p5spr.rotateToDirection = true;
		this.p5spr.setSpeed(1, this.dirDeg);
		if (DEBUG_MODE) this.p5spr.debug = true;
		
		//sight
		this.viewArea = new hbTriangle(this.p5spr.x, this.p5spr.y, -reachWidthHalf, -reach, reachWidthHalf, -reach);
		this.viewArea.setA(this.p5spr.position);
	}

	update() {
		if(this.viewArea.pointCheck(objPlayer.p5spr.position)) {
			if(!objPlayer.dashing)
				this.p5spr.setSpeed(6, degrees(p5.Vector.sub(objPlayer.p5spr.position, this.p5spr.position).heading()));
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
		this.viewArea.setRotation(radians(this.p5spr.rotation));
	}

	render() {
		drawSprite(this.p5spr);
		if(DEBUG_MODE) {
			this.viewArea.drawDebug();
		}
	}
}
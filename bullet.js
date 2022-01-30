class Bullet {
	constructor(x, y, dirDeg) {
		this.p5spr = createSprite(x, y, 64, 64);
		this.p5spr.addImage(imgPlayer);
		this.p5spr.setCollider("circle", 0, 0, 24);
		this.p5spr.scale = 0.5;
		this.p5spr.rotation = this.dirDeg = dirDeg;
		this.p5spr.rotateToDirection = true;
		this.p5spr.setSpeed(5, this.dirDeg);
		if (DEBUG_MODE) this.p5spr.debug = true;
	}

	update() {
		if(this.p5spr.overlap(grpObstaclesSolid))
			enemies.kill(this);
		this.p5spr.overlap(enemies.group, this.hitOtherEnemy)
		
		if (this.p5spr.position.x < 0 || this.p5spr.position.y < 0 || this.p5spr.position.x > SCENE_W || this.p5spr.position.y > SCENE_H)
			enemies.kill(this);
	}
	
	render() {
		drawSprite(this.p5spr);
	}

	hitOtherEnemy(spriteA, spriteB) {
		enemies.killSpr(spriteA);
		enemies.killSpr(spriteB);
	}
}
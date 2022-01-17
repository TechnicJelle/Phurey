class eDefault {
	constructor(x, y, dirDeg) {
		this.p5spr = createSprite(x, y, 64, 64);
		this.p5spr.addImage(imgEnemyDefault);
		this.p5spr.setCollider("circle", 0, 0, 24);
		this.p5spr.scale = 1.4;
		this.p5spr.rotation = this.dirDeg = dirDeg;
		this.p5spr.rotateToDirection = true;
		if (DEBUG_MODE) this.p5spr.debug = true;
	}

	update() {
		// print("hello");
	}

	render() {
		drawSprite(this.p5spr);
		if(DEBUG_MODE) drawArrow(this.p5spr.position, p5.Vector.fromAngle(radians(this.dirDeg)).setMag(50), color(255, 0, 0));
	}
}
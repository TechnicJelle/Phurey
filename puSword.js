class puSword {
	constructor(x, y) {
		this.p5spr = createSprite(x, y, 64, 64);
		this.p5spr.addImage(imgPUSword);
		this.p5spr.setCollider("circle", 0, 0, 90);
		this.p5spr.scale = 0.4;
		if (DEBUG_MODE) this.p5spr.debug = true;
	}

	update() {
	}

	render() {
		drawSprite(this.p5spr);
	}
}
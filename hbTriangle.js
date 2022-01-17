class hbTriangle {
	constructor(x1, y1, x2, y2, x3, y3) {
		this.a = createVector(x1, y1);
		this.b = createVector(x2, y2);
		this.c = createVector(x3, y3);
		this.angle = -HALF_PI;
	}

	translate(x, y) {
		this.translate(createVector(x, y));
	}

	translate(offset) {
		this.a.add(offset);
		this.b.add(offset);
		this.c.add(offset);
	}

	setA(vec) {
		let diff = p5.Vector.sub(vec, this.a);
		this.translate(diff);
	}

	setRotation(angle) {
		let diff = this.angle - angle;
		// print(diff);
		this.rotateAngle(-diff);
		this.angle = angle;
	}

	rotateAngle(angle) {
		this.rotateOrigin(this.a, angle);
	}
	
	rotateOrigin(origin, angle) {
		this.rotateAroundPoint(this.a, origin.x, origin.y, angle);
		this.rotateAroundPoint(this.b, origin.x, origin.y, angle);
		this.rotateAroundPoint(this.c, origin.x, origin.y, angle);
	}

	rotateAroundPoint(vec, anchorX, anchorY, angle) {
		//https://forum.processing.org/one/topic/pvector-rotation.html
		let origX = vec.x - anchorX;
		let rotX = origX;  // subtract to get relative position
		let origY = vec.y - anchorY;  // or with other words, to get origin (anchor/rotation) point to 0,0
		let rotY = origY;
	
		vec.x -= rotX;
		vec.y -= rotY;
		rotX = origX * cos(angle) - origY * sin(angle);
		rotY = origX * sin(angle) + origY * cos(angle);
		vec.x += rotX; // get it back to absolute position on screen
		vec.y += rotY;
	}

	drawDebug() {
		noFill();
		stroke(0, 255, 255);
		if(this.pointCheck(createVector(camera.mouseX, camera.mouseY)))
		stroke(255, 0, 0);
		strokeWeight(3);
		triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
	}

	pointCheck(p) {
		return this.pointInTriangle(p, this.a, this.b, this.c);
	}

	pointInTriangle(p, a, b, c) {
		return this.sameSide(p, a, b, c) && this.sameSide(p, b, a, c) && this.sameSide(p, c, a, b);
	}

	sameSide(p1, p2, a, b) {
		let cp1 = p5.Vector.sub(b, a).cross(p5.Vector.sub(p1, a));
		let cp2 = p5.Vector.sub(b, a).cross(p5.Vector.sub(p2, a));
		if (cp1.dot(cp2) >= 0)
			return true;
		else
			return false;
	}
}

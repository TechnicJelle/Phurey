class Enemies {
	constructor() {
		this.clear();
	}

	add(enemy) {
		this.group.add(enemy.p5spr);
		this.array.push(enemy);
	}

	clear() {
		this.group = new Group();
		this.array = new Array();
	}
}
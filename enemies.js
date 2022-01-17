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

	kill(enemy) {
		enemy.life = 0;
		this.group.remove(enemy);
		this.array.splice(this.array.indexOf(enemy));
	}
}
class Enemies {
	constructor() {
		this.clear();
	}

	clear() {
		this.group = new Group(); //for the sprites
		this.array = new Array(); //for the actual enemy classes
	}

	add(enemy) {
		this.group.add(enemy.p5spr);
		this.array.push(enemy);
	}

	kill(enemy) {
		enemy.life = 0;
		this.group.remove(enemy);
		this.array.splice(this.array.indexOf(enemy));
		objPlayer.camShake(20);
	}
}
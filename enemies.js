class Enemies {
	constructor() {
		this.clear();
	}

	clear() {
		this.group = new Group(); //for the sprites
		this.array = new Set(); //for the actual enemy classes
	}

	add(enemy) {
		this.group.add(enemy.p5spr);
		this.array.add(enemy);
	}

	kill(enemy) {
		enemy.life = 0;
		this.group.remove(enemy.p5spr);
		this.array.delete(enemy);
		objPlayer.camShake(20);
	}
}
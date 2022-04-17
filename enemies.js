class Enemies {
	constructor() {
		this.clear();
	}

	clear() {
		this.group = new Group(); //for the sprites
		this.array = new Set(); //for the actual enemy classes
	}

	add(enemy) {
		if(!sfxEnemyWalk.isPlaying())
			sfxEnemyWalk.play();
		this.group.add(enemy.p5spr);
		this.array.add(enemy);
	}

	kill(enemy) {
		enemy.p5spr.life = 0;
		this.group.remove(enemy.p5spr);
		this.array.delete(enemy);
	}

	killSpr(enemySpr) {
		let ret = [];
		enemySpr.life = 0;
		this.array.forEach(enemy => {
			if(enemy.p5spr.life == 0) {
				this.kill(enemy);
				objPlayer.camShake(10);
				ret.push(enemy);
			}
		});
		return ret;
	}
}
class Powerups {
	constructor() {
		this.clear();
	}

	clear() {
		this.group = new Group(); //for the sprites
		this.array = new Set(); //for the actual powerup classes
	}

	add(powerup) {
		this.group.add(powerup.p5spr);
		this.array.add(powerup);
	}

	kill(powerup) {
		powerup.p5spr.life = 0;
		this.group.remove(powerup.p5spr);
		this.array.delete(powerup);
	}

	killSpr(powerupSpr) {
		let ret = [];
		powerupSpr.life = 0;
		this.array.forEach(powerup => {
			if(powerup.p5spr.life == 0) {
				this.kill(powerup);
				objPlayer.camShake(10);
				ret.push(powerup);
			}
		});
		return ret;
	}
}
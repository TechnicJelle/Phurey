class Player {
	constructor() {
		this.p5spr = createSprite(0, 0, 64, 64);
		this.p5spr.addImage(imgPlayer);
		this.p5spr.setCollider("circle", 0, 0, 16);
		if (DEBUG_MODE) this.p5spr.debug = true;

		this.dashCollider = createSprite(0, 0);
		this.dashCollider.setCollider("circle", 0, 0, 15);
		
		this.cameraShakeCurrentStrength = 0.0;

		//movement variables
		this.posAtStartDash = createVector(0, 0);
		this.millisAtStartDash = 0;
		this.dashing = false;
		this.lastDashWasShort = false;
		this.dashCharge = 0;
		this.plrMoveSpeed = PLAYER_TOP_SPEED;
		this.vecInputMovement = createVector(0, 0);

		//sword variables
		this.vecAim = createVector(0, 0);
		this.vecInputAim = createVector(0, 0);
		this.gamePadSwordArea();
		this.millisAtStartSlash = 0;
		this.millisPerSlash = 150;
		this.millisBetweenSlashesDefault = 600;
		this.millisBetweenSlashes = this.millisBetweenSlashesDefault;
		this.slashing = false;
		this.canSlash = true;
		this.radAimAtStartSlash = 0;

		//powerups

		//health powerup
		this.health = 1; //start off at only one
		this.maxHealth = 40;
		this.millisAtGetPUHealth = 0;
		this.millisPUHealthDuration = 10000;
		
		//sword
		this.millisAtGetPUSword = 0;
		this.millisPUSwordDuration = 4000;

		//speed CANCELLED
		// this.millisAtGetPUSpeed = 0;
		// this.millisPUSpeedDuration = 7000;
		// this.playerCurrentTopSpeed = PLAYER_TOP_SPEED;

		GAMEPAD.bind(Gamepad.Event.BUTTON_DOWN, function (e) {
			setUsingGamepad(true);
			// e.control of GAMEPAD e.GAMEPAD pressed down
			// print(e.control);
			switch (e.control) {
				case "DPAD_LEFT":
					// case "FACE_3":
					objPlayer.vecInputMovement.x = -1;
					break;
				case "DPAD_RIGHT":
					// case "FACE_2":
					objPlayer.vecInputMovement.x = 1;
					break;
				case "DPAD_UP":
					// case "FACE_4":
					objPlayer.vecInputMovement.y = -1;
					break;
				case "DPAD_DOWN":
					// case "FACE_1":
					objPlayer.vecInputMovement.y = 1;
					break;
				case "FACE_3":
					objPlayer.requestSlash();
					break;
				case "FACE_1":
				case "LEFT_BOTTOM_SHOULDER":
				case "LEFT_TOP_SHOULDER":
					objPlayer.requestDash();
					break;
			}
		});
		GAMEPAD.bind(Gamepad.Event.BUTTON_UP, function (e) {
			setUsingGamepad(true);
			// e.control of GAMEPAD e.GAMEPAD pressed down
			//logmsg(e.control);
			switch (e.control) {
				case "DPAD_LEFT":
				case "DPAD_RIGHT":
					objPlayer.vecInputMovement.x = 0;
					break;
				case "DPAD_UP":
				case "DPAD_DOWN":
					objPlayer.vecInputMovement.y = 0;
					break;
				case "FACE_1":
				case "LEFT_BOTTOM_SHOULDER":
				case "LEFT_TOP_SHOULDER":
					objPlayer.commitDash();
					break;
			}
		});
		GAMEPAD.bind(Gamepad.Event.AXIS_CHANGED, function (e) {
			setUsingGamepad(true);
			// e.axis changed to value e.value for GAMEPAD e.GAMEPAD
			// print(e);
			if (e.axis.includes("LEFT")) {
				if (e.axis.includes("X")) objPlayer.vecInputMovement.x = e.value;
				if (e.axis.includes("Y")) objPlayer.vecInputMovement.y = e.value;
			} else if (e.axis.includes("RIGHT")) {
				if (e.axis.includes("X")) objPlayer.vecInputAim.x = e.value;
				if (e.axis.includes("Y")) objPlayer.vecInputAim.y = e.value;
			}
		});
		GAMEPAD.bind(Gamepad.Event.TICK, function (gamepads) {
			// gamepads were updated (around 60 times a second)
			let btnA =
				gamepads[0].buttons[0].pressed ||
				gamepads[0].buttons[0].touched ||
				gamepads[0].buttons[0].value > 0;
			let btnL1 =
				gamepads[0].buttons[4].pressed ||
				gamepads[0].buttons[4].touched ||
				gamepads[0].buttons[4].value > 0;
			let btnL2 =
				gamepads[0].buttons[6].pressed ||
				gamepads[0].buttons[6].touched ||
				gamepads[0].buttons[6].value > 0;
			if (btnA || btnL1)
				objPlayer.requestDash();
		});
	}

	requestDash() {
		if (!this.dashCharging && !this.dashCollider.overlap(grpObstaclesDashthrough)) {
			if (this.lastDashWasShort) {
				if (
					!this.dashing &&
					millis() - this.millisAtStartDash > MILLIS_BETWEEN_SHORT_DASHES
				) {
					this.startDash();
				}
			} else {
				this.startDash();
			}
		}
	}

	startDash() {
		this.posAtStartDash = this.p5spr.position.copy();
		this.millisAtStartDash = millis() - 1;
		this.dashCharge = 0;
		this.dashCharging = true;
	}

	commitDash() {
		if (this.dashCharging) {
			this.dashCharging = false;
			if (this.dashCharge > MILLIS_MINIMUM_FOR_DASH) {
				this.p5spr.addSpeed(
					map(
						this.dashCharge,
						0,
						MILLIS_FOR_FULL_DASH,
						PLAYER_SHORT_DASH,
						PLAYER_MAX_DASH
					),
					degrees(this.p5spr.velocity.heading())
				);
				this.lastDashWasShort = false;
			} else {
				this.p5spr.addSpeed(
					PLAYER_SHORT_DASH,
					degrees(this.p5spr.velocity.heading())
				);
				this.lastDashWasShort = true;
			}
			this.dashing = true;
			this.plrMoveSpeed = PLAYER_TOP_SPEED;
		}
	}

	update() {
		if(usingGamepad) {
			// print(this.vecInputAim);
			if(this.vecInputAim.magSq() > 0.1)
				this.vecAim = p5.Vector.fromAngle(this.vecInputAim.heading());
		} else {
			this.vecInputAim.x = camera.mouseX;
			this.vecInputAim.y = camera.mouseY;
			this.vecAim = p5.Vector.sub(this.vecInputAim, this.p5spr.position).normalize();
		}
		this.updateMovement();
		
		if(this.p5spr.position.y < 100) {
			if(currentLevel == 2) {
				currentLevel = 3;
			}
			if(currentLevel == 1) {
				currentLevel = 2;
			}
			restartLevel()
		}
		
		this.p5spr.overlap(powerups.group, gotPowerUp);
		
		function gotPowerUp(player, powerup) {
			let hitPowerups = powerups.killSpr(powerup);
			let hitPowerup = hitPowerups[0];
			print(hitPowerup.constructor.name);
			// print(hitPowerups);
			switch(hitPowerup.constructor.name) {
				case "puShield":
					objPlayer.health = objPlayer.maxHealth;
					objPlayer.millisAtGetPUHealth = millis();
					break;
				case "puSword":
					objPlayer.millisBetweenSlashes = 50;
					objPlayer.millisAtGetPUSword = millis();
					break;
				// case "puSpeed":
				// 	objPlayer.plrMoveSpeed = PLAYER_TOP_SPEED * 2;
				// 	objPlayer.millisAtGetPUSpeed = millis();
			}
		}

		if(this.health != 1 && millis() - this.millisAtGetPUHealth > this.millisPUHealthDuration) {
			this.health = 1;
		}
		if(this.millisBetweenSlashes != this.millisBetweenSlashesDefault && millis() - this.millisAtGetPUSword > this.millisPUSwordDuration) {
			this.millisBetweenSlashes = this.millisBetweenSlashesDefault;
		}
		// if(this.this.playerCurrentTopSpeed > PLAYER_TOP_SPEED && millis() - this.millisAtGetPUSpeed > this.millisPUSpeedDuration) {
		// 	this.this.playerCurrentTopSpeed = PLAYER_TOP_SPEED;
		// }
	}
	

	updateMovement() {
		this.dashCharge = constrain(
			millis() - this.millisAtStartDash,
			0,
			MILLIS_FOR_FULL_DASH
		);
		if (
			keyDown(" ") ||
			keyWentDown(" ") ||
			keyDown(SHIFT) ||
			keyWentDown(SHIFT)
		) {
			this.requestDash();
		} else if (keyWentUp(" ") || keyWentUp(SHIFT)) {
			this.commitDash();
		} else if (!this.dashCharging) {
			this.dashCharge = 0;
		}

		if (this.p5spr.velocity.magSq() < PLAYER_SPEEDSQ_UNDER_WHICH_DASH_STOPS) {
			if(this.dashing) {
				if(this.p5spr.overlap(grpObstaclesDashthrough)) {
					this.p5spr.position.x = this.posAtStartDash.x;
					this.p5spr.position.y = this.posAtStartDash.y;
				}
			}
			this.dashing = false;
			this.plrMoveSpeed = PLAYER_TOP_SPEED;
		}

		if (this.dashCharging) {
			this.plrMoveSpeed = PLAYER_SPEED_WHILE_CHARGING;
		}

		//up/down
		if (
			keyDown("w") ||
			keyWentDown("w") ||
			keyDown("i") ||
			keyWentDown("i") ||
			keyDown(UP_ARROW) ||
			keyWentDown(UP_ARROW)
		) {
			this.vecInputMovement.y = -1;
		} else if (
			keyDown("s") ||
			keyWentDown("s") ||
			keyDown("k") ||
			keyWentDown("k") ||
			keyDown(DOWN_ARROW) ||
			keyWentDown(DOWN_ARROW)
		) {
			this.vecInputMovement.y = 1;
		} else if (
			keyWentUp("w") ||
			keyWentUp("i") ||
			keyWentUp("s") ||
			keyWentUp("k") ||
			keyWentUp(UP_ARROW) ||
			keyWentUp(DOWN_ARROW)
		) {
			this.vecInputMovement.y = 0;
		}

		//left/right
		if (
			keyDown("a") ||
			keyWentDown("a") ||
			keyDown("j") ||
			keyWentDown("j") ||
			keyDown(LEFT_ARROW) ||
			keyWentDown(LEFT_ARROW)
		) {
			this.vecInputMovement.x = -1;
		} else if (
			keyDown("d") ||
			keyWentDown("d") ||
			keyDown("l") ||
			keyWentDown("l") ||
			keyDown(RIGHT_ARROW) ||
			keyWentDown(RIGHT_ARROW)
		) {
			this.vecInputMovement.x = 1;
		} else if (
			keyWentUp("a") ||
			keyWentUp("j") ||
			keyWentUp("d") ||
			keyWentUp("l") ||
			keyWentUp(LEFT_ARROW) ||
			keyWentUp(RIGHT_ARROW)
		) {
			this.vecInputMovement.x = 0;
		}

		if (this.vecInputMovement.magSq() > 0.1) {
			this.vecInputMovement.limit(1);
			this.p5spr.addSpeed(
				this.plrMoveSpeed * this.vecInputMovement.mag(),
				degrees(this.vecInputMovement.heading())
			);
		}

		this.p5spr.velocity.mult(DRAG);
		// print(player.velocity.magSq());

		//a camera is created automatically at the beginning
		//set the camera position to the player position
		camera.position.x = this.p5spr.position.x + random(this.cameraShakeCurrentStrength);
		camera.position.y = this.p5spr.position.y + random(this.cameraShakeCurrentStrength);
		
		this.cameraShakeCurrentStrength *= 0.9;

		let collidingWithEnemy = false;
		
		this.p5spr.collide(grpObstaclesSolid);
		if(!this.dashing) {
			this.p5spr.collide(grpObstaclesDashthrough);
			if(this.p5spr.overlap(enemies.group, collidedWithEnemy)) {
				collidingWithEnemy = true;
				this.health -= 1;
				if(this.health <= 0) restartLevel();
			}

			function collidedWithEnemy(player, enemy) {
				// print(enemy);
				if(enemy.collider.radius == 12) {
					enemies.killSpr(enemy);
					objPlayer.camShake(30);
					if(objPlayer.health > 1)
						objPlayer.health = 2;
				}
			}
		}
		if(!collidingWithEnemy && this.health != this.maxHealth && this.health > 1) {
			this.health = 1;
		}

		//limit the player movements
		if (this.p5spr.position.x < 0) this.p5spr.position.x = 0;
		if (this.p5spr.position.y < 0) this.p5spr.position.y = 0;
		if (this.p5spr.position.x > SCENE_W) this.p5spr.position.x = SCENE_W;
		if (this.p5spr.position.y > SCENE_H) this.p5spr.position.y = SCENE_H;

		this.dashCollider.position.x = this.p5spr.position.x;
		this.dashCollider.position.y = this.p5spr.position.y;

		//sword
		if(mouseWentDown(LEFT)) {
			this.requestSlash();
		}
		if(!this.canSlash && millis() - this.millisAtStartSlash > this.millisBetweenSlashes) {
			this.canSlash = true;
		}
		if(this.slashing && millis() - this.millisAtStartSlash > this.millisPerSlash) {
			this.slashing = false;
		}
		if(DEBUG_MODE) {
			this.swordArea.setA(this.p5spr.position);
			if(usingGamepad) {
				this.radAimAtStartSlash = radians(this.p5spr.getDirection());
			} else {
				this.radAimAtStartSlash = this.vecAim.heading();
			}
			this.swordArea.setRotation(this.radAimAtStartSlash);
		}
	}

	render() {
		//draw the player
		noStroke();
		fill(0, 0);
		if (this.dashCharging && this.dashCharge >= MILLIS_MINIMUM_FOR_DASH) {
			fill(38, 124, 156, map(this.dashCharge, MILLIS_MINIMUM_FOR_DASH, MILLIS_FOR_FULL_DASH, 0, 255));
		}
		if (this.dashCharging && this.dashCharge >= MILLIS_FOR_FULL_DASH) {
			fill(0, 0, 255);
		}
		if (this.dashing) {
			fill(0, 255, 0, 64);
		}
		if(this.health > 1) {
			stroke(0, 0, 255, map(this.health, 1, this.maxHealth, 0, 255));
			strokeWeight(map(noise(millis() * 0.01), 0, 1, 5, 7));
		} else {
			noStroke();
		}
		ellipse(this.p5spr.position.x, this.p5spr.position.y, 64, 64);

		this.p5spr.rotation = this.p5spr.getDirection();
		drawSprite(this.p5spr);
		if(DEBUG_MODE){
			this.swordArea.drawDebug();
			// drawArrow(this.p5spr.position, p5.Vector.mult(this.vecAim, 50), "red");
		}

		if(this.slashing) {
			push();
			translate(this.p5spr.position.x, this.p5spr.position.y);
			rotate(-0.25 * PI + HALF_PI)
			rotate(map(millis() - this.millisAtStartSlash, 0, this.millisPerSlash, PI * 0.3, -PI * 0.15));
			rotate(this.radAimAtStartSlash);
			image(imgKatana, 0, -imgKatana.height);
			pop();
		}
	}
	
	camShake(strength) {
		this.cameraShakeCurrentStrength += strength;
	}

	requestSlash() {
		if(millis() - this.millisAtStartSlash > this.millisBetweenSlashes) {
			this.slash();
		}
	}

	slash() {
		objPlayer.camShake(5);
		this.slashing = true;
		this.canSlash = false;
		this.swordArea.setA(this.p5spr.position);
		if(usingGamepad) {
			this.radAimAtStartSlash = radians(this.p5spr.getDirection());
		} else {
			this.radAimAtStartSlash = this.vecAim.heading();
		}
		this.swordArea.setRotation(this.radAimAtStartSlash);
		this.millisAtStartSlash = millis();

		enemies.array.forEach(enemy => {
			let hit = false;
			let div = 8;
			for (let i = 0; i < TWO_PI; i+=TWO_PI/div) {
				let vec = enemy.p5spr.position.copy().add(enemy.p5spr.collider.radius * cos(i), enemy.p5spr.collider.radius * sin(i));
				if(DEBUG_MODE) {
					stroke(255, 0, 0);
					strokeWeight(4);
					point(vec.x, vec.y);
				}
				if (this.swordArea.pointCheck(vec)) {
					hit = true;
					break;
				}
			}
			if(hit) {
				enemies.kill(enemy);
				if(enemy.constructor.name == "Bullet")
					objPlayer.camShake(10);
				else {
					objPlayer.camShake(20);
					livingEnemies--;
				}
			}
		});
	}

	gamePadSwordArea() {
		if(usingGamepad) {
			var reachWidthHalf = 100;
			var reach = 200;
		} else {
			var reachWidthHalf = 70;
			var reach = 150;
		}
		this.swordArea = new hbTriangle(this.p5spr.x, this.p5spr.y, -reachWidthHalf, -reach, reachWidthHalf, -reach);
	}
}

class Player {
	constructor() {
		this.p5spr = createSprite(0, 0, 64, 64);
		this.p5spr.addImage(imgPlayer);
		this.p5spr.setCollider("circle", 0, 0, 16);
		if (DEBUG_MODE) this.p5spr.debug = true;

		this.dashCollider = createSprite(0, 0);
		this.dashCollider.setCollider("circle", 0, 0, 15);
		
		this.cameraShake = createVector(0, 0);

		//movement variables
		this.posAtStartDash = createVector(0, 0);
		this.millisAtStartDash = 0;
		this.dashing = false;
		this.lastDashWasShort = false;
		this.dashCharge = 0;
		this.plrMoveSpeed = PLAYER_TOP_SPEED;
		this.vecInput = createVector(0, 0);

		//sword variables
		this.vecAimMouse = true;
		this.vecAim = createVector(0, 0);
		this.mouse = createVector(0, 0);

		GAMEPAD.bind(Gamepad.Event.BUTTON_DOWN, function (e) {
			usingGamepad = true;
			// e.control of GAMEPAD e.GAMEPAD pressed down
			// print(e.control);
			switch (e.control) {
				case "DPAD_LEFT":
					// case "FACE_3":
					objPlayer.vecInput.x = -1;
					break;
				case "DPAD_RIGHT":
					// case "FACE_2":
					objPlayer.vecInput.x = 1;
					break;
				case "DPAD_UP":
					// case "FACE_4":
					objPlayer.vecInput.y = -1;
					break;
				case "DPAD_DOWN":
					// case "FACE_1":
					objPlayer.vecInput.y = 1;
					break;
				case "FACE_1":
				case "LEFT_BOTTOM_SHOULDER":
				case "LEFT_TOP_SHOULDER":
					objPlayer.requestDash();
					break;
			}
		});
		GAMEPAD.bind(Gamepad.Event.BUTTON_UP, function (e) {
			usingGamepad = true;
			// e.control of GAMEPAD e.GAMEPAD pressed down
			//logmsg(e.control);
			switch (e.control) {
				case "DPAD_LEFT":
				case "DPAD_RIGHT":
					objPlayer.vecInput.x = 0;
					break;
				case "DPAD_UP":
				case "DPAD_DOWN":
					objPlayer.vecInput.y = 0;
					break;
				case "FACE_1":
				case "LEFT_BOTTOM_SHOULDER":
				case "LEFT_TOP_SHOULDER":
					objPlayer.commitDash();
					break;
			}
		});
		GAMEPAD.bind(Gamepad.Event.AXIS_CHANGED, function (e) {
			usingGamepad = true;
			// e.axis changed to value e.value for GAMEPAD e.GAMEPAD
			// print(e);
			if (e.axis.includes("LEFT")) {
				if (e.axis.includes("X")) objPlayer.vecInput.x = e.value;
				if (e.axis.includes("Y")) objPlayer.vecInput.y = e.value;
				this.vecAimMouse = false;
				this.vecAim = objPlayer.vecInput.copy().normalize();
				
				print("false!");
			}
		});
		GAMEPAD.bind(Gamepad.Event.TICK, function (gamepads) {
			// gamepads were updated (around 60 times a second)
			if (
				gamepads[0].buttons[0].pressed ||
				gamepads[0].buttons[0].touched ||
				gamepads[0].buttons[0].value > 0
			)
				objPlayer.requestDash();
		});
	}

	requestDash() {
		if (!this.dashCharging && !this.dashCollider.overlap(grpObstacles)) {
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
		if(this.vecAimMouse) {
			this.mouse.x = camera.mouseX;
			this.mouse.y = camera.mouseY;
		this.vecAim = p5.Vector.sub(this.mouse, this.p5spr.position).normalize();
		}
		this.updateMovement();
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
				if(this.p5spr.overlap(grpObstacles)) {
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
			this.vecInput.y = -1;
		} else if (
			keyDown("s") ||
			keyWentDown("s") ||
			keyDown("k") ||
			keyWentDown("k") ||
			keyDown(DOWN_ARROW) ||
			keyWentDown(DOWN_ARROW)
		) {
			this.vecInput.y = 1;
		} else if (
			keyWentUp("w") ||
			keyWentUp("i") ||
			keyWentUp("s") ||
			keyWentUp("k") ||
			keyWentUp(UP_ARROW) ||
			keyWentUp(DOWN_ARROW)
		) {
			this.vecInput.y = 0;
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
			this.vecInput.x = -1;
		} else if (
			keyDown("d") ||
			keyWentDown("d") ||
			keyDown("l") ||
			keyWentDown("l") ||
			keyDown(RIGHT_ARROW) ||
			keyWentDown(RIGHT_ARROW)
		) {
			this.vecInput.x = 1;
		} else if (
			keyWentUp("a") ||
			keyWentUp("j") ||
			keyWentUp("d") ||
			keyWentUp("l") ||
			keyWentUp(LEFT_ARROW) ||
			keyWentUp(RIGHT_ARROW)
		) {
			this.vecInput.x = 0;
		}

		if (this.vecInput.magSq() > 0.1) {
			this.vecInput.limit(1);
			this.p5spr.addSpeed(
				this.plrMoveSpeed * this.vecInput.mag(),
				degrees(this.vecInput.heading())
			);
		}

		this.p5spr.velocity.mult(DRAG);
		// print(player.velocity.magSq());

		//a camera is created automatically at the beginning
		//set the camera position to the player position
		camera.position.x = this.p5spr.position.x + this.cameraShake.x;
		camera.position.y = this.p5spr.position.y + this.cameraShake.y;
		
		this.cameraShake.mult(0.9);
		
		if(!this.dashing) {
			this.p5spr.collide(grpObstacles);
		}

		//limit the player movements
		if (this.p5spr.position.x < 0) this.p5spr.position.x = 0;
		if (this.p5spr.position.y < 0) this.p5spr.position.y = 0;
		if (this.p5spr.position.x > SCENE_W) this.p5spr.position.x = SCENE_W;
		if (this.p5spr.position.y > SCENE_H) this.p5spr.position.y = SCENE_H;

		this.dashCollider.position.x = this.p5spr.position.x;
		this.dashCollider.position.y = this.p5spr.position.y;
	}

	render() {
		//draw the player
		noStroke();
		fill(0, 0);
		if (this.dashCharging && this.dashCharge >= MILLIS_MINIMUM_FOR_DASH) {
			fill(255, 0, 0);
		}
		if (this.dashCharging && this.dashCharge >= MILLIS_FOR_FULL_DASH) {
			fill(0, 0, 255);
		}
		if (this.dashing) {
			fill(0, 255, 0);
		}
		ellipse(this.p5spr.position.x, this.p5spr.position.y, 64, 64);
		this.p5spr.rotation = this.p5spr.getDirection();
		drawSprite(this.p5spr);
		drawArrow(this.p5spr.position, p5.Vector.mult(this.vecAim, 50), "red");
	}
	
	camShake(strength) {
		this.cameraShake.add(p5.Vector.random2D().setMag(strength));
	}
}

class sLevel1 {
	constructor() {
		this.enter = function () {
			objPlayer.p5spr.position.x = SCENE_W / 2;
			// objPlayer.p5spr.position.y = SCENE_H - 10;
			objPlayer.p5spr.position.y = 50;
			objPlayer.p5spr.addSpeed(10, -90);

			//level content
			enemies.clear();
			grpObstaclesSolid.clear();
			
			let riverHeight = SCENE_H - 800;
			this.createRiver(-100, riverHeight);
			this.createRiver(700, riverHeight);
			this.createRiver(300, riverHeight);
			this.createRiver(1100, riverHeight);


			riverHeight = SCENE_H - 1200;
			this.createRiver(-100, riverHeight);
			this.createRiver(700, riverHeight);
			this.createRiver(300, riverHeight);
			this.createRiver(1100, riverHeight);
			riverHeight = SCENE_H - 1300;
			this.createRiver(-100, riverHeight);
			this.createRiver(700, riverHeight);
			this.createRiver(300, riverHeight);
			this.createRiver(1100, riverHeight);
			riverHeight = SCENE_H - 1400;
			this.createRiver(-100, riverHeight);
			this.createRiver(700, riverHeight);
			this.createRiver(300, riverHeight);
			this.createRiver(1100, riverHeight);
			

			createTree(200, SCENE_H - 2200, 2.4);
			createTree(860, SCENE_H - 2100, 3.0);
			createCrate(50, SCENE_H - 2150, 0.3);
			createCrate(920, SCENE_H - 1900, 0.4);


			
			createCrate(70, SCENE_H - 2886, 0.3);
			createCrate(199, SCENE_H - 3017, 0.35);
			createCrate(60, SCENE_H - 3103, 0.32);
			createTree(870, SCENE_H - 3052, 2.6);

			
			for(let i = 3500; i < SCENE_H + 1000; i += 500) {
				createTree(0 + random(0, 50), SCENE_H - i + random(-50, 50), random(2,3));
				createTree(SCENE_W - random(0, 50), SCENE_H - i + random(-50, 50), random(2,3));
			}



			enemies.add(new eDefault(SCENE_W/2+20, SCENE_H - 2200, -70));

			enemies.add(new eDefault(SCENE_W/2-100, SCENE_H - 2700, 85));
			enemies.add(new eDefault(SCENE_W/2+100, SCENE_H - 2700, 95));

			enemies.add(new eShooter(SCENE_W/2, SCENE_H - 3500, -90));

			enemies.add(new eShooter(SCENE_W/2-150, SCENE_H - 5000, -120, undefined, 450));
			enemies.add(new eShooter(SCENE_W/2+150, SCENE_H - 5000, -70, undefined, 450));
			//input hints
			//TODO: Implement "assets/ui/or.png"
			//keyboard+mouse
			this.hintPlus = loadAnimation("assets/ui/plus.png");

			this.hintKbMovement = loadAnimation("assets/ui/wasd.png", "assets/ui/arrows.png", "assets/ui/ijkl.png");
			this.hintKbMovement.frameDelay = 60;

			this.hintKbDashShort = loadAnimation("assets/ui/spaceUP.png", "assets/ui/spaceDOWN.png");
			this.hintDashShort = loadAnimation("assets/ui/spaceShort.png");
			this.hintKbDashShort.frameDelay = 20;

			this.hintKbDashLong = loadAnimation("assets/ui/spaceUP.png", "assets/ui/spaceDOWN.png");
			this.hintDashLong = loadAnimation("assets/ui/spaceLong.png");
			this.hintKbDashLong.frameDelay = 60;

			let ss = loadSpriteSheet("assets/ui/mouseLSheet.png", 45, 54, 2);
			this.hintMouseL = loadAnimation(ss);
			this.hintMouseL.frameDelay = 20;

			//gamepad
			ss = loadSpriteSheet("assets/ui/stickL.png", int(432/3), int(384/4), 12);
			this.hintGpMovement = loadAnimation(ss);
			this.hintGpMovement.frameDelay = 10;

			this.hintGpForward = loadAnimation("assets/ui/controllerForward/tile000.png", "assets/ui/controllerForward/tile005.png");
			this.hintGpForward.frameDelay = 20;

			this.hintGpDashShortA = loadAnimation("assets/ui/A_color_dark_32.png", "assets/ui/A_dark_color_32.png");
			this.hintGpDashShortA.frameDelay = 20;
			this.hintGpDashShortLB = loadAnimation("assets/ui/LB_light_32.png", "assets/ui/LB_dark_32.png",);
			this.hintGpDashShortLB.frameDelay = 20;
			this.hintGpDashShortLT = loadAnimation("assets/ui/LT_tall_light_32.png", "assets/ui/LT_tall_dark_32.png");
			this.hintGpDashShortLT.frameDelay = 20;

			this.hintGpDashLongA = loadAnimation("assets/ui/A_color_dark_32.png", "assets/ui/A_dark_color_32.png");
			this.hintGpDashLongA.frameDelay = 60;
			this.hintGpDashLongLB = loadAnimation("assets/ui/LB_light_32.png", "assets/ui/LB_dark_32.png",);
			this.hintGpDashLongLB.frameDelay = 60;
			this.hintGpDashLongLT = loadAnimation("assets/ui/LT_tall_light_32.png", "assets/ui/LT_tall_dark_32.png");
			this.hintGpDashLongLT.frameDelay = 60;

			this.hintGpSlash = loadAnimation("assets/ui/Layout_X_dark.png")
		};

		this.draw = function () {
			//draw background
			drawSprites(grpBackgroundTiles);
			drawSprites(grpObstaclesSolid);
			drawSprites(grpObstaclesDashthrough);

			enemies.array.forEach((enemy) => {
				enemy.update();
				enemy.render();
			});

			stroke(255);
			strokeWeight(4);
			line(0, 0, 0, SCENE_H);
			// line(0, 0, SCENE_W, 0);
			line(SCENE_W, 0, SCENE_W, SCENE_H);
			line(0, SCENE_H, SCENE_W, SCENE_H);
			
			push();
			translate(SCENE_W / 2 + 100, SCENE_H - 100);
			if(usingGamepad) {
				animation(this.hintGpMovement, 0, 0);

				translate(0, -410);
				animation(this.hintGpForward, -200, -275);
				animation(this.hintPlus, -97, -270);
				translate(-80, -100)
				animation(this.hintGpDashShortA, 30, -190);
				animation(this.hintGpDashShortLB, 80, -190);
				animation(this.hintGpDashShortLT, 80, -150);
				animation(this.hintDashShort, 57, -215);
				
				translate(80, -320);
				animation(this.hintGpForward, -200, -275);
				animation(this.hintPlus, -97, -270);
				translate(-80, -100)
				animation(this.hintGpDashLongA, 30, -190);
				animation(this.hintGpDashLongLB, 80, -190);
				animation(this.hintGpDashLongLT, 80, -150);
				animation(this.hintDashLong, 57, -215);

				translate(0, -1200);
				animation(this.hintGpSlash, -100, 150);
			} else {
				animation(this.hintKbMovement, 0, 0);

				translate(0, -400);
				animation(this.hintKbMovement, -200, -280);
				animation(this.hintPlus, -115, -280);
				animation(this.hintKbDashShort, 0, -280);
				animation(this.hintDashShort, 0, -280);

				translate(0, -400);
				animation(this.hintKbMovement, -200, -280);
				animation(this.hintPlus, -115, -280);
				animation(this.hintKbDashLong, 0, -280);
				animation(this.hintDashLong, 0, -280);

				translate(0, -1200);
				animation(this.hintMouseL, -150, 0);
			}
			pop();

			objPlayer.update();
			objPlayer.render();
		};
	}

	createRiver(x, y) {
		let river = createSprite(x, y);
		river.addImage(imgRiver);
		// river.setCollider("rectangle", 0, 0, imgRiver.width, imgRiver.height);
		river.setDefaultCollider();
		if (DEBUG_MODE) river.debug = true;
		grpObstaclesDashthrough.add(river);
	}
}

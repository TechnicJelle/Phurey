class sLevel1 {
	constructor() {
		this.enter = function () {
			objPlayer.p5spr.position.x = SCENE_W / 2;
			objPlayer.p5spr.position.y = SCENE_H - 10;
			objPlayer.p5spr.addSpeed(10, -90);

			//obstacles
			grpObstacles.clear();
			
			this.createTree(200, SCENE_H - 2000);
			
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

			//enemies
			enemies.clear();
			
			enemies.add(new eDefault(100, 100));

			//input hints
			this.hintPlus = loadAnimation("assets/ui/plus.png");

			this.hintKbMovement = loadAnimation("assets/ui/wasd.png", "assets/ui/arrows.png", "assets/ui/ijkl.png");
			this.hintKbMovement.frameDelay = 60;

			this.hintKbDashShort = loadAnimation("assets/ui/spaceUP.png", "assets/ui/spaceDOWN.png");
			this.hintDashShort = loadAnimation("assets/ui/spaceShort.png");
			this.hintKbDashShort.frameDelay = 20;

			this.hintKbDashLong = loadAnimation("assets/ui/spaceUP.png", "assets/ui/spaceDOWN.png");
			this.hintDashLong = loadAnimation("assets/ui/spaceLong.png");
			this.hintKbDashLong.frameDelay = 60;
			
			this.ss = loadSpriteSheet("assets/ui/stickL.png", int(432/3), int(384/4), 12);
			this.hintGpMovement = loadAnimation(this.ss);
			this.hintGpMovement.frameDelay = 10;

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
		};

		this.draw = function () {
			//draw background
			drawSprites(grpBackgroundTiles);
			drawSprites(grpObstacles);

			enemies.array.forEach((enemy) => {
				enemy.update();
			});
			drawSprites(enemies.group);

			if (DEBUG_MODE) {
				stroke(255);
				strokeWeight(4);
				line(0, 0, 0, SCENE_H);
				line(0, 0, SCENE_W, 0);
				line(SCENE_W, 0, SCENE_W, SCENE_H);
				line(0, SCENE_H, SCENE_W, SCENE_H);
			}
			
			push();
			translate(SCENE_W / 2 + 100, SCENE_H - 100);
			if(usingGamepad) {
				animation(this.hintGpMovement, 0, 0);

				translate(0, -410);
				animation(this.hintGpMovement, -200, -275);
				animation(this.hintPlus, -97, -270);
				translate(-80, -100)
				animation(this.hintGpDashShortA, 30, -190);
				animation(this.hintGpDashShortLB, 80, -190);
				animation(this.hintGpDashShortLT, 80, -150);
				animation(this.hintDashShort, 57, -215);
				
				translate(80, -320);
				animation(this.hintGpMovement, -200, -275);
				animation(this.hintPlus, -97, -270);
				translate(-80, -100)
				animation(this.hintGpDashLongA, 30, -190);
				animation(this.hintGpDashLongLB, 80, -190);
				animation(this.hintGpDashLongLT, 80, -150);
				animation(this.hintDashLong, 57, -215);
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
			}
			pop();

			objPlayer.update();
			objPlayer.render();
		};
	}

	createRiver(x, y) {
		let river = createSprite(x, y);
		river.addImage(imgRiver);
		river.setCollider("rectangle", 0, 0, imgRiver.width, imgRiver.height);
		if (DEBUG_MODE) river.debug = true;
		grpObstacles.add(river);
	}
	
	createTree(x, y) {
		let tree = createSprite(x, y);
		tree.addImage(imgTree);
		tree.scale = 2;
		tree.setCollider("circle", 0, 0, 50);
		if (DEBUG_MODE) tree.debug = true;
		grpObstacles.add(tree);
	}
}

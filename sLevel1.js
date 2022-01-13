class sLevel1 {
	constructor() {
		this.hintKbMovement;
		this.hintKbDashShort;
		this.hintKbDashLong;

		this.hintGpMovement;
		this.hintGpDashShort;
		this.hintGpDashLong;

		this.enter = function () {
			objPlayer.p5spr.position.x = SCENE_W / 2;
			objPlayer.p5spr.position.y = SCENE_H - 10;
			objPlayer.p5spr.addSpeed(10, -90);

			grpObstacles.clear();
			
			this.riverHeight = SCENE_H - 400;
			this.createRiver(-100, this.riverHeight);
			this.createRiver(700, this.riverHeight);
			this.createRiver(300, this.riverHeight);
			this.createRiver(1100, this.riverHeight);


			this.riverHeight = SCENE_H - 800;
			this.createRiver(-100, this.riverHeight);
			this.createRiver(700, this.riverHeight);
			this.createRiver(300, this.riverHeight);
			this.createRiver(1100, this.riverHeight);
			this.riverHeight = SCENE_H - 900;
			this.createRiver(-100, this.riverHeight);
			this.createRiver(700, this.riverHeight);
			this.createRiver(300, this.riverHeight);
			this.createRiver(1100, this.riverHeight);
			this.riverHeight = SCENE_H - 1000;
			this.createRiver(-100, this.riverHeight);
			this.createRiver(700, this.riverHeight);
			this.createRiver(300, this.riverHeight);
			this.createRiver(1100, this.riverHeight);

			this.hintKbMovement = loadAnimation("assets/ui/wasd.png", "assets/ui/arrows.png", "assets/ui/ijkl.png");
			this.hintKbMovement.frameDelay = targetFrameRate;

			this.hintKbDashShort = loadAnimation("assets/ui/spaceUP.png", "assets/ui/spaceDOWN.png");
			this.hintKbDashShort.frameDelay = targetFrameRate/3.0;

			this.hintKbDashLong = loadAnimation("assets/ui/spaceUP.png", "assets/ui/spaceDOWN.png");
			this.hintKbDashLong.frameDelay = targetFrameRate;

			this.hintGpMovement = loadAnimation("assets/ui/L_dark_48.png");
			this.hintGpMovement.frameDelay = targetFrameRate;

			this.hintGpDashShortA = loadAnimation("assets/ui/A_color_dark_32.png", "assets/ui/A_dark_color_32.png");
			this.hintGpDashShortA.frameDelay = targetFrameRate/3.0;
			this.hintGpDashShortLB = loadAnimation("assets/ui/LB_light_32.png", "assets/ui/LB_dark_32.png",);
			this.hintGpDashShortLB.frameDelay = targetFrameRate/3.0;
			this.hintGpDashShortLT = loadAnimation("assets/ui/LT_tall_light_32.png", "assets/ui/LT_tall_dark_32.png");
			this.hintGpDashShortLT.frameDelay = targetFrameRate/3.0;

			this.hintGpDashLongA = loadAnimation("assets/ui/A_color_dark_32.png", "assets/ui/A_dark_color_32.png");
			this.hintGpDashLongA.frameDelay = targetFrameRate;
			this.hintGpDashLongLB = loadAnimation("assets/ui/LB_light_32.png", "assets/ui/LB_dark_32.png",);
			this.hintGpDashLongLB.frameDelay = targetFrameRate;
			this.hintGpDashLongLT = loadAnimation("assets/ui/LT_tall_light_32.png", "assets/ui/LT_tall_dark_32.png");
			this.hintGpDashLongLT.frameDelay = targetFrameRate;
		};

		this.draw = function () {
			//draw background
			drawSprites(objBackgroundTiles);
			drawSprites(grpObstacles);

			objPlayer.update();
			objPlayer.render();

			if (DEBUG_MODE) {
				stroke(255);
				strokeWeight(4);
				line(0, 0, 0, SCENE_H);
				line(0, 0, SCENE_W, 0);
				line(SCENE_W, 0, SCENE_W, SCENE_H);
				line(0, SCENE_H, SCENE_W, SCENE_H);
				grpObstacles.debug = true;
			}
			
			if(usingGamepad) {
				push();
				translate(SCENE_W / 2 + 100, SCENE_H - 100);
				animation(this.hintGpMovement, 0, 0);
				animation(this.hintGpDashShortA, 30, -180);
				animation(this.hintGpDashShortLB, 80, -200);
				animation(this.hintGpDashShortLT, 80, -150);
				
				translate(0, -400);
				animation(this.hintGpDashLongA, 30, -180);
				animation(this.hintGpDashLongLB, 80, -200);
				animation(this.hintGpDashLongLT, 80, -150);
				pop();
			} else {
				animation(this.hintKbMovement, SCENE_W / 2 + 100, SCENE_H - 100);
				animation(this.hintKbDashShort, SCENE_W / 2 + 130, SCENE_H - 250);
				animation(this.hintKbDashLong, SCENE_W / 2 + 130, SCENE_H - 650);
			}
		};
	}

	createRiver(x, y) {
		this.river = createSprite(x, y);
		this.river.addImage(loadImage("assets/platform.png"));
		grpObstacles.add(this.river);
	}
}

class sLevel2 {
	constructor() {
		this.enter = function () {
			objPlayer.p5spr.position.x = SCENE_W / 2;
			// objPlayer.p5spr.position.y = SCENE_H - height/2 - 100;
			objPlayer.p5spr.position.y = 50;
			objPlayer.p5spr.addSpeed(10, -90);

			//level content
			enemies.clear();
			grpObstaclesSolid.clear();
			powerups.clear();

			powerups.add(new puShield(SCENE_W/2, SCENE_H -50));
			
			

			createCrate(12, SCENE_H - 866, 0.3);
			createCrate(974, SCENE_H - 852, 0.4);
			createTree(150, SCENE_H - 1000, 3.1);
			createTree(860, SCENE_H - 1000, 2.9);

			

			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 1500, 90));
			enemies.add(new eDefault(SCENE_W/2-100, SCENE_H - 1600, 85, 520));
			enemies.add(new eDefault(SCENE_W/2+100, SCENE_H - 1600, 95, 520));

			enemies.add(new eShooter(SCENE_W/2-350, SCENE_H - 2000, -120, 600, 400));
			enemies.add(new eShooter(SCENE_W/2+350, SCENE_H - 2000, -70, 600, 400));

			createCrate(968, SCENE_H - 1388, 0.2);
			createCrate(74, SCENE_H - 1424, 0.35);


			
			enemies.add(new eShooter(SCENE_W/2-150, SCENE_H - 3100, -120, 600, 600));
			enemies.add(new eShooter(SCENE_W/2, SCENE_H - 3500, -90, 1000, 600));
			enemies.add(new eShooter(SCENE_W/2+150, SCENE_H - 3100, -70, 600, 600));

			
			powerups.add(new puSword(SCENE_W/2, SCENE_H - 4500));

			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5000, 90, 200, 400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5100, 90, 300, 400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5200, 90, 400, 400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5300, 90, 500, 400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5400, 90, 600, 400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5500, 90, 700, 400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5600, 90, 800, 400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5700, 90, 900, 400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5800, 90, 1000,400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 5900, 90, 1100,400));
			enemies.add(new eDefault(SCENE_W/2, SCENE_H - 6000, 90, 1200,400));

			enemies.add(new eShooter(SCENE_W/2-150, SCENE_H - 5500, -120, 600, 600));
			enemies.add(new eShooter(SCENE_W/2+150, SCENE_H - 5500, -70, 600, 600));


			powerups.add(new puShield(SCENE_W/2, SCENE_H - 6500));

			enemies.add(new eShooter(40, SCENE_H - 7210, 170, 1000, 300));

			let count = 3;
			let offset = 350;
			let io = (count - 1) * offset;
			for (var i = 0; i <= io; i+= offset) {
				enemies.add(new eDefault(SCENE_W/2-350, SCENE_H - 7290 - i, 75, 250, 400));
				enemies.add(new eDefault(SCENE_W/2-250, SCENE_H - 7360 - i, 80, 250, 400));
				enemies.add(new eDefault(SCENE_W/2-150, SCENE_H - 7430 - i, 85, 250, 400));
				enemies.add(new eDefault(SCENE_W/2-50, SCENE_H - 7500 - i, 88, 250, 400));
				enemies.add(new eDefault(SCENE_W/2, SCENE_H - 7570 - i, 90, 300, 400));
				enemies.add(new eDefault(SCENE_W/2+50, SCENE_H - 7500 - i, 92, 250, 400));
				enemies.add(new eDefault(SCENE_W/2+150, SCENE_H - 7430 - i, 95, 250, 400));
				enemies.add(new eDefault(SCENE_W/2+250, SCENE_H - 7360 - i, 100, 250, 400));
				enemies.add(new eDefault(SCENE_W/2+350, SCENE_H - 7290 - i, 105, 250, 400));
			}

			enemies.add(new eShooter(SCENE_W-40, SCENE_H - 7210, 10, 1000, 300));


			
			// createCrate(70, SCENE_H - 2886, 0.3);
			// createCrate(199, SCENE_H - 3017, 0.35);
			// createCrate(60, SCENE_H - 3103, 0.32);
			// createTree(870, SCENE_H - 3052, 2.6);

			// createTree(SCENE_W/2, SCENE_H - 50, 1);

			
			for(let i = 2500; i < SCENE_H + 1000; i += 500) {
				createTree(0 + random(0, 50), SCENE_H - i + random(-50, 50), random(2,3));
				createTree(SCENE_W - random(0, 50), SCENE_H - i + random(-50, 50), random(2,3));
			}



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

			powerups.array.forEach((powerup) => {
				powerup.update();
				powerup.render();
			});

			stroke(255);
			strokeWeight(4);
			line(0, 0, 0, SCENE_H);
			// line(0, 0, SCENE_W, 0);
			line(SCENE_W, 0, SCENE_W, SCENE_H);
			line(0, SCENE_H, SCENE_W, SCENE_H);
			

			objPlayer.update();
			objPlayer.render();
		};
	}
}

class sLevel2 {
	constructor() {
		this.enter = function () {
			objPlayer.p5spr.position.x = SCENE_W / 2;
			objPlayer.p5spr.position.y = SCENE_H - height/2 - 100;
			objPlayer.p5spr.addSpeed(10, -90);

			//level content
			enemies.clear();
			grpObstaclesSolid.clear();
			
			

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


			
			enemies.add(new eShooter(SCENE_W/2, SCENE_H - 3000, -90, 500));
			enemies.add(new eShooter(SCENE_W/2-350, SCENE_H - 3000, -120, 500));
			enemies.add(new eShooter(SCENE_W/2+350, SCENE_H - 3000, -70, 500));


			
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

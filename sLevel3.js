class sLevel3 {
	constructor() {
		this.enter = function () {
			objPlayer.p5spr.position.x = SCENE_W / 2;
			objPlayer.p5spr.position.y = SCENE_H - 100;
			// objPlayer.p5spr.position.y = SCENE_H - 5000;
			objPlayer.p5spr.addSpeed(10, -90);

			//level content
			enemies.clear();
			grpObstaclesSolid.clear();
			powerups.clear();

			//bottom
			this.createBuilding(400, SCENE_H + 250, imgBuilding2, -180, 1);
			this.createBuilding(800, SCENE_H + 200, imgBuilding3, -180, 1);
			
			//side
			this.createBuilding(40, SCENE_H - 240, imgBuilding1, -90, 1);
			this.createBuilding(1200, SCENE_H - 250, imgBuilding2, 90, 1);
			
			this.createBuilding(150, SCENE_H - 900, imgBuilding3, -90, 1);
			this.createBuilding(1000, SCENE_H - 900, imgBuilding1, 90, 1);

			powerups.add(new puShield(911, SCENE_H - 1230));

			this.createBuilding(200, SCENE_H - 1500, imgBuilding2, -90, 1);
			this.createBuilding(1100, SCENE_H - 1500, imgBuilding3, 90, 1);

			enemies.add(new eDefault(45, SCENE_H - 1167, -30, 1000, 500));

			enemies.add(new eShooter(955, SCENE_H - 1767, 0, 1000, 400));
			enemies.add(new eShooter(425, SCENE_H - 1818, 180, 1000, 400));

			createCrate(28, SCENE_H - 1859, 0.3);
			this.createBuilding(100, SCENE_H - 2227, imgBuilding2, -90, 1);
			this.createBuilding(1000, SCENE_H - 2227, imgBuilding3, 90, 1);

			enemies.add(new eDefault(949, SCENE_H - 2491, 180, 1000, 500));
			enemies.add(new eShooter(100, SCENE_H - 2491, 180, 1000, 500));

			this.createBuilding(435, SCENE_H - 2800, imgBuilding2, -90, 1);
			this.createBuilding(1130, SCENE_H - 2800, imgBuilding3, 90, 1);

			createCrate(-55, SCENE_H - 2626, 0.3);
			enemies.add(new eDefault(100, SCENE_H - 3000, 90, 800, 100));
			enemies.add(new eShooter(14, SCENE_H - 2800, -90, 400, 50));
			enemies.add(new eShooter(125, SCENE_H - 2800, -90, 400, 50));

			powerups.add(new puSword(50, SCENE_H - 3110));

			enemies.add(new eShooter(32, SCENE_H - 3496, 100, 250, 100));
			enemies.add(new eShooter(110, SCENE_H - 3505, 95, 250, 70));

			enemies.add(new eShooter(32, SCENE_H - 3200, 100, 250, 100));
			enemies.add(new eShooter(110, SCENE_H - 3200, 95, 250, 70));
			

			this.createBuilding(435, SCENE_H - 3300, imgBuilding2, -90, 1);
			this.createBuilding(1130, SCENE_H - 3300, imgBuilding3, 90, 1);

			this.createBuilding(0, SCENE_H - 4100, imgBuilding1, -90, 1);
			this.createBuilding(1100, SCENE_H - 4000, imgBuilding2, 90, 1);

			for(let j = 4100; j <= 5000; j += 300) {
				enemies.add(new eDefault(250, SCENE_H - j, 90, 350, 700));
				enemies.add(new eDefault(350, SCENE_H - j, 90, 300, 700));
				enemies.add(new eDefault(450, SCENE_H - j, 90, 250, 700));
				enemies.add(new eDefault(550, SCENE_H - j, 90, 250, 700));
				enemies.add(new eDefault(650, SCENE_H - j, 90, 250, 700));
				enemies.add(new eDefault(750, SCENE_H - j, 90, 300, 700));
			}
			enemies.add(new eShooter(100, SCENE_H - 4600, 180, 800, 300));
			enemies.add(new eShooter(900, SCENE_H - 4600, 0, 800, 300));

			createTree(100, SCENE_H - 6500, 3);
			createTree(900, SCENE_H - 6500, 3);
			this.createBuilding(SCENE_W / 2, SCENE_H - 6500, imgBuilding4, 0, 0.8);
			totalEnemies = enemies.group.size();
			livingEnemies = totalEnemies;



		};

		this.draw = function () {

			//draw background
			drawSprites(grpBackgroundTiles);

			//draw borders
			stroke(255);
			strokeWeight(4);
			line(0, 0, 0, SCENE_H);
			// line(0, 0, SCENE_W, 0);
			line(SCENE_W, 0, SCENE_W, SCENE_H);
			// line(0, SCENE_H, SCENE_W, SCENE_H);


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

			

			objPlayer.update();
			objPlayer.render();
		};

		this.createBuilding = function (x, y, img, rotation, scale){
			let newSprite = createSprite(x, y);
			newSprite.addImage(img);
			newSprite.scale = scale;
			newSprite.rotation = rotation;
			newSprite.setCollider("rectangle", 0, 0, img.width, img.height)
			if (DEBUG_MODE) newSprite.debug = true;
			grpObstaclesSolid.add(newSprite);
		}
	}
}

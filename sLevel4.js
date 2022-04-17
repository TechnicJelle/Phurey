class sLevel4 {
	constructor() {
		this.enter = function () {
			objPlayer.p5spr.position.x = SCENE_W / 2;
			objPlayer.p5spr.position.y = SCENE_H / 2;
			// objPlayer.p5spr.position.y = SCENE_H - 6000;
			objPlayer.p5spr.addSpeed(10, -90);

			//level content
			enemies.clear();
			grpObstaclesSolid.clear();
			powerups.clear();

			
			totalEnemies = enemies.group.size();
			livingEnemies = totalEnemies;

			this.millisAtEndGame = millis();
			this.strTotalTime = "The bandits were captured and brought to justice.\n\n";
			this.strTotalTime += "Total Time: " + millisToMinutesAndSeconds(this.millisAtEndGame - millisAtStartGame);
		};

		this.draw = function () {

			//draw background
			drawSprites(grpBackgroundTiles);

			//draw borders
			stroke(255);
			strokeWeight(4);
			line(0, 0, 0, SCENE_H);
			line(0, 0, SCENE_W, 0);
			line(SCENE_W, 0, SCENE_W, SCENE_H);
			line(0, SCENE_H, SCENE_W, SCENE_H);


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

			
			fill(255);
			noStroke();
			textAlign(CENTER, CENTER);
			textSize(32);
			text(this.strTotalTime, SCENE_W/2, SCENE_H / 2);
			textAlign(LEFT, TOP);
			textSize(16);

			

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

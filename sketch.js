//the scene is way bigger than the canvas
let SCENE_W = 1000;
let SCENE_H = 6000;
let DEBUG_MODE = false;
let SCENE_MANAGER;
let GAMEPAD;

//assets
let imgSand;
let imgPlayer;
let imgEnemyDefault;
let imgRiver;
let imgTree;
let imgKatana;

//objects
let objPlayer;
let grpBackgroundTiles; //background group
let grpObstaclesSolid;
let grpObstaclesDashthrough;
let powerups;
let enemies;

//options
let PLAYER_TOP_SPEED = 2;
let PLAYER_SPEED_WHILE_CHARGING = 0.6;
let PLAYER_SPEEDSQ_UNDER_WHICH_DASH_STOPS = 180;
let PLAYER_MAX_DASH = 60;
let PLAYER_SHORT_DASH = 30;
let DRAG = 0.85;
let MILLIS_FOR_FULL_DASH = 1000;
let MILLIS_MINIMUM_FOR_DASH = 200;
let MILLIS_BETWEEN_SHORT_DASHES = 500;

//variables that need to be remembered
let vecLeftStick;
let gamepadConnectedAttempts = 0;
let lastFramerates = [];
let frameRateWarniningGiven = false;
let currentLevel = 0;

//score variables
let strScore = "";
let millisAtShowScore = 0;
let MILLIS_TO_SHOW_SCORE_FOR = 5000;
let totalEnemies = 0;
let livingEnemies = 0;
let millisAtStartGame = 0;
let millisAtStartLevel = 0;

let usingGamepad;

function preload() {
	//create a sprite and add the 3 animations
	imgCrate = loadImage("assets/RTS_Crate.png");
	imgSand = loadImage("assets/aerial_beach_01_diff_1k.jpg");
	imgRedRock = loadImage("assets/sandstone_cracks_diff_1k.jpg");
	imgMossySand = loadImage("assets/rock_pitted_mossy_diff_1k.jpg");
	imgSpace = loadImage("assets/space.png");
	imgPlayer = loadImage("assets/asteroids_ship0001.png");
	imgEnemyDefault = loadImage("assets/eDefault.png");
	imgRiver = loadImage("assets/platform.png");
	imgTree = loadImage("assets/cloud_breathing0004.png");
	imgKatana = loadImage("assets/katana.png");
	imgPUShield = loadImage("assets/PowerUp_07.png");
	imgPUSword = loadImage("assets/PowerUp_08.png");
	// imgPUSpeed = loadImage("assets/PowerUp_05b.png"); CANCELLED
	imgBuilding1 = loadImage("assets/building1.png");
	imgBuilding2 = loadImage("assets/building2.png");
	imgBuilding3 = loadImage("assets/building3.png");
	imgBuilding4 = loadImage("assets/building4.png");

	// soundFormats('wav', 'mp3');
	sfxCharge = loadSound("assets/sound/charge.mp3");
	sfxDash = loadSound("assets/sound/User Interface, Motion, Whoosh, Maximize, Short SND31007.wav");

	sfxPowerupGet = loadSound("assets/sound/Electricity, Zap, Shock, Impact, Heavy 01 SND20301.wav");
	sfxPowerupAmbient = loadSound("assets/sound/Electricity, Buzz & Hum, Motor, Electric, Neon, Loop SND5749.wav");
	sfxPowerupAmbient.setLoop(true);
	sfxPowerupAmbient.setVolume(0);

	sfxSlash1 = loadSound("assets/sound/Weapons, Sword, Swing Fast, Whoosh, Metal SND34535.wav");
	sfxSlash2 = loadSound("assets/sound/Weapons, Sword, Swing Fast, Whoosh, Metal SND34535 (2).wav");
	sfxSlash3 = loadSound("assets/sound/Weapons, Sword, Swing Fast, Whoosh, Metal SND34535 (3).wav");
	sfxSlash4 = loadSound("assets/sound/Weapons, Sword, Swing Fast, Whoosh, Metal SND34535 (4).wav");

	sfxShoot1 = loadSound("assets/sound/Guns, Pistol, Revolver, Shot x4 SND6028.wav");
	sfxShoot2 = loadSound("assets/sound/Guns, Pistol, Revolver, Shot x4 SND6028 (2).wav");
	sfxShoot3 = loadSound("assets/sound/Guns, Pistol, Revolver, Shot x4 SND6028 (3).wav");
	sfxShoot4 = loadSound("assets/sound/Guns, Pistol, Revolver, Shot x4 SND6028 (4).wav");

	sfxEnemyHit = loadSound("assets/sound/Gore, Stab, Knife, Slice, Slash Skin, Fleshy, Gore 02 SND22380.wav");
	sfxBulletHit1 = loadSound("assets/sound/Bullets, Impact, Metal, Heavy, Powerful, Hard SND6400.wav");
	sfxBulletHit2 = loadSound("assets/sound/Bullets, Impact, Metal, Heavy, Powerful, Hard SND6400 (2).wav");
	sfxBulletHit3 = loadSound("assets/sound/Bullets, Impact, Metal, Heavy, Powerful, Hard SND6400 (3).wav");
	sfxBulletHit4 = loadSound("assets/sound/Bullets, Impact, Metal, Heavy, Powerful, Hard SND6400 (4).wav");
	sfxBulletHit5 = loadSound("assets/sound/Bullets, Impact, Metal, Heavy, Powerful, Hard SND6400 (5).wav");
	sfxBulletHit6 = loadSound("assets/sound/Bullets, Impact, Metal, Heavy, Powerful, Hard SND6400 (6).wav");
	sfxBulletHit7 = loadSound("assets/sound/Bullets, Impact, Metal, Heavy, Powerful, Hard SND6400 (7).wav");
	sfxBulletHit8 = loadSound("assets/sound/Bullets, Impact, Metal, Heavy, Powerful, Hard SND6400 (8).wav");

	sfxStart = loadSound("assets/sound/Games, Video, GUI Menu Button, Select OK, Start Game, Metal Dark, Resonant Reverb SND67956.wav");
	sfxStart.rate(1.2);

	sfxPlrWalk = loadSound("assets/sound/Footsteps, Human, Dirt, Dry, Sneaker, Medium SND1034.wav");
	sfxPlrWalk.setLoop(true);
	sfxPlrWalk.setVolume(0);
	sfxPlrWalk.rate(2);

	sfxEnemyWalk = loadSound("assets/sound/Footsteps, Human, Sand, Step Hard SND62094.wav");
	sfxEnemyWalk.setLoop(true);
	sfxEnemyWalk.setVolume(0);
	sfxEnemyWalk.rate(2);
}

function setup() {
	createCanvas(800, 800);
	frameRate(60); //framerate should be being limited to 60, but it isn't

	//TODO: fix this; it is broken
	let mainDOM = document.getElementsByTagName('main')[0];
	let h1 = createElement("h1", "Phurey");
	h1.parent(mainDOM);
	h1.style("color", "#FFFFFF");
	h1.style("font-family", "Helvetica, sans-serif");
	h1.style("text-align", "center");
	let p = createP("Phurey is a challenging top-down slasher/shooter");
	p.parent(mainDOM);
	p.style("color", "#FFFFFF");
	p.style("font-family", "Helvetica, sans-serif");
	p.style("text-align", "center");

	vecLeftStick = createVector(0, 0);

	GAMEPAD = new Gamepad();
	GAMEPAD.bind(Gamepad.Event.CONNECTED, function (device) {
	// a new GAMEPAD connected
	print("connected");
	setUsingGamepad(true);
	if (!SCENE_MANAGER.isCurrent(sMainMenu)) {
		gamepadConnectedAttempts++;
		if (gamepadConnectedAttempts == 10) {
			warnUser("Your browser doesn't work well with gamepads. Use mouse and keyboard,<br/>or use Firefox to be able to use your gamepad after all.");
		}
	}
	});
	GAMEPAD.bind(Gamepad.Event.DISCONNECTED, function (device) {
	// GAMEPAD disconnected
	print("disconnected");
	});
	GAMEPAD.bind(Gamepad.Event.UNSUPPORTED, function (device) {
	// an unsupported gamepad connected (add new mapping)
	createP("Unsupported gamepad");
	});

	if (GAMEPAD.init()) {
	//sel = createSelect();
	} else {
		warnUser("Your browser does not support gamepads. Please get the latest Firefox");
	}

	setupLevel(imgSand);

	SCENE_MANAGER = new SceneManager();
	SCENE_MANAGER.addScene(sMainMenu);
	SCENE_MANAGER.addScene(sLevel1);
	SCENE_MANAGER.addScene(sLevel2);
	SCENE_MANAGER.addScene(sLevel3);

	SCENE_MANAGER.showNextScene();
}

function draw() {
	sfxEnemyWalk.setVolume(0);
	SCENE_MANAGER.draw();

	//I can turn on and off the camera at any point to restore
	//the normal drawing coordinates, the frame will be drawn at
	//the absolute 0,0
	camera.off();
	//hud here
	fill(255);
	if(!frameRateWarniningGiven) {
		lastFramerates.push(frameRate());
		if(lastFramerates.length > 60) lastFramerates.shift();
		let avg = lastFramerates.reduce((a,v,i)=>(a*i+v)/(i+1));
		if (millis() > 5000 && avg > 75 && !SCENE_MANAGER.isCurrent(sMainMenu)) {
			warnUser("This game runs too fast on high refresh rate screens.<br/>Set your monitor's refresh rate to 60 for a better experience.");
			frameRateWarniningGiven = true;
		}
	}
	if (DEBUG_MODE) {
		noStroke();
		text(int(frameRate()), 10, 10);
		text(objPlayer.health, 10, 30);
		text(millis() - millisAtStartGame, 10, 50);
		text(millis() - millisAtStartLevel, 10, 70);
	}
	
	if (millis() - millisAtShowScore < MILLIS_TO_SHOW_SCORE_FOR) {
		stroke(0);
		strokeWeight(4);
		fill(255);
		textAlign(CENTER, CENTER);
		textSize(32);
		text(strScore, width/2, height - 50);
		textAlign(LEFT, TOP);
		textSize(16);
	}


	
	if(!sfxPowerupAmbient.isPlaying()) sfxPowerupAmbient.play();
	sfxPowerupAmbient.setVolume(0);
	if(objPlayer.health > 1) {
		stroke(0, 0, 255);
		strokeWeight(10);
		line(0, height - 10, map(millis() - objPlayer.millisAtGetPUHealth, 0, objPlayer.millisPUHealthDuration, width, 0), height - 10);
		sfxPowerupAmbient.setVolume(0.3);
	}

	if(objPlayer.millisBetweenSlashes != objPlayer.millisBetweenSlashesDefault) {
		stroke(255, 128, 64);
		strokeWeight(10);
		line(0, height - 25, map(millis() - objPlayer.millisAtGetPUSword, 0, objPlayer.millisPUSwordDuration, width, 0), height - 25);
		sfxPowerupAmbient.setVolume(0.4);
	}

	// if(objPlayer.plrMoveSpeed > PLAYER_TOP_SPEED) {
	// 	stroke(0, 255, 0);
	// 	strokeWeight(10);
	// 	line(0, height - 40, map(millis() - objPlayer.millisAtGetPUSpeed, 0, objPlayer.millisPUSpeedDuration, width, 0), height - 40);
	// }
}

function drawArrow(base, vec, myColor) {
	push();
	stroke(myColor);
	strokeWeight(3);
	fill(myColor);
	translate(base.x, base.y);
	line(0, 0, vec.x, vec.y);
	rotate(vec.heading());
	let arrowSize = 7;
	translate(vec.mag() - arrowSize, 0);
	triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	pop();
}

document.oncontextmenu = function () {
	return false;
};

function mousePressed() {
	SCENE_MANAGER.handleEvent("mousePressed");
	print(round(camera.mouseX) + ", SCENE_H -", round(SCENE_H - camera.mouseY));
	// return false;
}

// function mouseReleased() {
//   return false;
// }

// function mouseClicked() {
//   return false;
// }

function kee() {
	setUsingGamepad(false);
	switch (key) {
	case "w":
	case "W":
	case "a":
	case "A":
	case "s":
	case "S":
	case "d":
	case "D":
	case "i":
	case "I":
	case "j":
	case "J":
	case "k":
	case "K":
	case "l":
	case "L":
	case " ":
		return false;
	}
	switch (keyCode) {
	case LEFT_ARROW:
	case RIGHT_ARROW:
	case UP_ARROW:
	case DOWN_ARROW:
	case SHIFT:
		return false;
	}
}

function keyPressed() {
	return kee();
}

function keyReleased() {
	objPlayer.vecInputMovement.x = 0;
	objPlayer.vecInputMovement.y = 0;
	return kee();
}

function keyTyped() {
	return kee();
}

function setUsingGamepad(bool) {
	if (usingGamepad != bool) {
		usingGamepad = bool;
		print("Using gamepad: " + bool);
		objPlayer.gamePadSwordArea();
	}
}

function warnUser(text) {
	let h1 = createElement(
		"h1",
		text
	);
	h1.style("color", "#FF0000");
	h1.style("font-family", "Helvetica, sans-serif");
	h1.style("text-align", "center");
}

function setupLevel(bkgrImg) {
	//DONE?: Improve this further. The game gets laggy the more often the level restarts
	removeElements();
	allSprites.removeSprites();
	allSprites.clear();
	objPlayer = new Player();
	grpBackgroundTiles = new Group();
	for (let i = -bkgrImg.width; i < SCENE_W + bkgrImg.width+2; i += bkgrImg.width - 1) {
		for (let j = -bkgrImg.height; j < SCENE_H + bkgrImg.height+2; j += bkgrImg.height - 1) {
			let space = createSprite(i, j);
			space.addImage(bkgrImg);
			grpBackgroundTiles.add(space);
		}
	}

	grpObstaclesSolid = new Group();
	grpObstaclesDashthrough = new Group();
	powerups = new Powerups();
	enemies = new Enemies();
}

function restartLevel() {
	if(currentLevel >= 1) sfxStart.play();
	if(currentLevel == 1) {
		SCENE_H = 6000;
		setupLevel(imgSand);
		SCENE_MANAGER.showScene(sLevel1);
	}
	if(currentLevel == 2) {
		SCENE_H = 9500;
		setupLevel(imgRedRock);
		SCENE_MANAGER.showScene(sLevel2);
	}
	if(currentLevel == 3) {
		SCENE_H = 6100;
		setupLevel(imgMossySand);
		SCENE_MANAGER.showScene(sLevel3);
	}
	if(currentLevel == 4) {
		SCENE_H = 1000;
		setupLevel(imgSpace);
		SCENE_MANAGER.showScene(sLevel4);
	}
	strScore = totalEnemies - livingEnemies + "/" + totalEnemies + " Enemies killed\n";
	strScore += "Time: " + millisToMinutesAndSeconds(millis() - millisAtStartLevel);
	millisAtStartLevel = millis();
	millisAtShowScore = millis();
}

function createTree(x, y, scale) {
	let tree = createSprite(x, y);
	tree.addImage(imgTree);
	tree.scale = scale;
	tree.setCollider("circle", 0, 0, 50);
	if (DEBUG_MODE) tree.debug = true;
	grpObstaclesSolid.add(tree);
}

function createCrate(x, y, scale) {
	let crate = createSprite(x, y);
	crate.addImage(imgCrate);
	crate.scale = scale;
	crate.setCollider("rectangle", 0, 0, imgCrate.width, imgCrate.height)
	if (DEBUG_MODE) crate.debug = true;
	grpObstaclesSolid.add(crate);
}

function millisToMinutesAndSeconds(millis) {
	let minutes = floor(millis / 60000);
	let seconds = floor((millis % 60000) / 1000);
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function sfxBulletHitPlay() {
	switch(int(random(8))) {
		case 0:
			sfxBulletHit1.play();
			break;
		case 1:
			sfxBulletHit2.play();
			break;
		case 2:
			sfxBulletHit3.play();
			break;
		case 3:
			sfxBulletHit4.play();
			break;
		case 4:
			sfxBulletHit5.play();
			break;
		case 5:
			sfxBulletHit6.play();
			break;
		case 6:
			sfxBulletHit7.play();
			break;
		case 7:
			sfxBulletHit8.play();
			break;
	}
}
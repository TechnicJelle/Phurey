//the scene is way bigger than the canvas
let SCENE_W = 1000;
let SCENE_H = 8000;
let DEBUG_MODE = true;
let SCENE_MANAGER;
let GAMEPAD;

//assets
let imgSpace;
let imgPlayer;
let imgEnemyDefault;

//objects
let objPlayer;
let grpBackgroundTiles; //background group
let grpObstacles;
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
let targetFrameRate = 60;

let usingGamepad = false;

function preload() {
	//create a sprite and add the 3 animations

	imgSpace = loadImage("assets/space.png");
	imgPlayer = loadImage("assets/asteroids_ship0001.png");
	imgEnemyDefault = loadImage("assets/flappy_bird.png");
}

function setup() {
	createCanvas(800, 800);
	frameRate(targetFrameRate);

	let h1 = createElement("h1", "Phurey");
	h1.style("color", "#FFFFFF");
	h1.style("font-family", "Helvetica, sans-serif");
	h1.style("text-align", "center");
	let p = createP("Phurey is a challenging top-down slasher/shooter");
	p.style("color", "#FFFFFF");
	p.style("font-family", "Helvetica, sans-serif");
	p.style("text-align", "center");

	vecLeftStick = createVector(0, 0);

	GAMEPAD = new Gamepad();
	GAMEPAD.bind(Gamepad.Event.CONNECTED, function (device) {
	// a new GAMEPAD connected
	print("connected");
	usingGamepad = true;
	if (!SCENE_MANAGER.isCurrent(sMainMenu)) {
		gamepadConnectedAttempts++;
		if (gamepadConnectedAttempts == 10) {
		let h1 = createElement(
			"h1",
			"Your browser doesn't work well with gamepads. Use mouse and keyboard,<br/>or use Firefox to be able to use your gamepad after all."
		);
		h1.style("color", "#FF0000");
		h1.style("font-family", "Helvetica, sans-serif");
		h1.style("text-align", "center");
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
	createP(
		"Your browser does not support gamepads, please get the latest Firefox"
	);
	}

	objPlayer = new Player();
	grpBackgroundTiles = new Group();
	for (let i = -imgSpace.width; i < SCENE_W + imgSpace.width+2; i += imgSpace.width - 1) {
		for (let j = -imgSpace.height; j < SCENE_H + imgSpace.height+2; j += imgSpace.height - 1) {
			let space = createSprite(i, j);
			space.addImage(imgSpace);
			grpBackgroundTiles.add(space);
		}
	}

	grpObstacles = new Group();
	enemies = new Enemies();

	SCENE_MANAGER = new SceneManager();
	SCENE_MANAGER.addScene(sMainMenu);
	SCENE_MANAGER.addScene(sLevel1);

	SCENE_MANAGER.showNextScene();
}

function draw() {
	SCENE_MANAGER.draw();

	//I can turn on and off the camera at any point to restore
	//the normal drawing coordinates, the frame will be drawn at
	//the absolute 0,0
	camera.off();
	//hud here
	fill(255);
	if (frameCount % 60 === 0) {
		if (frameRate() > 61) targetFrameRate--;
		if (frameRate() < 59) targetFrameRate++;
		frameRate(targetFrameRate);
	}
	text(int(frameRate()) + "/" + targetFrameRate, 10, 10);
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
	objPlayer.camShake(5);
	SCENE_MANAGER.handleEvent("mousePressed");
	// return false;
}

// function mouseReleased() {
//   return false;
// }

// function mouseClicked() {
//   return false;
// }

function kee() {
	usingGamepad = false;
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
	objPlayer.vecInput.x = 0;
	objPlayer.vecInput.y = 0;
	return kee();
}

function keyTyped() {
	return kee();
}

class sMainMenu {
	constructor() {
		// enter() will be executed each time the SceneManager switches
		// to this animation
		// Note: Animation1() doesn't have setup() or draw()
		this.enter = function () { };

		this.draw = function () {
			background(0);
			textAlign(CENTER);

			fill(255);
			text("Click to begin the game", width / 2, height / 2);
		};

		this.mousePressed = function () {
			if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
				SCENE_MANAGER.showNextScene();
				currentLevel = 1;
				millisAtStartGame = millis();
				millisAtStartLevel = millis();
				removeElements();
			}
		};
	}
}

class sMainMenu {
	constructor() {
		// enter() will be executed each time the SceneManager switches
		// to this animation
		// Note: Animation1() doesn't have setup() or draw()
		this.enter = function () { };

		this.draw = function () {
			background(0);
			textAlign(CENTER, CENTER);

			fill(255);
			textSize(32);
			text("Click to begin the game", width / 2, height / 2);

			textAlign(RIGHT, BOTTOM);
			textSize(16);
			text("Background Music:\n" +
				"Vindsvept - One Step too Far\n" +
				"https://creativecommons.org/licenses/by/4.0/", width-12, height-12);
		};

		this.mousePressed = function () {
			if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
				SCENE_MANAGER.showNextScene();
				currentLevel = 1;
				millisAtStartGame = millis();
				millisAtStartLevel = millis();
				removeElements();
				sfxStart.play();
				bgmOneStep.play();
			}
		};
	}
}

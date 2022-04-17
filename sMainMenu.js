class sMainMenu {
	constructor() {
		// enter() will be executed each time the SceneManager switches
		// to this animation
		// Note: Animation1() doesn't have setup() or draw()
		this.enter = function () { };

		this.draw = function () {
			background(0);
			textAlign(CENTER, CENTER);

			push();
			translate(0, 100);
			fill(255);
			textSize(64);
			text("Phurey", width / 2, 100);
			textSize(42);
			text("The Wild West Ninja", width / 2, 160);

			textSize(24);
			text("A bunch of bandits are on the loose!\n" +
				"Defeat them and bring justice back to the West!", width / 2, 300);

			pop();

			textSize(32);
			text("Click to begin the game", width / 2, height - 200);

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

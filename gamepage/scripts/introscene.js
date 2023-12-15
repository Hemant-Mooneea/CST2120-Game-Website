// Define the IntroScene class that extends Phaser.Scene
class IntroScene extends Phaser.Scene {
    constructor() 
    {
        super({ key: "intro" }); // Set the scene key to "intro"
    }

    // Preload function to load any necessary assets 
    preload() 
    {
        // No assets to preload
    }

    // Create function to set up the introduction scene
    create() 
    {
        // Display text instructions for the game and color-coded asteroid types
        this.add.text(450, 100, "Shoot down the grey asteroids!", { font: '110px Game Over', fill: '#fff' });
        this.add.text(500, 300, "Be careful of the red ones", { font: '110px Game Over', fill: '#fff' });
        this.add.text(450, 500, "The yellow one gives more points", { font: '110px Game Over', fill: '#fff' });

        // Display color-coded text labels for asteroid types
        this.add.text(759.5, 100, "grey", { font: '110px Game Over', fill: '#838383' });
        this.add.text(847.5, 300, "red", { font: '110px Game Over', fill: '#ff0000' });
        this.add.text(530, 500, "yellow", { font: '110px Game Over', fill: '#ffff00' });

        // Check for the Enter key press to start the game
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    // Update function that runs continuously to check for key presses
    update() 
    {
        // If the Enter key is pressed, start the "game" scene
        if (this.keyEnter.isDown) {
            this.scene.start("game");
        }
    }
}

// Export the IntroScene class as the default export
export default IntroScene;

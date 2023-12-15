// Define the DifficultyScene class that extends Phaser.Scene
class DifficultyScene extends Phaser.Scene 
{
    constructor() 
    {
        super({ key: "difficulty" });
    }

    // Preload assets for the scene
    preload()
    {
        // Load images and audio needed for the scene
        this.load.image("difficulty_image", "assets/graphics/difficulty_type.png");
        this.load.image("background_difficulty", "assets/graphics/asteroids_background.jpg");
        this.load.audio("menu_selection", "assets/audio/menu_selection.mp3");
    }

    // Create the scene
    create() 
    {
        // Add background images and set styles for text
        this.background = this.add.image(760, 360, "background_difficulty");
        this.background.setDepth(-2);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        this.difficulty_text_style = { font: "120px Game Over", fill: "#fff" };
        this.add.text(500, -35, "CHOOSE A DIFFICULTY", this.difficulty_text_style);
        this.difficulty_type_text = this.add.text(665, 575, "NORMAL", this.difficulty_text_style);

        // Initialize scene elements and variables
        this.selection_sfx = this.sound.add("menu_selection", { loop: false, volume: 0.5 });
        this.difficulty_counter = 2;
        this.selection_rect = this.add.rectangle(755, 345, 175, 175);
        this.selection_rect.setStrokeStyle(10, 0xffffff);
        this.minX = 300;
        this.maxX = 1200;
        this.difficulty_image = this.add.image(770, 350, "difficulty_image")
        this.difficulty_image.setScale(0.75);
        this.upper_black_rect = this.add.rectangle(800,0,1600,200,0x000000);
        this.upper_black_rect.setDepth(-1);
        this.bottom_black_rect = this.add.rectangle(800,700,1600,200,0x000000);
        this.bottom_black_rect.setDepth(-1);    

        // Add keyboard input
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyBackspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    // Update function to handle changes in the scene
    update() 
    {
        // Check for Enter key to start the game with selected difficulty
        if (this.keyEnter.isDown) 
        {
            sessionStorage.setItem("difficultyCounter", this.difficulty_counter);
            this.scene.start("game");
        }

        // Check for Backspace key to return to default scene
        if (this.keyBackspace.isDown) 
        {
            this.scene.start("default");
        }

        // Handle key presses to change difficulty selection
        if (Phaser.Input.Keyboard.JustDown(this.keyD)) 
        {
            this.handleDifficultyChange(1);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyA)) 
        {
            this.handleDifficultyChange(-1);
        }

        // Update text to display selected difficulty
        this.difficultyTextChanger();
    }

    // Function to handle changes in difficulty selection
    handleDifficultyChange(value) 
    {
        this.selection_sfx.play();
        if (value === 1 && this.selection_rect.x + 280 <= this.maxX) {
            this.selection_rect.x += 280;
            this.difficulty_counter += 1;
        } else if (value === -1 && this.selection_rect.x - 280 >= this.minX) {
            this.selection_rect.x -= 280;
            this.difficulty_counter -= 1;
        }
    }

    // Function to update text based on difficulty selection
    difficultyTextChanger() 
    {
        switch (this.difficulty_counter) {
            case 1:
                this.difficulty_type_text.setText("EASY");
                break;
            case 2:
                this.difficulty_type_text.setText("NORMAL");
                break;
            case 3:
                this.difficulty_type_text.setText("HARD");
                break;
        }
    }
}

// Export the DifficultyScene class as the default export
export default DifficultyScene;

// Define the MenuScene class that extends Phaser.Scene
class MenuScene extends Phaser.Scene 
{
    constructor() 
    {
        super({ key: "default" }); // Set the scene key to "default"
    }

    // Preload assets for the scene
    preload() 
    {
        // Load audio needed for the scene
        this.load.audio("menu_selection", "assets/audio/menu_selection.mp3");
        // Load background image
        this.load.image("background_menu", "assets/graphics/space_background.avif");
    }

    // Create the scene
    create() 
    {
        // Add background image and set styles for text
        this.game_title_text = this.add.text(470, -75, "Galaxy Fighters", { font: "200px Game Over", fill: "#fff" });
        this.background = this.add.image(760, 360, "background_menu");
        this.background.setDepth(-1);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        // Initialize scene elements and variables
        this.selection_sfx = this.sound.add("menu_selection", { loop: false, volume: 0.5 });
        this.options_text_style = { font: '150px Game Over', fill: '#fff' };
        this.play_text = this.add.text(690, 200, "PLAY", this.options_text_style);
        this.shop_text = this.add.text(690, 400, "SHOP", this.options_text_style);
        this.play_selected = true;
        this.selection_rect = this.add.rectangle(767, 305, 200, 100);
        this.selection_rect.setStrokeStyle(10, 0xffffff); // Border style

        // Add keyboard input
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    // Update function to handle changes in the scene
    update()
    {
        // Check for Enter key to start the game or shop based on selection
        if (this.keyEnter.isDown) {
            if (this.play_selected) {
                this.scene.start("difficulty");
            } else {
                this.scene.start("shop");
            }
        }

        // Handle key presses to change menu selection
        if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.selection_sfx.play();
            if (this.optionSelector("W")) {
                this.selection_rect.y -= 200;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            this.selection_sfx.play();
            if (this.optionSelector("S")) {
                this.selection_rect.y += 200;
            }
        }
    }

    // Function to handle changes in menu selection
    optionSelector(key_pressed) 
    {
        if (key_pressed == "S" && this.play_selected) 
        {
            this.play_selected = false;
            return true;
        }
        if (key_pressed == "W" && !this.play_selected) {
            this.play_selected = true;
            return true;
        } else {
            return false;
        }
    }
}

// Export the MenuScene class as the default export
export default MenuScene;

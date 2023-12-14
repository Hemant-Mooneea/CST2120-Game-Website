class DifficultyScene extends Phaser.Scene
{   
    constructor()
    {
        super({key: "difficulty"});
    }
  
    preload() 
    { 
        this.load.image("difficulty_image", "assets/graphics/difficulty_type.png")
        this.load.image("background_difficulty", "assets/graphics/asteroids_background.jpg");
    }   
    create()
    {   
        this.difficulty_image = this.add.image(770, 350, "difficulty_image")
        this.difficulty_image.setScale(0.75);
        this.upper_black_rect = this.add.rectangle(800,0,1600,200,0x000000);
        this.upper_black_rect.setDepth(-1);
        this.bottom_black_rect = this.add.rectangle(800,700,1600,200,0x000000);
        this.bottom_black_rect.setDepth(-1);
        this.difficulty_text_style = {font: "120px Game Over", fill: "#fff"};
        this.add.text(500,-35,"CHOOSE A DIFFICULTY", this.difficulty_text_style);
        this.difficulty_type_text = this.add.text(665, 575,"NORMAL", this.difficulty_text_style);
        
        this.background = this.add.image(760, 360,"background_difficulty");
        this.background.setDepth(-2);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        this.difficulty_counter = 2;
        this.selection_rect = this.add.rectangle(755, 345, 175, 175);   
        this.selection_rect.setStrokeStyle(10, 0xffffff);
        this.minX = 300;
        this.maxX = 1200;

        this.keyAJustPressed = false;
        this.keyDJustPressed = false;

        this.input.keyboard.on('keydown', (event) => 
        {
            if (event.code === 'KeyA') 
            {
                this.keyAJustPressed = true;
            } 
            else if (event.code === 'KeyD') 
            {
                this.keyDJustPressed = true;
            }
            
        });

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyBackspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }
    update() 
    {   
        if (this.keyEnter.isDown)
        {
            sessionStorage.setItem("difficultyCounter", this.difficulty_counter)
            this.scene.start("game");  
        }
        if (this.keyBackspace.isDown)
        {
            this.scene.start("default");
        }
        if (this.keyDJustPressed) 
        {
            if(this.selection_rect.x + 280 <= this.maxX)
            {
                this.selection_rect.x +=280;
                this.keyDJustPressed = false; 
                this.difficulty_counter += 1;
            }
        }
        if (this.keyAJustPressed)
        {

            if(this.selection_rect.x - 280 >= this.minX)
            {
                this.selection_rect.x -=280;
                this.keyAJustPressed = false; 
                this.difficulty_counter -= 1;
            }
        }
        this.difficultyTextChanger();
    }
    difficultyTextChanger()
    {
        switch (this.difficulty_counter)
        {
            case 1:
                this.difficulty_type_text.destroy();
                this.difficulty_type_text = this.add.text(695, 575,"EASY", this.difficulty_text_style);
                break;
            case 2:
                this.difficulty_type_text.destroy();
                this.difficulty_type_text = this.add.text(665, 575,"NORMAL", this.difficulty_text_style);
                break;
            case 3:
                this.difficulty_type_text.setText();
                this.difficulty_type_text = this.add.text(695, 575,"HARD", this.difficulty_text_style);
                break;
        }
    }
}
export default DifficultyScene;
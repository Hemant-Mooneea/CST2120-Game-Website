class menuScene extends Phaser.Scene
{   
    constructor()
    {
        super({key: "default"});
    }
  
    preload() 
    { 
        this.load.image("background_menu", "assets/graphics/space_background.avif");
        this.load.image("difficulty_type", "assets/graphics/difficulty_type.png");
        this.game_title_text = this.add.text(480,-10,"Galaxy Fighters", {font: "200px Game Over", fill: "#fff"});
        this.game_difficulty_text = this.add.text(580, 500, 'Choose a Difficulty', { font: '110px Game Over', fill: '#fff' });
        this.difficulty_counter = 1;
        this.difficulty_type_style = { font: '80px Game Over', fill: '#fff' };
        this.difficulty_type_text = this.add.text(725,425,"Easy" , this.difficulty_type_style);
    }   
    create()
    {
        this.background = this.add.image(760, 360,"background_menu");
        this.background.setDepth(-1);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        
        this.difficulty_type_img = this.add.image(770,350,"difficulty_type");
        this.difficulty_type_img.setScale(0.5);

        // Track whether the keys were just pressed
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

        this.selection_rect = this.add.rectangle(572, 348, 100, 100);
        this.selection_rect.setStrokeStyle(5, 0xffffff); // Border style

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }
    update() 
    {

        if (this.keyEnter.isDown)
        {
            sessionStorage.setItem('difficultyCounter', this.difficulty_counter);
            this.scene.start("gameover");  
        }
        if (this.keyAJustPressed) 
        {
            if(this.difficultySelector("A"))
            {
                this.selection_rect.x -=187;
                this.keyAJustPressed = false; 
            }
        }

        if (this.keyDJustPressed)
        {
            if(this.difficultySelector("D"))
            {
                this.selection_rect.x +=187;
                this.keyDJustPressed = false; 
            }
        }
    }

    difficultySelector(button_pressed)
    {
        if(button_pressed == "A" && this.difficulty_counter !=1)
        {
            this.difficulty_counter -= 1;
        }
        else if (button_pressed == "D" && this.difficulty_counter !=3)
        {
            this.difficulty_counter += 1;
        }
        else
        {
            return false;
        }
        this.difficulty_type_text.destroy();
        switch(this.difficulty_counter)
        {
            case 1:
                this.difficulty_type_text = this.add.text(725,425,"Easy",this.difficulty_type_style);
                break;
            case 2:
                this.difficulty_type_text = this.add.text(715,425,"Normal",this.difficulty_type_style);
                break;
            case 3:
                this.difficulty_type_text = this.add.text(725,425,"Hard",this.difficulty_type_style);
                break;
        }   
        return true;
    }
}
export default menuScene;
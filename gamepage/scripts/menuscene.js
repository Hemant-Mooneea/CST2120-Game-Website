class MenuScene extends Phaser.Scene
{   
    constructor()
    {
        super({key: "default"});
    }
  
    preload() 
    { 
        this.load.image("background_menu", "assets/graphics/space_background.avif");
    }   
    create()
    {   
        this.game_title_text = this.add.text(470,-75,"Galaxy Fighters", {font: "200px Game Over", fill: "#fff"});
        this.background = this.add.image(760, 360,"background_menu");
        this.background.setDepth(-1);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;
        
        this.options_text_style = { font: '150px Game Over', fill: '#fff' };
        this.play_text = this.add.text(690, 200, "PLAY", this.options_text_style);
        this.shop_text = this.add.text(690, 400, "SHOP", this.options_text_style);

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

        this.selection_rect = this.add.rectangle(768, 305, 200, 100);   
        this.selection_rect.setStrokeStyle(10, 0xffffff); // Border style

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }
    update() 
    {

        if (this.keyEnter.isDown)
        {
            sessionStorage.setItem('difficultyCounter', this.difficulty_counter);
            this.scene.start("intro");  
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
}
export default MenuScene;
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

        this.play_selected = true;
        this.keyWJustPressed = false;
        this.keySJustPressed = false;

        this.input.keyboard.on('keydown', (event) => 
        {
            if (event.code === 'KeyW') 
            {
                this.keyWJustPressed = true;
            } 
            else if (event.code === 'KeyS') 
            {
                this.keySJustPressed = true;
            }
            
        });

        this.selection_rect = this.add.rectangle(768, 305, 200, 100);   
        this.selection_rect.setStrokeStyle(10, 0xffffff); // Border style

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }
    update() 
    {

        if (this.keyEnter.isDown)
        {   
            if (this.play_selected)
            {
                this.scene.start("intro");  
            }
            else
            {
                this.scene.start("shop");  
            }
        }
        
        if (this.keyWJustPressed) 
        {
            if(this.optionSelector("W"))
            {   
                this.selection_rect.y -=200;
                this.keyWJustPressed = false; 
            }
        }
        if (this.keySJustPressed)
        {
            if(this.optionSelector("S"))
            {
                this.selection_rect.y +=200;
                this.keySJustPressed = false; 
            }
        }
    }
    optionSelector(key_pressed)
    {      
        if(key_pressed == "S" && this.play_selected)
        {   
            this.play_selected = false;
            return true;
        }
        if(key_pressed == "W" && !this.play_selected)
        {   
            this.play_selected = true;
            return true;
        }
        else
        {
            return false;
        }
    }
}
export default MenuScene;
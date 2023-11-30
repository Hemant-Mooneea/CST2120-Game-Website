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


class introScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "intro"});
    }
    preload()
    {   
        let line_1="The year is 2077, Aliens are planning to invade planet Earth";
        let line_2="You are Humanity's last hope";
        let line_3="Are you ready?"
        this.add.text(170, 110, line_1, { font: '110px Game Over', fill: '#fff' });
        this.add.text(480, 300, line_2, { font: '110px Game Over', fill: '#fff' });
        this.add.text(610, 500, line_3, { font: '110px Game Over', fill: '#fff' });

    }
    create()
    {
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update()
    {
        if (this.keyEnter.isDown)
        {
            this.scene.start("level_one");  
        }
    }
}

class levelOne extends Phaser.Scene
{
    constructor()
    {
        super({key: "level_one"});
    }
    preload()
    {
        this.load.image("playerShipImage", "assets/graphics/pixel_ship_blue.png");
        
        
    
    }
    create()
    {
        this.player = new playerShip(this, 750, 650, "playerShipImage");
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update()
    {
        if(this.keyA.isDown)
        {
            this.player.moveLeft();
        }
        else if(this.keyD.isDown)
        {
            this.player.moveRight();
        }
        else
        {
            this.player.resetX();
        }

        if(this.keyW.isDown)
        {
            this.player.moveUp();
        }
        else if(this.keyS.isDown)
        {
            this.player.moveDown(); 
        }
        else
        {
            this.player.resetY();
        }
    }

}

class playerShip extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture) 
    {  
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setData("speed", 350);
        this.setScale(0.75);
    }

    moveUp() 
    {
        this.body.velocity.y = -this.getData('speed');
    }
    moveDown() 
    {
        this.body.velocity.y = this.getData('speed');
    }
    moveLeft() 
    {
        this.body.velocity.x = -this.getData('speed');
    }
    moveRight()
    {
        this.body.velocity.x = this.getData('speed');
    }
    resetX()
    {
        this.body.velocity.x = 0;
    }
    resetY()
    {
        this.body.velocity.y = 0;
    }
}

window.onload = function()
{
    // Get the div element
    const divElement = document.getElementById('game'); 
    // Get the height and width of the div
    const SCREEN_HEIGHT = divElement.clientHeight;
    const SCREEN_WIDTH = divElement.clientWidth;
    new Phaser.Game({
        width: SCREEN_WIDTH, // Width of the game in pixels
        height: SCREEN_HEIGHT, // Height of the game in pixels
        backgroundColor: 'black',
        scene: [menuScene, introScene, levelOne], // The name of the scene we created
        physics: { default: 'arcade' }, // The physics engine to use
        parent: 'game', // Create the game inside the <div id="game"> 
    });
}   
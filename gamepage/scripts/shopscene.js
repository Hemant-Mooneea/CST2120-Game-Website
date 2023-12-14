class ShopScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "shop"});
    }
    preload()
    {   
        this.load.image("background_shop", "assets/graphics/space_hangar.jpg");
        this.load.image("gold_powerup","assets/graphics/gold.png" );
        this.load.image("cloak_powerup","assets/graphics/cloak.png" );
        this.load.image("shoot_powerup","assets/graphics/shoot.webp" );
    }
    create()
    {   
        this.add.text(500, -25, "WELCOME TO THE SHOP", { font: '110px Game Over', fill: '#fff' });
        this.money_text = this.add.text(35, -5,"MONEY:" + 0, { font: '80px Game Over', fill: '#fff' });
        
        this.cost_text_style = { font: '70px Game Over', fill: '#fff' };
        this.description_text_style = { font: '65px Game Over', fill: '#fff' };

        this.cost_text = this.add.text(728, 580, 1000 , this.cost_text_style);
        this.desc_text = this.add.text(420, 620, "Allows the user to dodge asteroids for a certain amount of time", this.description_text_style)

        
        this.upper_black_rect = this.add.rectangle(800,0,1600,200,0x000000);
        this.upper_black_rect.setDepth(-1);
        this.bottom_black_rect = this.add.rectangle(800,700,1600,200,0x000000);
        this.bottom_black_rect.setDepth(-1);
        this.gold_powerup=this.add.image(322, 350,"gold_powerup");
        this.gold_powerup.setScale(0.4);
        this.cloak_powerup = this.add.image(760, 350,"cloak_powerup");
        this.cloak_powerup.setScale(0.4);
        this.shoot_powerup = this.add.image(1200, 350, "shoot_powerup");
        this.shoot_powerup.setScale(0.4);

        this.minX = 300; // Define minimum X value
        this.maxX = 1200; // Define maximum X value
        this.power_position = 2;

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

        this.selection_rect = this.add.rectangle(760, 350, 175, 175);   
        this.selection_rect.setStrokeStyle(10, 0xffffff); // Border style

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyBackspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.background = this.add.image(770, 360,"background_shop");
        this.background.setDepth(-2);
    }
    update()
    {
        this.powerDescription();
        if (this.keyEnter.isDown)
        {
            this.scene.start("game");  
        }
        if (this.keyBackspace.isDown)
        {
            this.scene.start("default");
        }
        if (this.keyDJustPressed) 
        {
            if(this.selection_rect.x + 440 <= this.maxX)
            {
                this.selection_rect.x +=440;
                this.keyDJustPressed = false; 
                this.power_position += 1;
            }
        }
        if (this.keyAJustPressed)
        {

            if(this.selection_rect.x - 440 >= this.minX)
            {
                this.selection_rect.x -=440;
                this.keyAJustPressed = false; 
                this.power_position -= 1;
            }
        }
    }
    powerDescription()
    {
        switch(this.power_position)
        {
            case 1:
                this.cost_text.setText(3000);
                this.desc_text.setText("Increases odds of yellow asteroids for a certain amount of time");
                break;
            case 2:
                this.cost_text.setText(1000);
                this.desc_text.setText("Allows the ship to dodge asteroids for a certain amount of time");
                break;
            case 3:
                console.log("??");
                this.cost_text.setText(2000);
                this.desc_text.setText("Allows the ship to shoot faster for a certain amount of time");
                break;
        }
    }
    obtainUserInfo()
    {
        const storedUserData = localStorage.getItem('user_data');

        // Check if any user data is stored
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
    
            // Find the user with the provided username
            const foundUser = parsedUserData.find(user => user.username === username);
    
            if (!foundUser) {
                document.getElementById("username_error").innerHTML = "Username does not exist";
                return false;
            }
    
            // Username exists, check the password
            if (foundUser.password !== password) {
                document.getElementById("password_error").innerHTML = "Incorrect password";
                return false;
            }
    
            // Username and password match, set sessionStorage
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
    
            return true;
        }
    }
}
export default ShopScene;
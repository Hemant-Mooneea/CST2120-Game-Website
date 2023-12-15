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
        this.load.audio("menu_selection", "assets/audio/menu_selection.mp3");
        this.load.audio("item_buy", "assets/audio/item_buy.mp3");
        this.load.audio("power_up_equipped", "assets/audio/power_up_equipped.mp3");
        this.load.audio("cannot_buy", "assets/audio/cannot_buy.mp3");
    }
    create()
    {   
        this.obtainUserInfo();

        this.power_up_equipped = this.sound.add("power_up_equipped", { loop: false, volume: 0.25 });
        this.selection_sfx = this.sound.add("menu_selection", { loop: false, volume: 0.5 });
        this.item_buy_sfx = this.sound.add("item_buy", { loop: false, volume: 0.5 });
        this.cannot_buy_sfx = this.sound.add("cannot_buy", { loop: false, volume: 1.0 });
 
        this.add.text(500, -25, "WELCOME TO THE SHOP", { font: '110px Game Over', fill: '#fff' });
        this.money_text = this.add.text(35, -5,"MONEY:" + this.money, { font: '80px Game Over', fill: '#fff' });
        
        this.cost_text_style = { font: '70px Game Over', fill: '#fff' };
        this.description_text_style = { font: '65px Game Over', fill: '#fff' };

        this.cost_text = this.add.text(728, 580, 2500, this.cost_text_style);
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
        if (Phaser.Input.Keyboard.JustDown(this.keyEnter))
        {   
            this.purchaseHandling();  
        }
        if (this.keyBackspace.isDown)
        {
            this.scene.start("default");    
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyD)) 
        {   
            this.selection_sfx.play();
            if(this.selection_rect.x + 440 <= this.maxX)
            {
                this.selection_rect.x +=440;
                this.power_position += 1;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyA))
        {
            this.selection_sfx.play();
            if(this.selection_rect.x - 440 >= this.minX)
            {
                this.selection_rect.x -=440;
                this.power_position -= 1;
            }
        }
    }
    purchaseHandling()
    {   
        this.keyEnterJustPressed = false;
        switch(this.power_position)
        {   
            case 1:
                if (this.money >= 5000 && this.power1 == false)
                {
                    this.item_buy_sfx.play();
                    this.updateUserInfo(5000, 1);
                }
                else if (this.power1 == true)
                {
                    this.power_up_equipped.play();
                    sessionStorage.setItem("powerup", 1);
                }
                else
                {
                    this.cannot_buy_sfx.play();
                }
                break;
            case 2:
                if (this.money >= 2500 && this.power2 == false)
                {
                    this.item_buy_sfx.play();
                    this.updateUserInfo(2500, 2);
                }
                else if (this.power2 == true)
                {   
                    this.power_up_equipped.play();
                    sessionStorage.setItem("powerup", 2);
                }
                else
                {
                    this.cannot_buy_sfx.play();
                }
                break;
            case 3:
                if (this.money >= 3000 && this.power3 == false)
                {
                    this.item_buy_sfx.play();
                    this.updateUserInfo(3000, 3);
                }
                else if (this.power3 == true)
                {
                    this.power_up_equipped.play();
                    sessionStorage.setItem("powerup", 3);
                }
                else
                {
                    this.cannot_buy_sfx.play();
                }
                break;
        }
        this.obtainUserInfo();
    }
    powerDescription()
    {
        switch(this.power_position)
        {
            case 1:
                this.cost_text.setText(5000);
                this.desc_text.setText("Increases odds of yellow asteroids for a certain amount of time");
                break;
            case 2:
                this.cost_text.setText(2500);
                this.desc_text.setText("Allows the ship to dodge asteroids for a certain amount of time");
                break;
            case 3:
                this.cost_text.setText(3000);
                this.desc_text.setText("Allows the ship to shoot faster for a certain amount of time");
                break;
        }
    }
    updateUserInfo(amount, powerup)
    {
        const storedUserData = localStorage.getItem('user_data');
        // Check if any user data is stored
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            const currentUser = parsedUserData.find(user => user.username === sessionStorage.getItem('username'));
    
            if (currentUser) 
            {
                currentUser.money -= amount;
                this.money = currentUser.money;
                switch(powerup)
                {
                    case 1:
                        currentUser.upgrade_1 = true;   
                        sessionStorage.setItem("powerup", 1);
                        break;
                    case 2:
                        currentUser.upgrade_2 = true;
                        sessionStorage.setItem("powerup", 2);
                        break;  
                    case 3:
                        currentUser.upgrade_3 = true;
                        sessionStorage.setItem("powerup", 3);
                        break;
                }
                this.money_text.setText("MONEY:" + this.money);
                localStorage.setItem('user_data', JSON.stringify(parsedUserData));
            }
        }
    }
    obtainUserInfo()
    {
        const storedUserData = localStorage.getItem('user_data');

        // Check if any user data is stored
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
    
            const currentUser = parsedUserData.find(user => user.username === sessionStorage.getItem('username'));
    
            if (currentUser) 
            {
                this.money = currentUser.money;
                this.power1 = currentUser.upgrade_1;
                this.power2 = currentUser.upgrade_2;
                this.power3 = currentUser.upgrade_3;
            }
        }
    }
}
export default ShopScene;
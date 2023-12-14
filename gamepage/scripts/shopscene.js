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
        this.add.text(500, 0, "WELCOME TO THE SHOP", { font: '110px Game Over', fill: '#000000' });
        this.money_text = this.add.text(35, 15,"MONEY:" + 0 , { font: '80px Game Over', fill: '#fff' });
        //RETRIEVE MONEY FROM USER JSON
        this.gold_powerup=this.add.image(350, 300,"gold_powerup");
        this.gold_powerup.setScale(0.4);
        this.cloak_powerup = this.add.image(760, 300,"cloak_powerup");
        this.cloak_powerup.setScale(0.4);
        this.shoot_powerup = this.add.image(1200, 300, "shoot_powerup");
        this.shoot_powerup.setScale(0.4);

        this.background = this.add.image(770, 360,"background_shop");
        this.background.setDepth(-1);



        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update()
    {
        if (this.keyEnter.isDown)
        {
            this.scene.start("game");  
        }
    }
}
export default ShopScene;
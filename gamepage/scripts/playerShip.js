class PlayerShip extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture) 
    {  
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.75);
        this.minX = 300; // Define your minimum X value
        this.maxX = 1200; // Define your maximum X value
    }
    moveLeft() 
    {   
        if (this.body.x - 175 >= this.minX)    
        {
            this.body.x -= 165;
        }   
    }
    moveRight()
    {
        if (this.body.x + 175 <= this.maxX)
        {
           this.body.x += 165;
        }
    }

}
export default PlayerShip;
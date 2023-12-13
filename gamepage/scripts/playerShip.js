class PlayerShip extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture) 
    {  
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setData("speed", 10000);
        this.setScale(0.75);
        this.position = 3;
    }
    moveLeft() 
    {   
        if (this.position != 1)    
        {
            this.body.velocity.x = -this.getData('speed');
            this.position -= 1;
        }   
    }
    moveRight()
    {
        if (this.position != 5)
        {
            this.body.velocity.x = this.getData('speed');
            this.position += 1;
        }
    }
    resetX()
    {
        this.body.velocity.x = 0;
    }
}
export default PlayerShip;
class Planets extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setData('speed', 25); 
        this.setTexture(texture);
        this.setScale(1);
       
    }
    spawn(x, y, scale) 
    {   
        this.setScale(scale);
        this.setPosition(x, y);
        this.body.setVelocity(0, this.getData('speed')); // Set the vertical velocity to make it move downward
    }
    
}
export default Planets

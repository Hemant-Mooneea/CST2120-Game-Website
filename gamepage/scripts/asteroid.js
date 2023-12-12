class Asteroid extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setData('speed', 100); 
        this.setTexture(texture);
       
    }
    spawn(x, y)
    {
        this.setPosition(x, y);
        this.body.setVelocity(0, this.getData('speed'));
    }
}
export default Asteroid
// 415, 575, 750, 915, 1075
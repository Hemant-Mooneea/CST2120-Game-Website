class Asteroid extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setTexture(texture);
       
    }
    spawn(x, y, speed)
    {
        this.setPosition(x, y);
        this.body.setVelocity(0, speed);
    }
}
class RedAsteroid extends Asteroid 
{
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture);
    }

}
class YellowAsteroid extends Asteroid
{
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture);
    }
}
export { Asteroid, RedAsteroid, YellowAsteroid};
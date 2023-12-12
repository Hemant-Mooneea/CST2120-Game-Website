class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setData("speed", 800); // Set the bullet's speed
        this.setTexture(texture); // Set the texture for the bullet
    }

    fire(x, y) {
        this.setPosition(x , y - 50); // Set the initial position of the bullet
        this.body.velocity.y = -this.getData('speed'); // Set the bullet's upward velocity
    }

    // You can add additional functionalities for bullet movement or collision handling here
}

export default Bullet;
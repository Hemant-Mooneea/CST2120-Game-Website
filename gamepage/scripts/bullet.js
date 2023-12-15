// Class representing a bullet in the game
class Bullet extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture); // Calls the constructor of the parent class (Phaser.GameObjects.Sprite)
        this.scene = scene; // Reference to the scene where the bullet exists
        this.scene.add.existing(this); // Adds the bullet to the scene
        this.scene.physics.add.existing(this); // Adds the bullet to the physics system of the scene
        this.setData("speed", 800); // Set the bullet's speed using Phaser's data manager
        this.setTexture(texture); // Sets the texture (image) of the bullet
    }

    // Method to fire the bullet from a given position
    fire(x, y) 
    {
        this.setPosition(x, y - 50); // Sets the initial position of the bullet slightly above the given position
        this.body.velocity.y = -this.getData('speed'); // Sets the bullet's upward velocity based on its speed data
    }
}

// Exporting the Bullet class to make it available for importing in other modules
export default Bullet;

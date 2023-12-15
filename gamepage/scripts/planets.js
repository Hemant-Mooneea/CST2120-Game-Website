// Define the Planets class that extends Phaser.GameObjects.Sprite
class Planets extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture) 
    {
        // Call the parent constructor
        super(scene, x, y, texture);

        // Store a reference to the scene and add this object to the scene
        this.scene = scene;
        this.scene.add.existing(this);

        // Add physics to the object and set the speed data
        this.scene.physics.add.existing(this);
        this.setData('speed', 25);

        // Set the texture and scale of the planet
        this.setTexture(texture);
        this.setScale(1);
    }

    // Function to spawn the planet at a specific position with a given scale
    spawn(x, y, scale) 
    {
        // Set the scale and position of the planet
        this.setScale(scale);
        this.setPosition(x, y);

        // Set the vertical velocity to make the planet move downward
        this.body.setVelocity(0, this.getData('speed'));
    }
}

// Export the Planets class as the default export
export default Planets;

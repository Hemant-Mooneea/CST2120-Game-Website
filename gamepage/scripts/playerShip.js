// Define the PlayerShip class that extends Phaser.GameObjects.Sprite
class PlayerShip extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture) 
    {
        // Call the parent constructor
        super(scene, x, y, texture);

        // Store a reference to the scene and add this object to the scene
        this.scene = scene;
        this.scene.add.existing(this);

        // Add physics to the object and set its scale and immovability
        this.scene.physics.add.existing(this);
        this.setScale(0.75);
        this.body.setImmovable(true);

        // Define minimum and maximum X values for movement
        this.minX = 300; // Minimum X value
        this.maxX = 1200; // Maximum X value
    }

    // Function to move the player's ship left
    moveLeft() 
    {
        // Check if moving left won't go beyond the minimum X value
        if (this.body.x - 175 >= this.minX) {
            // Move the ship to the left
            this.body.x -= 165;
        }
    }

    // Function to move the player's ship right
    moveRight() 
    {
        // Check if moving right won't go beyond the maximum X value
        if (this.body.x + 175 <= this.maxX) {
            // Move the ship to the right
            this.body.x += 165;
        }
    }
}

// Export the PlayerShip class as the default export
export default PlayerShip;

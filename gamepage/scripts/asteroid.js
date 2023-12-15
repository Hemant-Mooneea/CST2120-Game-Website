// Parent class representing an asteroid in the game
class Asteroid extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture); // Calls the constructor of the parent class (Phaser.GameObjects.Sprite)
        this.scene = scene; // Reference to the scene where the asteroid exists
        this.scene.add.existing(this); // Adds the asteroid to the scene
        this.scene.physics.add.existing(this); // Adds the asteroid to the physics system of the scene
        this.setTexture(texture); // Sets the texture (image) of the asteroid
    }

    // Method to spawn an asteroid at a given position with a specific speed
    spawn(x, y, speed) 
    {
        this.setPosition(x, y); // Sets the position of the asteroid
        this.body.setVelocity(0, speed); // Sets the velocity of the asteroid
    }
}

// Child class representing a red asteroid, inheriting from the Asteroid class
class RedAsteroid extends Asteroid 
{
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture); // Calls the constructor of the parent class (Asteroid)
    }
}

// Child class representing a yellow asteroid, inheriting from the Asteroid class
class YellowAsteroid extends Asteroid 
{
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture); // Calls the constructor of the parent class (Asteroid)
    }
}

// Exports the classes to make them available for importing in other modules
export { Asteroid, RedAsteroid, YellowAsteroid };

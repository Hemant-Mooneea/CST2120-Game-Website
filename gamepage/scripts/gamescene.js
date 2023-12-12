import playerShip from './playership.js';
import Bullet from './bullet.js';
import Asteroid from './asteroid.js'
class gameScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "game_scene"});
    }
    preload()
    {
        this.load.image("playerShipImage", "assets/graphics/pixel_ship_blue.png");
        this.load.image("playerBulletImage", "assets/graphics/pixel_laser_blue.png");
        this.load.image("asteroidImage", "assets/graphics/asteroid_grey.png");

    }
    create()
    {
        this.player = new playerShip(this, 750, 650, "playerShipImage");
        this.bullets = this.physics.add.group({ classType: Bullet, defaultKey: 'playerBulletImage' });
        this.asteroids = this.physics.add.group({ classType: Asteroid, defaultKey: 'asteroidImage' });
        this.physics.add.collider(this.bullets, this.asteroids, this.bulletAsteroidCollision, null, this);
        
        this.fireDelay = 500; // The delay in milliseconds
        this.canFire = true;
        this.fireTimer = this.time.addEvent
        ({
            delay: this.fireDelay,
            callback: this.enableFire, // Enable firing after the delay
            callbackScope: this,
            loop: false // Execute only once
        });

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        
        this.keyAJustPressed = false;
        this.keyDJustPressed = false;
        this.input.keyboard.on('keydown', (event) => 
        {
            if (event.code === 'KeyA') 
            {
                this.keyAJustPressed = true;
            } 
            else if (event.code === 'KeyD') 
            {
                this.keyDJustPressed = true;
            }
            
        });


    }

    update()
    {
        this.handlePlayerMovement();
        this.spawnAsteroid();

    }
    handlePlayerMovement()
    {
        if(this.keyAJustPressed)
        {   
            this.player.moveLeft();
            this.keyAJustPressed = false;
        }
        else if(this.keyDJustPressed)
        {
            this.player.moveRight();    
            this.keyDJustPressed = false;
        }
        else
        {
            this.player.resetX();
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyJ)) 
        {
            this.fireBullet();
        }
    }
    fireBullet() 
    {
        if (this.canFire) {
            const bullet = this.bullets.get(this.player.x, this.player.y - 50);
            if (bullet) {
                bullet.fire(this.player.x, this.player.y);
                this.canFire = false;
            }
        }
    }
    
    enableFire() {
        this.canFire = true;
        this.fireTimer = this.time.addEvent({
            delay: this.fireDelay,
            callback: this.enableFire,
            callbackScope: this,
            loop: false
        });
    }
    
    spawnAsteroid() 
    {
        let lane = Math.floor(Math.random() * 5) + 1;
        let chance = Math.floor(Math.random() * 50);
        let x = 0;
        let y = 50;
        console.log(chance);
        if (chance == 0)
        {
            switch(lane)
            {
                case 1:
                    x = 415;
                    break;
                case 2:
                    x = 575;
                    break;
                case 3:
                    x = 750;
                    break;
                case 4:
                    x = 915;
                    break;
                case 5:
                    x = 1075;
                    break;
            }
            const asteroid = this.asteroids.get(x, y);
            if (asteroid) {
                asteroid.spawn(x, y);
            }
        }

    }

    bulletAsteroidCollision(bullet, asteroid)
    {
        bullet.destroy(); 
        asteroid.destroy(); 
    }
    

}
export default gameScene;
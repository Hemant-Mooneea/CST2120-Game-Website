import playerShip from './playership.js';
import Bullet from './bullet.js';
import { Asteroid, RedAsteroid, YellowAsteroid } from './Asteroid.js';
import Planets from './planets.js';

// Define the GameScene class that extends Phaser.Scene
class GameScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "game"}); // Set the scene key to "intro"
    }
    // Preloads game assets
    preload()
    {
        // Selects a random sprite for the ship(red, blue, yellow or green)
        let random_ship = Math.floor(Math.random() * 4) + 1;
        switch (random_ship)
        {
            case 1:
                this.load.image("playerShipImage", "assets/graphics/pixel_ship_red.png");
                this.load.image("playerBulletImage", "assets/graphics/pixel_laser_red.png");
                break;
            case 2:
                this.load.image("playerShipImage", "assets/graphics/pixel_ship_blue.png");
                this.load.image("playerBulletImage", "assets/graphics/pixel_laser_blue.png");
                break;
            case 3:
                this.load.image("playerShipImage", "assets/graphics/pixel_ship_yellow.png");
                this.load.image("playerBulletImage", "assets/graphics/pixel_laser_yellow.png");
                break;
            case 4: 
                this.load.image("playerShipImage", "assets/graphics/pixel_ship_green.png");
                this.load.image("playerBulletImage", "assets/graphics/pixel_laser_green.png");
                break;
        }
        this.load.image("background_image", "assets/graphics/stars_bg.png")
        this.load.image("asteroidImage", "assets/graphics/asteroid_grey.png");
        this.load.image("redasteroidImage", "assets/graphics/asteroid_red.png")
        this.load.image("yellowasteroidImage","assets/graphics/asteroid_yellow.png")
        this.load.image("planet1_image","assets/graphics/planet1.png");
        this.load.image("planet2_image","assets/graphics/planet2.png");
        this.load.image("planet3_image","assets/graphics/planet3.png");
        this.load.image("planet4_image","assets/graphics/planet4.png");
        this.load.image("planet5_image","assets/graphics/planet5.png");
        this.load.image("planet6_image","assets/graphics/planet6.png");
        // Loading game audio
        this.load.audio("game_ost", "assets/audio/game_ost.mp3");
        this.load.audio("game_over", "assets/audio/game_over.mp3");
        this.load.audio("power_up_ready", "assets/audio/power_up_ready.mp3");
        this.load.audio("power_up_activate", "assets/audio/power_up_activate.mp3");
        this.load.audio("ship_shoot", "assets/audio/ship_shoot.mp3");
        
    }
    create()
    {   
        //Obtaining Difficulty from session storage
        const storedDifficulty = sessionStorage.getItem('difficultyCounter');
        const difficultyCounter = parseInt(storedDifficulty);
        
        // Initialising Music
        this.background_music = this.sound.add("game_ost", { loop: true, volume: 0.5 });
        this.defeat_music = this.sound.add("game_over", { loop: false, volume: 0.5 });
        this.power_up_sound = this.sound.add("power_up_ready", { loop: false, volume: 0.1 });
        this.bullet_sound = this.sound.add("ship_shoot", { loop: false, volume: 0.1 });
        this.power_up_activate =this.sound.add("power_up_activate", { loop: false, volume: 0.2});

        this.background_music.play();

        // Setting up the score multiplier
        this.score_multiplier = difficultyCounter;     
        this.player_powerUp = parseInt(sessionStorage.getItem("powerup"));
                
        this.setupScene();
        this.setupTimers();
        this.setupControls();

        // Adding collisions to sprites
        this.bullets = this.physics.add.group({ classType: Bullet, defaultKey: 'playerBulletImage'});
        this.asteroids = this.physics.add.group({ classType: Asteroid, defaultKey: 'asteroidImage'});
        this.red_asteroids = this.physics.add.group({ classType: RedAsteroid, defaultKey: 'redasteroidImage'});
        this.yellow_asteroids = this.physics.add.group({ classType: YellowAsteroid, defaultKey: 'yellowasteroidImage'});

        this.physics.add.collider(this.bullets, this.asteroids, this.bulletAsteroidCollision, null, this);
        this.physics.add.collider(this.player, this.asteroids, this.shipAsteroidCollision, null, this);
        this.physics.add.collider(this.bullets, this.red_asteroids, this.bulletredAsteroidCollision, null, this);
        this.physics.add.collider(this.player, this.red_asteroids, this.shipredAsteroidCollision, null, this);
        this.physics.add.collider(this.bullets, this.yellow_asteroids, this.bulletyellowAsteroidCollision, null, this);
        this.physics.add.collider(this.player, this.yellow_asteroids, this.shipyellowAsteroidCollision, null, this);

        // Initialising Asteroid properties
        this.asteroid_speed = 100;  
        this.asteroid_probability = 50;
        this.yellow_powerup = 0;

        // Intialising Game Time
        this.totalTime = 0;
        this.startTime = this.time.now; 

        // Setting up flags
        this.canFire = true;
        this.canPowerup = true;
        this.player_immunity = false;
        this.player_alive = true;
    }
    update()
    {   
        // If the player is player
        if (this.player_alive)
        {
            this.handlePlayerMovement();
            this.timer();
        }
        this.spawnAsteroid();
    }
    //Loads up essential parts of the game
    setupScene()
    {
        this.score_text_style = { font: '80px Game Over', fill: '#fff' };
        this.player_score = 0
        this.score_text = this.add.text(35, -20,"SCORE:" + this.player_score , this.score_text_style);
        this.timer_text = this.add.text(1385, -15, "00:00", this.score_text_style);
        if (this.player_powerUp != 0)
        {
            this.powerup_text = this.add.text(600, -15, "POWER UP READY", this.score_text_style);
        }
        this.background = this.add.image(760, 360,"background_image");
        this.background.setDepth(-1);
        this.player = new playerShip(this, 750, 650, "playerShipImage");
        this.player.setDepth(1);
    }
    // Initialises all the in game timers.
    setupTimers()
    {
        this.fireDelay = 500; // The delay in millisecond
        this.planetDelay = 40000;
        this.difficultyDelay = 40000 - (10000 * this.score_multiplier); 
        this.fireTimer = this.time.addEvent
        ({
            delay: this.fireDelay,
            callback: this.enableFire,
            callbackScope: this,
            loop: false
        });

        this.planetTimer = this.time.addEvent
        ({
            delay: this.planetDelay,
            callback: this.spawnPlanets,
            callbackScope: this,
            loop: true
           
        });
        this.difficultyDelay = this.time.addEvent
        ({
            delay: this.difficultyDelay,
            callback: this.increaseDifficulty,
            callbackScope:this,
            loop: true
        })
    }
    // Initialises all the keyboard inputs
    setupControls()
    {
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    }
    
    timer()
    {
        this.totalTime = Math.floor((this.time.now - this.startTime) / 1000); // Convert milliseconds to seconds
        const minutes = Math.floor(this.totalTime / 60).toString().padStart(2, '0'); // Get minutes with leading zero
        const seconds = (this.totalTime % 60).toString().padStart(2, '0'); // Get seconds with leading zero
        this.timer_text.setText(minutes + ":" + seconds);
    }
    // Method to handle player movement
    handlePlayerMovement()
    {
        if(Phaser.Input.Keyboard.JustDown(this.keyA))
        {   
            this.player.moveLeft();
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyD))
        {
            this.player.moveRight();    
        }   
        if(Phaser.Input.Keyboard.JustDown(this.keyK) && this.canPowerup && this.player_powerUp != 0)
        {   
            this.canPowerup = false;
            this.power_up_activate.play();
            this.handlePowerups();
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyJ)) 
        {
            this.fireBullet();
        }
    }
    // Method called when user presses the powerup button
    handlePowerups()
    {

        switch (this.player_powerUp)
        {
            case 1:
                this.powerUpDelay = 60000;
                this.handlePowerOne();
                break;
            case 2:
                this.powerUpDelay = 15000;
                this.handlePowerTwo();
                break;
            case 3:
                this.powerUpDelay = 25000;
                this.handlePowerThree();
                break;
        }
        this.powerup_text.setText("");
        // A timer setup to a cooldown for the powerups
        this.powerUpTimer = this.time.addEvent
        ({
            delay: this.powerUpDelay,
            callback: this.enablePowerUpCallback,
            callbackScope: this,
            loop: false
        });
    }   
    // Method to enable use of powerups
    enablePowerUpCallback()
    {   
        this.canPowerup = true;
        this.powerup_text.setText("POWER UP READY");
        this.power_up_sound.play();

    }
    // Method which handles the first powerup
    handlePowerOne()
    {   
 
        this.yellow_powerup = 750;
        this.yellow_delay = 7500;
        this.poweronetimer = this.time.addEvent
        ({
            delay: this.yellow_delay,
            callback: this.disablepowerups,
            callbackScope:this,
            loop: false
        });
    }
    // Method which handles the second powerup
    handlePowerTwo()
    {
        this.player_immunity = true;
        this.player.alpha = 0.5;
        this.player_immunity_delay = 5000;
        this.powertwotimer = this.time.addEvent
        ({
            delay: this.player_immunity_delay,
            callback: this.disablepowerups,
            callbackScope:this,
            loop: false
        });

    }
    // Method which handles the third powerup
    handlePowerThree()
    {   
        this.fireDelay = 0;
        this.fast_fire_delay = 10000;
        this.powerthreetimer = this.time.addEvent
        ({
            delay: this.fast_fire_delay,
            callback: this.disablepowerups,
            callbackScope:this,
            loop: false
        });

    }
    // Method to disable a powerup after its duration is over
    disablepowerups()
    {   
        this.yellow_powerup = 0;
        this.player_immunity = false;
        this.player.alpha = 1;
        this.fireDelay = 500;
        
    }
    // Method used to fire a bullet from the ship
    fireBullet() 
    {
        if (this.canFire) 
        {
            this.bullet_sound.play();
            const bullet = this.bullets.get(this.player.x, this.player.y - 50);
            if (bullet) {
                bullet.fire(this.player.x, this.player.y);
                this.canFire = false;
            }
        }
    }
    // Method allows the user to shoot and creates a delay between shots
    enableFire()
    {
        this.canFire = true;
        this.fireTimer = this.time.addEvent
        ({
            delay: this.fireDelay,
            callback: this.enableFire,
            callbackScope: this,
            loop: false
        });
    }
    // Method which spawns asteroids using random numbers
    spawnAsteroid() 
    {

        let normal_chance = Math.floor(Math.random() * this.asteroid_probability);
        let red_chance = Math.floor(Math.random() * (this.asteroid_probability + 600));
        let yellow_chance = Math.floor(Math.random() * (this.asteroid_probability + 750 - this.yellow_powerup));

        let x = 0;
        let y = 0;
        // x and y are the coordinates at which the asteroids spawn
        if (normal_chance == 0)
        {
            x = this.selectLane();
            const asteroid = this.asteroids.get(x, y);
            if (asteroid) 
            {
                asteroid.spawn(x, y, this.asteroid_speed);
            }
        }
        if (red_chance == 0)
        {
            x = this.selectLane();
            const red_asteroid = this.red_asteroids.get(x, y);
            if (red_asteroid) 
            {
                red_asteroid.spawn(x, y, this.asteroid_speed);
                red_asteroid.body.setImmovable(true);
            }
        }
        if (yellow_chance == 0)
        {
            x = this.selectLane();
            const yellow_asteroid = this.yellow_asteroids.get(x, y);
            if (yellow_asteroid) 
            {
                yellow_asteroid.spawn(x, y, this.asteroid_speed);
            }
        }
    }
    // Method to choose which lane asteroids spawn in
    selectLane()
    {
        let lane = Math.floor(Math.random() * 5) + 1;
        switch(lane)
        {
            case 1:
                return(415);
            case 2:
                return(575);
            case 3:
                return(750);
            case 4:
                return(915);
            case 5:
                return(1075);
        }
    }
    // Method which spawns the background planets
    spawnPlanets() 
    {
        let x = Math.floor(Math.random() * 1400) + 100;
        let y = -50; 
        // x and y are the coordinates at which the planets spawn
        let scale = Math.floor(Math.random() * 3) + 1; // Randomize planet size
        let planet_type = Math.floor(Math.random() * 6) + 1;
        let planet_img = "";
        switch(planet_type)
        {
            case 1:
                planet_img = "planet1_image";
                break;
            case 2:
                planet_img = "planet2_image";
                break;
            case 3:
                planet_img = "planet3_image";
                break;
            case 4:
                planet_img = "planet4_image";
                break;
            case 5:
                planet_img = "planet5_image";
                break;
            case 6:
                planet_img = "planet6_image";
                break;
        }
        const planet = new Planets(this, x, y, planet_img);     
        planet.setDepth(0);
        planet.spawn(x, y, scale);

    }
    // Method to increase the game's difficulty by increasing the asteroids' speed
    increaseDifficulty()
    {   
        this.asteroid_speed += 50;
        if (this.asteroid_speed % 50 == 0 && this.asteroid_probability > 8)
        {
            this.asteroid_probability -= 2;
        }
    }
    // Methods to handle collisions between different sprites
    bulletAsteroidCollision(bullet, asteroid)
    {
        bullet.destroy(); 
        asteroid.destroy();

        this.player_score += (1 * this.score_multiplier);
        this.score_text.setText("SCORE:" + this.player_score);
    }
    shipAsteroidCollision(player, asteroid) 
    {   
        if (!this.player_immunity)
        {
            this.gameOver(player);
        }
        asteroid.destroy();
    }

    bulletredAsteroidCollision(bullet,red_asteroid)
    {
        bullet.destroy();
    }
    shipredAsteroidCollision(player, red_asteroid)
    {
        if (!this.player_immunity)
        {
            this.gameOver(player);
        }
        red_asteroid.destroy();
    }
    bulletyellowAsteroidCollision(bullet, yellow_asteroid)
    {
        bullet.destroy(); 
        yellow_asteroid.destroy();

        this.player_score += (25 * this.score_multiplier);
        this.score_text.setText("SCORE:" + this.player_score);
    }
    shipyellowAsteroidCollision(player, yellow_asteroid)
    {
        if (!this.player_immunity)
        {
            this.gameOver(player);
        }
        yellow_asteroid.destroy();
    }
    // Method called when a collision between an asteroid and the ship occurs
    gameOver(player)
    {   
        this.background_music.stop();
        this.defeat_music.play();   
        this.player_alive = false;
        sessionStorage.setItem('playerScore', this.player_score);
        sessionStorage.setItem('gameTime', this.timer_text.text);

        this.scene.start("gameover");  
        player.destroy(); 
    }

}
// Export the GameScene class as the default export
export default GameScene
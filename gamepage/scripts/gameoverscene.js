class GameoverScene extends Phaser.Scene 
{
    constructor() 
    {
        super({ key: "gameover" });
    }

    preload() 
    {
        // Load necessary assets and retrieve score and time data from sessionStorage
        const currentScore = parseInt(sessionStorage.getItem('playerScore'));
        const storedTime = sessionStorage.getItem('gameTime');
        this.load.image("background_gameover", "assets/graphics/background_menu.jpg");
        this.playerScore = currentScore; // Store the current player score
        this.gameTime = storedTime; // Store the game time
    }

    create()
    {
        // Set up elements for the game over screen
        this.current_date = this.obtainDate(); // Obtain the current date
        this.background = this.add.image(760, 360, "background_gameover"); // Add game over background
        this.background.setDepth(-1);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        // Display text elements for game over screen
        const line_1 = "YOU DIED!"
        this.add.text(650, 0, line_1, { font: '110px Game Over', fill: '#fff' });
        this.border_rect = this.add.rectangle(760, 400, 500, 500);
        this.border_rect.setStrokeStyle(15, 0xffffff);
        this.black_rect = this.add.rectangle(760, 400, 500, 500, 0x000000);
        this.info_text_style = { font: '100px Game Over', fill: '#fff' };
        this.data_text_style = { font: '90px Game Over', fill: '#fff' };
        this.score_text = this.add.text(550, 230, "SCORE:", this.info_text_style);
        this.score_number = this.add.text(875, 240, this.playerScore, this.data_text_style);
        this.timer_text = this.add.text(550, 330, "TIME:", this.info_text_style);
        this.timer_number = this.add.text(860, 340, this.gameTime, this.data_text_style);
        this.date_text = this.add.text(550, 430, "DATE:", this.info_text_style);
        this.date_number = this.add.text(835, 440, this.current_date, this.data_text_style);

        // Handle user information and key events
        this.handleUserInfo();
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    obtainDate()
    {
        // Get the current date and format it
        const today = new Date();
        const year = today.getFullYear().toString().slice(-2); // Get the year 
        const month = today.getMonth() + 1; // Get the month (0-11, add 1 for human-readable month)
        const day = today.getDate(); // Get the day of the month 
        const today_date = day + "/" + month + "/" + year;
        return today_date;
    }

    update() 
    {
        // Listen for the Enter key to restart the game
        if (this.keyEnter.isDown) {
            this.scene.start("default");
        }
    }

    handleUserInfo() 
    {
        // Retrieve user data from localStorage and update it with the latest score information
        const storedUserData = localStorage.getItem('user_data');
        const score = sessionStorage.getItem('playerScore');

        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            const currentUser = parsedUserData.find(user => user.username === sessionStorage.getItem('username'));

            if (currentUser) {
                // Add the current score to the user's money and update the best score if necessary
                currentUser.money = parseInt(currentUser.money) + parseInt(score);

                if (this.playerScore > currentUser.best_score || currentUser.best_score == 0) {
                    this.add.text(630, 130, "NEW RECORD!", this.info_text_style);
                    currentUser.best_score = this.playerScore;
                    currentUser.date = this.current_date;
                }

                // Save the updated user data to localStorage
                localStorage.setItem('user_data', JSON.stringify(parsedUserData));
            }
        }
    }
}
// Export the GameOverScene class as the default export
export default GameoverScene;

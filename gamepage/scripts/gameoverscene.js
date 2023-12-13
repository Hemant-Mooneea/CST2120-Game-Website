class GameoverScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "gameover"});
    }
    preload()
    {   
        const storedScore = sessionStorage.getItem('playerScore');
        const storedTime = sessionStorage.getItem('gameTime');
        this.playerScore = storedScore || "0"; // Default score if not found
        this.gameTime = storedTime || "00:00"; // Default time if not found
    }
    create()
    {

        const line_1="YOU DIED!"
        this.add.text(650, 0, line_1, { font: '110px Game Over', fill: '#fff' });
        
        this.border_rect = this.add.rectangle(760, 400, 500, 500);
        this.border_rect.setStrokeStyle(10, 0xffffff);

        this.info_text_style = { font: '100px Game Over', fill: '#fff' };
        this.data_text_style = { font: '90px Game Over', fill: '#fff' };
        
        this.score_text = this.add.text(550, 230,"SCORE:" , this.info_text_style);
        this.score_number = this.add.text(875, 240, this.playerScore, this.data_text_style);
        
        this.timer_text = this.add.text(550, 330,"TIME:" , this.info_text_style);
        this.timer_number = this.add.text(860, 340, this.gameTime, this.data_text_style);

        this.date_text = this.add.text(550, 430,"DATE:" , this.info_text_style);
        this.date_number = this.add.text(835, 440, this.obtainDate(), this.data_text_style);
        
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    obtainDate()
    {
        const today = new Date();
        const year = today.getFullYear().toString().slice(-2);// Get the year 
        const month = today.getMonth() + 1; // Get the month (0-11, add 1 for human-readable month)
        const day = today.getDate(); // Get the day of the month 
        const today_date = day + "/" + month + "/" + year;
        return today_date
    }
    update()
    {
        if (this.keyEnter.isDown)
        {
            this.scene.start("default");  
        }
    }
}
export default GameoverScene;
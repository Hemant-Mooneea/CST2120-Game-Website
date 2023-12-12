class introScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "intro"});
    }
    preload()
    {   
        let line_1="The year is 2077, Aliens are planning to invade planet Earth";
        let line_2="You are Humanity's last hope";
        let line_3="Are you ready?"
        this.add.text(170, 110, line_1, { font: '110px Game Over', fill: '#fff' });
        this.add.text(480, 300, line_2, { font: '110px Game Over', fill: '#fff' });
        this.add.text(610, 500, line_3, { font: '110px Game Over', fill: '#fff' });

    }
    create()
    {
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update()
    {
        if (this.keyEnter.isDown)
        {
            this.scene.start("game_scene");  
        }
    }
}
export default introScene;
class IntroScene extends Phaser.Scene
{
    constructor()
    {
        super({key: "intro"});
    }
    preload()
    {   

        this.add.text(450, 100, "Shoot down the grey asteroids!", { font: '110px Game Over', fill: '#fff' });
        this.add.text(500, 300, "Be careful of the red ones", { font: '110px Game Over', fill: '#fff' });
        this.add.text(450, 500, "The yellow one gives more points", { font: '110px Game Over', fill: '#fff' });
        this.add.text(759.5, 100, "grey", { font: '110px Game Over', fill: '#838383' });
        this.add.text(847.5, 300, "red", { font: '110px Game Over', fill: '#ff0000' });
        this.add.text(530, 500, "yellow", { font: '110px Game Over', fill: '#ffff00' });
    }
    create()
    {
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update()
    {
        if (this.keyEnter.isDown)
        {
            this.scene.start("game");  
        }
    }
}
export default IntroScene;
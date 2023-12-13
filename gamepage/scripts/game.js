import MenuScene from './menuscene.js';
import IntroScene from './introscene.js';
import GameScene from './gamescene.js';
import GameoverScene from './gameoverscene.js'
window.onload = function()
{
    // Get the div element
    const divElement = document.getElementById('game'); 
    // Get the height and width of the div
    const SCREEN_HEIGHT = divElement.clientHeight;
    const SCREEN_WIDTH = divElement.clientWidth;
    new Phaser.Game({
        width: SCREEN_WIDTH, // Width of the game in pixels
        height: SCREEN_HEIGHT, // Height of the game in pixels
        backgroundColor: 'black',
        scene: [MenuScene, IntroScene, GameScene, GameoverScene], // The scenes of the game
        physics: { default: 'arcade' }, // The physics engine to use
        parent: 'game', // Create the game inside the <div id="game"> 
    });
}   

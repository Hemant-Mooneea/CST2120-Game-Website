import menuScene from './menuscene.js';
import introScene from './introscene.js';
import gameScene from './gamescene.js';
import gameoverScene from './gameoverscene.js'
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
        scene: [menuScene, introScene, gameScene, gameoverScene], // The scenes of the game
        physics: { default: 'arcade' }, // The physics engine to use
        parent: 'game', // Create the game inside the <div id="game"> 
    });
}   

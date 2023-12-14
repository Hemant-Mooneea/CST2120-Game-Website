import MenuScene from './menuscene.js';
import IntroScene from './introscene.js';
import GameScene from './gamescene.js';
import GameoverScene from './gameoverscene.js'
import ShopScene from './shopscene.js'
window.onload = function()
{
    // Get the div element
    const divElement = document.getElementById('game'); 
    // Get the height and width of the div
    const SCREEN_HEIGHT = divElement.clientHeight;
    const SCREEN_WIDTH = divElement.clientWidth;
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) 
    {
         // Create a message to prompt the user to log in
        const loginPrompt = document.createElement('p');
        loginPrompt.textContent = 'Log in to play the game';
        loginPrompt.style.color = 'white';
        loginPrompt.style.fontSize = '50px';
        loginPrompt.style.textAlign = 'center';
        loginPrompt.style.position = 'absolute';
        loginPrompt.style.top = '45%';
        loginPrompt.style.transform = 'translateY(-50%)'; 
        loginPrompt.style.width = '100%';
        divElement.appendChild(loginPrompt);
        }
    else
    {
    new Phaser.Game({
        width: SCREEN_WIDTH, // Width of the game in pixels
        height: SCREEN_HEIGHT, // Height of the game in pixels
        backgroundColor: 'black',
        scene: [MenuScene, IntroScene, GameScene, GameoverScene,ShopScene], // The scenes of the game
        physics: { default: 'arcade' }, // The physics engine to use
        parent: 'game', // Create the game inside the <div id="game"> 
    });
}
}   

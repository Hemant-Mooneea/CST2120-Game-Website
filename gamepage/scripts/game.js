import MenuScene from './menuscene.js';
import IntroScene from './introscene.js';
import DifficultyScene from './difficultyscene.js';
import GameScene from './gamescene.js';
import GameoverScene from './gameoverscene.js';
import ShopScene from './shopscene.js';

// Execute code when the window loads
window.onload = function()
{
    // Get the div element where the game will be created
    const divElement = document.getElementById('game'); 

    // Get the height and width of the div for the game dimensions
    const SCREEN_HEIGHT = divElement.clientHeight;
    const SCREEN_WIDTH = divElement.clientWidth;

    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (!isLoggedIn) 
    {
        // If not logged in, create a message to prompt the user to log in
        const loginPrompt = document.createElement('p');
        loginPrompt.textContent = 'Log in to play the game';
        loginPrompt.style.color = 'white';
        loginPrompt.style.fontSize = '50px';
        loginPrompt.style.textAlign = 'center';
        loginPrompt.style.position = 'absolute';
        loginPrompt.style.top = '45%';
        loginPrompt.style.transform = 'translateY(-50%)'; 
        loginPrompt.style.width = '100%';
        divElement.appendChild(loginPrompt); // Append the login prompt message to the div
    } else 
    {
        // If logged in, create a new Phaser game
        new Phaser.Game({
            width: SCREEN_WIDTH, // Width of the game in pixels
            height: SCREEN_HEIGHT, // Height of the game in pixels
            backgroundColor: 'black',
            scene: [MenuScene, IntroScene, GameScene, GameoverScene, ShopScene, DifficultyScene], // The scenes of the game
            physics: { default: 'arcade' }, // The physics engine to use
            parent: 'game', // Create the game inside the <div id="game"> 
        });
    }
}

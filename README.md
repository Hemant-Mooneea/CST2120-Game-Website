# Galaxy Fighters

## Project Description

This project was created for a web development coursework.

The project's requirement was to create a website and a video game.

The website allows users to create an account, login and play the game and obtain a score which is displayed in a leaderboard.

[Video Demonstration](https://drive.google.com/file/d/1kIbmAG_F4YDEm_9CaYV4AyNf6w99fqM5/view?usp=drive_link)

## Tech Used
- HTML
- CSS
- Javascript
- Phaser Game Engine
- Local and Session storage to store user data

## Game Description

Galaxy Figthers is a space shooter game where the player navigates through space by shooting asteroids by using the A and D keys.

Each time the player shoots an asteroid, using the J key, their score increases.

However colliding with an asteroid causes them to lose the game.

There are 3 different types of asteroids
- Red Asteroid
  
  They cannot be destroyed
  
- Gold Asteroid
  
  They give more points
  
- Grey Asteroid
  
  They give a normal amount of points

There is also a shop system where players can spend the money they earned(their scored at the end of each playthrough) to obtain power ups).

By pressing the K key, the user is able to use their powerup

## Login/Signup

•	Does not allow special characters.

•	Does not allow usernames longer than 20 characters.

•	Does not allow duplicate usernames.

Password:

•	Password needs to be at least 8 characters long.

•	Password needs to contain at least an uppercase.

•	Password needs to contain at least a lowercase.

•	Password needs to contain at least a number.

•	Password needs to contain at least a special character.

Date:

•	Does not allow the date to be empty.

•	Does not allow players under 13.

Gender:

•	A gender must be picked.

All the above are implemented using JavaScript and mostly regex.

Data on the player are stored in the JSON format in an array of objects.

  


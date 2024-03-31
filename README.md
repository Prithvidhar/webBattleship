# Ships of Battle (a Battleship clone)

## Description

A web-based video game based on the popular strategy game BattleShip. The game consists of two players with multiple battleships of variable size. The players are given a grid-like coordinate system and given turns to fire at a random coordinate in hopes to hit their opponent. After the all the enemy battleships have been destroyed the remaining player is victorious.

## Installation and usage

Run the command below to install the necessary packages from nodejs
```
npm install
```
Next, run the `gameserver.js` JavaScript file to run the Socket.io server on https://localhost:3000. 
```
node gameserver.js
```
While the server is running launch the website using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension from VS code. You should see an empty webpage with a welcome message 'Welcome to BattleShip!'
Open another tab in your website to the same url that the Live Server extension launched. You should then see two grids in both tabs where you and a friend can play a game!

![Image of webpage](https://github.com/Prithvidhar/webBattleship/blob/2playerOnline/ScreenshotofaGame.png)

I recommend having your browser console window open while you play to receive the appropriate messaging on your actions.

## Challenges and experiences

One of the major challenges in this project was synchronizing the actions of two players live in a video game setting. I ended up having the server block requests from a connected client till the second one finishes their turn.
This project was meant to get my hands dirty with the NodeJs environment and web socket interactions

## Limitations and future plans

Currently, the game only runs locally and for two players. It also relies on running the gameserver JavaScript file to synchronize and update the UI of the players.
I plan to host the server on an AWS ECS task and implement socket.io rooms to have multiple game rooms for players to join a game.

Feel free to reach out to me on GitHub if you have any questions about the game. Have fun!!!

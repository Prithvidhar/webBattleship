# Ships of Battle (a Battleship clone)

## Description

A web-based video game based on the popular strategy game BattleShip. The game consists of two players with multiple battleships of variable size. The players are given a grid-like coordinate system and given turns to fire at a random coordinate in hopes to hit their opponent. After the all the enemy battleships have been destroyed the remaining player is victorious.

## Installation and usage

Run the command below to install the necessary packages from nodejs
```
npm install
```
Next, launch the website using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension from VS code. You should see two grids with one belonging to you and another to a friend. The ships are randomly placed on the grid with the left grid's ships being visible initially.
When the location on the right grid is selected, you will notified if it was a hit or a miss. The right grid's ships then become visible where the second player and have an attempt to select a location on the left grid. This process repeats till either side's ships have been destroyed.

![Image of webpage](https://github.com/Prithvidhar/webBattleship/blob/master/ScreenshotSinglePlayer.png)

I recommend having your browser console window open while you play to receive the appropriate messaging on your actions.

## Challenges and experiences

One of the major challenges in this project was randomly generating the ships' position while ensuring no overlapping occured. I ended up using a two dimensional array and an 'overlap' flag to check if any ships overlapping when placing them in the array. When the overlap flag was set, a new location for the ship would be selected.

## Limitations and future plans

Currently, the game only runs locally. I hope to run this game on the AWS environent using AWS Amplify or Elastic BeanStalk. I also hope to allow players to place their ships in their own locations.

Feel free to reach out to me on GitHub if you have any questions about the game. Have fun!!!

## Rules of the Game
- The Game randomly displays Green light or Red light at random intervals. Range of random interval is 500ms to 1000ms. So background colour of app changes randomly in-between random interval.
- change color to Green if Math.random returns less than 0.5 and change to Red if Math.random returns greater than 0.5
- When Green light is on player can click Move button and move forward by 10 steps.
- When Red is on and player clicks Move button, player lose the game.
- Player wins the game by reaching 100 steps.

## Milestones
- App background colour should change at random interval between 500ms to 1000ms.
- Progress Bar to display the progress (steps taken) by the player
- Hide Move button when game is over and display Play Again button
    - Display appropriate message 
        - Player Wins: 🏁 You reached the goal! You win!
        - Player Lose: 💀 Caught moving during RED light! Game Over.
- Clicking on Play Again should reset the game
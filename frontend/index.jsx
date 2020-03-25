import GameView from '../lib/game_view.js';
import Game from '../lib/game.js';
import Util from '../lib/util.js';
import Player from '../lib/player.js';

const smallSettings = {
  height: 500,
  width: 500,
  backgroundColor: "#101010",
}

const mediumSettings = {
  height: 1000,
  width: 1000,
  backgroundColor: "#101010",
}

const largeSettings = {
  height: 1080,
  width: 1920,
  backgroundColor: "#101010",
}

const playerColors = [
  '#91EB8F',
  '#D66342',
  '#8ACAF6',
  '#AB77D4',
]

let gameView;

function locationPosition(height, width, placement) {
  let leftBound = 5, upperBound = 5, xPos = 5, yPos = 5;
  let leftBound2 = 5, upperBound2 = 5, xPos2 = 5, yPos2 = 5;
  const spawnSpace = 69;

  const randomDir = Util.getRandomArbitrary(0,2);

  switch (placement) {
    case 0:
      // First Base
      leftBound = 5;
      upperBound = 5;

      // Second Base
      if (randomDir === 0) {
        leftBound2 = leftBound;
        upperBound2 = upperBound + Math.floor(spawnSpace * 1.1);
      } else {
        leftBound2 = leftBound + Math.floor(spawnSpace * 1.1);
        upperBound2 = upperBound;
      }

      break;

    case 1:
      leftBound = width - Math.floor(1.4 * spawnSpace);
      upperBound = 5

      if (randomDir === 0) {
        leftBound2 = leftBound - Math.floor(1.1 * spawnSpace);
        upperBound2 = upperBound;
      } else {
        leftBound2 = leftBound;
        upperBound2 = upperBound + Math.floor(1.1 * spawnSpace); 
      }

      break;

    case 2:
      leftBound = width - Math.floor(1.4 * spawnSpace);
      upperBound = height - Math.floor(1.4 * spawnSpace);

      if (randomDir === 0) {
        leftBound2 = leftBound - Math.floor(1.1 * spawnSpace);
        upperBound2 = upperBound;
      } else {
        leftBound2 = leftBound;
        upperBound2 = upperBound - Math.floor(1.1 * spawnSpace); 
      }

      break;

    case 3:
      leftBound = 5;
      upperBound = height - Math.floor(1.4 * spawnSpace);

      if (randomDir === 0) {
        leftBound2 = leftBound + Math.floor(1.1 * spawnSpace);
        upperBound2 = upperBound;
      } else {
        leftBound2 = leftBound;
        upperBound2 = upperBound - Math.floor(1.1 * spawnSpace); 
      }

      break;
  
    default:
      console.log(height, width, placement, "BROKE");
      break;
  }

  xPos = Util.getRandomArbitrary(leftBound, leftBound + spawnSpace/4);
  yPos = Util.getRandomArbitrary(upperBound, upperBound + spawnSpace/4);
  const firstBase = [xPos, yPos];

  xPos2 = Util.getRandomArbitrary(leftBound2, leftBound2 + spawnSpace/4);
  yPos2 = Util.getRandomArbitrary(upperBound2, upperBound2 + spawnSpace/4);
  const secondBase = [xPos2, yPos2];

  return {
    first: firstBase,
    second: secondBase,
  };
}

function newGame () {
  if (gameView) gameView.game.gameOver = true;

  let selectedSettings;

  switch (document.getElementById('game-setting').value) {
    case "small":
      selectedSettings = smallSettings;
      break;
    case "large":
      selectedSettings = largeSettings;
      break;
    default:
      selectedSettings = mediumSettings;
      break;
  }

  let numPlayers = document.getElementById('game-players').value;

  const startingLocationForPlayers = [];
  while (numPlayers > 0) {
    let randomLocation = Util.getRandomArbitrary(0,4);
    if (!startingLocationForPlayers.includes(randomLocation)) {
      startingLocationForPlayers.push(randomLocation);
      numPlayers -= 1;
    }
  }

  const game = new Game(selectedSettings);
  game.addStars(Util.getRandomArbitrary(69, 420));

  const canvas = document.getElementById('canvas');
  canvas.width = game.settings.width;
  canvas.height = game.settings.height;

  const context = canvas.getContext('2d');

  canvas.addEventListener('click', event => {
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;

    let clickedBase = false;

    game.bases.forEach(base => {
      if (y > base.y && y < base.y + base.width && x > base.x && x < base.x + base.width) {
        console.log('Clicked a Base!', base);
        
        if ( !!game.prevClick ) {
          game.prevClick.selected = false;
          base.selected = false;
          
          if ( game.prevClick === base ) {
            console.log("Same base clicked")
          } else {
            console.log('Two bases connected', [game.prevClick.x, game.prevClick.y], [base.x, base.y]);
            game.swarm(game.prevClick, base);
          }
          
          game.prevClick = undefined;
        } else {
          if ( base.player.humanPlayer ) {
            base.selected = true;
            game.prevClick = base;
          } else {
            console.log('Tried to click a non-player base');
          }
        }
        
        clickedBase = true;
      } else {
        base.selected = false;
      }
    });

    if (!clickedBase) {
      console.log('Did not click a base!');
      game.prevClick = false;
    }
  });

  startingLocationForPlayers.forEach((loc, index) => {
    game.addPlayer({
      playerName: `Player ${index + 1}`,
      humanPlayer: index === 0,
      color: playerColors[index],
      origin: locationPosition(game.settings.height, game.settings.width, loc),
    });
  });


  // game.addPlayer({
  //   playerName: "Player 2",
  //   humanPlayer: false,
  //   color: '#EB7261',
  //   origin: [selectedSettings.width-100,selectedSettings.height-100],
  //   space: 50,
  // })

  gameView = new GameView(game, context).start();
}

document.addEventListener("DOMContentLoaded", () => {
  const newGameButton = document.getElementById('new-game');

  newGameButton.addEventListener('click', event => {
    event.target.textContent = "Restart Game"
    newGame();
  })
});

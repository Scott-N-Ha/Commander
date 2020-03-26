import GameView from '../lib/game_view.js';
import Game from '../lib/game.js';
import Util from '../lib/util.js';

let gameView;
let game;
let computerOnly = false;
let bgMusic = false;
let audio;

const SPAWN_SPACE = 69;

const smallSettings = {
  height: 500,
  width: 500,
  backgroundColor: "#101010",
  neutralBaseCount: 4,
}

const mediumSettings = {
  height: 1000,
  width: 1000,
  backgroundColor: "#101010",
  neutralBaseCount: 9,
}

const largeSettings = {
  height: 1080,
  width: 1920,
  backgroundColor: "#101010",
  neutralBaseCount: 16,
}

const playerColors = [
  '#91EB8F',
  '#D66342',
  '#8ACAF6',
  '#AB77D4',
]

const gameDifficulty = {
  easy: .33,
  medium: .66,
  hard: .88,
}

function locationPosition(height, width, placement) {
  let leftBound = 5,
    upperBound = 5,
    xPos = 5,
    yPos = 5;
  let leftBound2 = 5,
    upperBound2 = 5,
    xPos2 = 5,
    yPos2 = 5;

  const randomDir = Util.getRandomArbitrary(0, 2);

  switch (placement) {
    case 0:
      // First Base
      leftBound = 5;
      upperBound = 5;

      // Second Base
      if (randomDir === 0) {
        leftBound2 = leftBound;
        upperBound2 = upperBound + Math.floor(1.6 * SPAWN_SPACE);
      } else {
        leftBound2 = leftBound + Math.floor(1.6 * SPAWN_SPACE);
        upperBound2 = upperBound;
      }

      break;

    case 1:
      leftBound = width - Math.floor(1.4 * SPAWN_SPACE);
      upperBound = 5

      if (randomDir === 0) {
        leftBound2 = leftBound - Math.floor(1.6 * SPAWN_SPACE);
        upperBound2 = upperBound;
      } else {
        leftBound2 = leftBound;
        upperBound2 = upperBound + Math.floor(1.6 * SPAWN_SPACE);
      }

      break;

    case 2:
      leftBound = width - Math.floor(1.4 * SPAWN_SPACE);
      upperBound = height - Math.floor(1.4 * SPAWN_SPACE);

      if (randomDir === 0) {
        leftBound2 = leftBound - Math.floor(1.6 * SPAWN_SPACE);
        upperBound2 = upperBound;
      } else {
        leftBound2 = leftBound;
        upperBound2 = upperBound - Math.floor(1.6 * SPAWN_SPACE);
      }

      break;

    case 3:
      leftBound = 5;
      upperBound = height - Math.floor(1.4 * SPAWN_SPACE);

      if (randomDir === 0) {
        leftBound2 = leftBound + Math.floor(1.6 * SPAWN_SPACE);
        upperBound2 = upperBound;
      } else {
        leftBound2 = leftBound;
        upperBound2 = upperBound - Math.floor(1.6 * SPAWN_SPACE);
      }

      break;

    default:
      console.log(height, width, placement, "BROKE");
      break;
  }

  xPos = Util.getRandomArbitrary(leftBound, leftBound + SPAWN_SPACE / 4);
  yPos = Util.getRandomArbitrary(upperBound, upperBound + SPAWN_SPACE / 4);
  const firstBase = [xPos, yPos];

  xPos2 = Util.getRandomArbitrary(leftBound2, leftBound2 + SPAWN_SPACE / 4);
  yPos2 = Util.getRandomArbitrary(upperBound2, upperBound2 + SPAWN_SPACE / 4);
  const secondBase = [xPos2, yPos2];

  return {
    first: firstBase,
    second: secondBase,
  };
}

function newGame() {
  if (game) game.destroy();
  game = undefined;
  gameView = undefined;

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
    let randomLocation = Util.getRandomArbitrary(0, 4);
    if (!startingLocationForPlayers.includes(randomLocation)) {
      startingLocationForPlayers.push(randomLocation);
      numPlayers -= 1;
    }
  }

  const selectedDifficulty = document.getElementById('game-difficulty').value;
  game = new Game(Object.assign(selectedSettings, { difficulty: selectedDifficulty }));
  game.addStars(Util.getRandomArbitrary(69, 420));
  game.addNeutralBases(SPAWN_SPACE * 1.5, game.settings.neutralBaseCount);
    
  if (audio) {
    audio.play();
    bgMusic = true;
    document.getElementById('mute-button').textContent = "Mute";
  }

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
        if (!!game.prevClick) {
          base.selected = false;

          game.prevClick.forEach(b => {
            b.selected = false;
            if (b === base) {
              base.selected = false;
            } else {
              game.swarm(b, base);
            }
          })

          game.prevClick = undefined;
        } else {
          if (base.player.humanPlayer) {
            base.selected = true;
            game.prevClick = [base];
          } else {
            // Nothing happens for now
          }
        }

        clickedBase = true;
      } else {
        base.selected = false;
      }
    });

    if (!clickedBase) {
      game.prevClick = false;
    }
  });

  startingLocationForPlayers.forEach((loc, index) => {
    game.addPlayer({
      playerName: `Player ${index + 1}`,
      humanPlayer: !computerOnly && index === 0,
      thoughtGrowth: !computerOnly && index === 0 ? 0 : gameDifficulty[selectedDifficulty],
      color: playerColors[index],
      origin: locationPosition(game.settings.height, game.settings.width, loc),
      game: game,
    });
  });

  document.getElementById('game-toggles').classList.remove('hidden');
  document.getElementById('canvas').scrollIntoView();

  gameView = new GameView(game, context).start();
}

function toggleGrid() {
  if (game) game.drawGrid = !game.drawGrid;
}

document.addEventListener("DOMContentLoaded", () => {
  const newGameButton = document.getElementById('new-game');
  const computerGameButton = document.getElementById('computer-game');

  newGameButton.addEventListener('click', event => {
    event.target.textContent = "Button is Broke";
    newGameButton.disabled = true;
    computerOnly = false;
    newGame();
  });
  
  computerGameButton.addEventListener('click', event => {
    newGameButton.textContent = "Button is Broke";
    newGameButton.disabled = true;
    computerOnly = true;
    newGame();
  });

  audio = document.getElementsByTagName('audio')[0];

  const muteButton = document.getElementById('mute-button');
  muteButton.addEventListener('click', event => {
    bgMusic = !bgMusic;
    bgMusic ? audio.play() : audio.pause();
    
    if (game) game.mute = bgMusic;

    muteButton.innerText = bgMusic ? "Mute" : "Unmute";
  });

  const toggleGridButton = document.getElementById('grid-toggle');
  toggleGridButton.addEventListener('click', event => {
    toggleGrid();
  });
});
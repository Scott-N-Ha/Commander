import GameView from '../lib/game_view.js';
import Game from '../lib/game.js';
import Util from '../lib/util.js';
import Player from '../lib/player.js';

const defaultSettings = {
  height: 500,
  width: 500,
  backgroundColor: "#101010",
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(defaultSettings);

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

  game.addPlayer({
    playerName: "Player 1",
    humanPlayer: true,
    color: '#91EB8F',
    origin: [0,0],
    space: 50,
  })

  game.addPlayer({
    playerName: "Player 2",
    humanPlayer: false,
    color: '#EB7261',
    origin: [400,400],
    space: 50,
  })

  // game.addBase({
  //   unitCount: 50,
  //   color: '#91EB8F',
  //   position: [100,100],
  //   growthRate: 0.1,
  // });

  // game.addBase({
  //   unitCount: 50,
  //   color: '#EB7261',
  //   position: [400,400],
  //   growthRate: 0.1,
  // });

  new GameView(game, context).start();
});

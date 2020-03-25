import GameView from '../lib/game_view.js';
import Game from '../lib/game.js';

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

  canvas.addEventListener('click', event => {
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;

    let clickedBase = false;

    game.bases.forEach(base => {
      if (y > base.y && y < base.y + base.width && x > base.x && x < base.x + base.width) {
        console.log('Clicked a Base!', base);
        base.selected = true;
        game.prevClick = true;

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

  game.addBase({
    unitCount: 50,
    color: '#91EB8F',
    position: [100,100],
    growthRate: 0.1,
  });

  game.addBase({
    unitCount: 50,
    color: '#EB7261',
    position: [400,400],
    growthRate: 0.1,
  });

  const context = canvas.getContext('2d');
  new GameView(game, context).start();
});

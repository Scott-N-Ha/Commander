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

  const context = canvas.getContext('2d');
  new GameView(game, context).start();
});

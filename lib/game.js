import Util from './util.js';
import Base from './base.js';
import Unit from './unit.js';
import Player from './player.js';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const defaultSettings = {
  height: 500,
  width: 500,
  backgroundColor: "#808080",
}

class Game {
  constructor(settings = defaultSettings){
    this.settings = settings;

    this.players = [];
    this.gameOver = false;

    this.bases = [];
    this.prevClick = undefined;

    this.units = [];

    this.draw = this.draw.bind(this);
    this.step = this.step.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.addBase = this.addBase.bind(this);
    this.addUnit = this.addUnit.bind(this);
  }

  addPlayer(settings){
    const player = new Player(settings);
    this.players.push(player);

    const { origin, space } = settings;
    const randPosX = getRandomArbitrary(origin[0], origin[0] + space);
    const randPosY = getRandomArbitrary(origin[1], origin[0] + space);

    this.addBase({
      unitCount: 50,
      color: player.color,
      position: [randPosX, randPosY],
      growthRate: 0.69,
      player: player,
    });
  }

  addBase(settings){
    this.players.find(player => player === settings.player).baseCount += 1;
    this.bases.push(new Base(settings));
  }

  addUnit(settings){
    this.units.push(new Unit(settings));
  }

  allObjects(){
    return [].concat(this.bases, this.units);
  }

  draw(context){
    const { settings: { height, width, backgroundColor } } = this;

    context.clearRect(0, 0, width, height);
    context.canvas.width = context.canvas.width;
    context.beginPath();
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);

    this.allObjects().forEach(obj => {
      obj.draw(context);
    });
  }

  step(delta){
    this.allObjects().forEach(obj => {
      obj.step(delta);
    });
  }
}

export default Game;

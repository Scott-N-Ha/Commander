import Util from './util.js';
import Star from './star.js';
import Base from './base.js';
import Unit from './unit.js';
import Player from './player.js';

const defaultSettings = {
  height: 500,
  width: 500,
  backgroundColor: "#808080",
}

class Game {
  constructor(settings = defaultSettings){
    this.settings = settings;

    this.players = [];
    this.humanPlayer;
    this.gameOver = false;

    this.bases = [];
    this.prevClick = undefined;

    this.units = [];
    this.unitsUniqueId = -999999999;

    this.stars = [];

    this.draw = this.draw.bind(this);
    this.step = this.step.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.addBase = this.addBase.bind(this);
    this.addUnit = this.addUnit.bind(this);

    this.playerBases = document.getElementsByClassName('player-bases')[0];
    this.playerUnits = document.getElementsByClassName('player-units')[0];
  }

  addStars(intensity){
    while(this.stars.length < intensity) {
      this.stars.push(new Star(this.settings.height, this.settings.width));
    }
  }

  addPlayer(settings){
    const player = new Player(settings);
    this.players.push(player);
    if (player.humanPlayer) this.humanPlayer = player;

    this.addBase({
      unitCount: 50,
      position: settings.origin.first,
      growthRate: 0.69,
      width: 55,
      player: player,
      game: this,
    });

    this.addBase({
      unitCount: 25,
      position: settings.origin.second,
      growthRate: 0.5,
      width: 40,
      player: player,
      game: this,
    });
  }

  addBase(settings){
    const newBase = new Base(settings);
    this.players.find(player => player === settings.player).bases.push(newBase);
    this.bases.push(newBase);
  }

  addNeutralBases(spawnSpaceOrigin, numOfBases){

  }

  addUnit(settings){
    this.units.push(new Unit(settings));
  }

  allObjects(){
    return [].concat(this.stars, this.bases, this.units);
  }

  swarm(base1, base2){
    let unitCount = Math.floor(base1.unitCount/2);
    base1.unitCount = base1.unitCount - unitCount;

    const x = base1.x - 34;
    const y = base1.y - 34;
    const width = base1.width + 69;

    const targetX = base2.x + base2.width/2;
    const targetY = base2.y + base2.width/2;

    while(unitCount > 0) {
      let newUnitX = Util.getRandomArbitrary(x, x + width);
      let newUnitY = Util.getRandomArbitrary(y, y + width);
      let newVelocity = Util.direction([targetX - newUnitX, targetY - newUnitY]);

      const newUnit = new Unit({
        x: newUnitX,
        y: newUnitY,
        velocity: newVelocity,
        player: base1.player,
        game: this,
        target: base2,
        uniqueId: this.unitsUniqueId,
      });

      this.units.push(newUnit);

      this.unitsUniqueId += 1;
      unitCount -= 1;
    }
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

    if (this.humanPlayer.bases.length <= 0) this.gameOver = true;
    if (this.players.length === 1) this.gameOver = true;

    this.playerBases.textContent = this.humanPlayer.bases.length;
    this.playerUnits.textContent = this.humanPlayer.bases.reduce((acc, base) => (acc + base.unitCount), 0);
  }

  remove(object){
    if (object instanceof Unit) {
      this.units.splice(this.units.indexOf(object), 1); // Olivia saves the day
    }
  }
}

export default Game;

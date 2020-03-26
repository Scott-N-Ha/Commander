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
  constructor(settings = defaultSettings) {
    this.settings = settings;

    this.players = [];
    this.humanPlayer;
    this.gameOver = false;
    this.alerted = false;

    this.bases = [];
    this.prevClick = undefined;

    this.units = [];
    this.unitsUniqueId = -999999999;

    this.stars = [];

    this.drawGrid = false;
    this.mute = false;

    this.playerStatsDiv;

    this.draw = this.draw.bind(this);
    this.step = this.step.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.addBase = this.addBase.bind(this);
    this.addUnit = this.addUnit.bind(this);
  }

  addStars(intensity) {
    while (this.stars.length < intensity) {
      this.stars.push(new Star(this.settings.height, this.settings.width));
    }
  }

  addPlayer(settings) {
    const player = new Player(settings);

    const newDiv = document.createElement('div');
    newDiv.classList.add('player');
    newDiv.style.color = player.color;
    
    const newName = document.createElement('div');
    newName.classList.add('player-name');
    newName.innerHTML = player.playerName;
    newName.style.color = player.color;
    newDiv.appendChild(newName);
    
    const newBase = document.createElement('div');
    newBase.classList.add('player-bases');
    newBase.style.color = player.color;
    newDiv.appendChild(newBase);
    
    const newUnit = document.createElement('div');
    newUnit.classList.add('player-units');
    newUnit.style.color = player.color;
    newDiv.appendChild(newUnit);
    
    const newAttack = document.createElement('div');
    newAttack.classList.add('player-attack');
    newAttack.style.color = player.color;
    newDiv.appendChild(newAttack);

    document.getElementById('player-stats').appendChild(newDiv);

    player.playerDiv = newDiv;
    player.game = this;

    this.players.push(player);
    if (player.humanPlayer) this.humanPlayer = player;

    this.addBase({
      unitCount: 50,
      growthCount: 50,
      position: settings.origin.first,
      growthRate: 0.69,
      width: 69,
      player: player,
    });

    this.addBase({
      unitCount: 25,
      growthCount: 30,
      position: settings.origin.second,
      growthRate: 0.5,
      width: 50,
      player: player,
    });
  }

  addBase(settings) {
    const newBase = new Base(settings);
    if (settings.player.type !== null) this.players.find(player => player === settings.player).bases.push(newBase);
    this.bases.push(newBase);
  }
  
  addNeutralBases(spawnSpaceOrigin, numOfBases) {
    let left = spawnSpaceOrigin,
    top = spawnSpaceOrigin,
    width = this.settings.width - spawnSpaceOrigin,
    height = this.settings.height - spawnSpaceOrigin,
    widthChunks = Math.floor(width / Math.sqrt(numOfBases)),
    heightChunks = Math.floor(height / Math.sqrt(numOfBases));
    
    const positions = [];

    for (let i = 0; i < Math.sqrt(numOfBases); i++) {
      top = spawnSpaceOrigin;
      for (let j = 0; j < Math.sqrt(numOfBases); j++) {
        let newLeft = Util.getRandomArbitrary(left, left + widthChunks/numOfBases);
        let newTop = Util.getRandomArbitrary(top, top + heightChunks/numOfBases);
        positions.push([newLeft, newTop]);

        top += heightChunks;
      }
      left += widthChunks;
    }

    positions.forEach(pos => {
      this.addBase({
        unitCount: 0,
        position: pos,
        growthRate: Util.getRandomArbitrary(25, 50)/100,
        growthCount: Util.getRandomArbitrary(25, 51),
        width: Util.getRandomArbitrary(45, 70),
        player: {
          type: null,
          color: '#C0C0C0',
        },
      });
    })
  }

  addUnit(settings) {
    this.units.push(new Unit(settings));
  }

  allObjects() {
    return [].concat(this.stars, this.bases, this.units, this.players);
  }

  swarm(base1, base2) {
    let unitCount = Math.floor(base1.unitCount / 2);
    base1.unitCount = base1.unitCount - unitCount;

    const x = base1.x - 34;
    const y = base1.y - 34;
    const width = base1.width + 69;

    const targetX = base2.x + base2.width / 2;
    const targetY = base2.y + base2.width / 2;

    while (unitCount > 0) {
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

  draw(context) {
    const {
      settings: {
        height,
        width,
        backgroundColor
      }
    } = this;

    context.clearRect(0, 0, width, height);
    context.canvas.width = context.canvas.width;
    context.beginPath();
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);

    if (this.drawGrid) {
      context.strokeStyle = 'gray';
      for (let i = 100; i < this.settings.width; i+= 100) {
        context.moveTo(i, 0);
        context.lineTo(i, this.settings.height);
        context.stroke();
      }
      for (let i = 100; i < this.settings.height; i+= 100) {
        context.moveTo(0, i);
        context.lineTo(this.settings.width, i);
        context.stroke();
      }
    }

    this.allObjects().forEach(obj => {
      obj.draw(context);
    });
  }

  step(delta) {
    this.allObjects().forEach(obj => {
      obj.step(delta);
    });

    if (this.humanPlayer) {
      if (this.humanPlayer.bases.length <= 0 && !this.alerted) {
        // this.gameOver = true;
        alert('You Lose!');
        this.alerted = true;
      }
      if (this.players.length === 1 && !this.alerted) {
        // this.gameOver = true;
        alert('You Win!');
        this.alerted = true;
      }
    }
  }

  remove(object) {
    if (object instanceof Unit) {
      this.units.splice(this.units.indexOf(object), 1); // Olivia saves the day
    } else if (object instanceof Player) {
      object.playerDiv.remove();
      this.players.splice(this.players.indexOf(object), 1);
    } else if (object instanceof Base) {
      this.bases.splice(this.bases.indexOf(object), 1);
    } else if (object instanceof Star) {
      this.stars.splice(this.stars.indexOf(object), 1);
    }
  }

  destroy(){
    this.gameOver = true;
    this.allObjects().forEach(obj => this.remove(obj));
  }
}

export default Game;
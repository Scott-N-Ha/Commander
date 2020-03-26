import Util from './util.js';

const computerAITypes = {
  0: "Default CPU",
  1: "Aggressive CPU",
  2: "Sneaky CPU",
  3: "Defensive CPU",
  4: "Production CPU"
}

const gameDifficulty = {
  easy: 0.0,
  medium: -20.0,
  hard: -50.00,
}

class Player {
  constructor(options) {
    this.playerName = options.playerName;
    this.humanPlayer = options.humanPlayer;

    if (!options.humanPlayer) this.computerType = Util.getRandomArbitrary(0, 5);

    this.color = options.color;

    this.bases = [];
    this.unitCount = 0;
    this.attackPower = 0;

    this.game = options.game;
    this.playerDiv;

    this.thoughtProgress = gameDifficulty[this.game.difficulty];
    this.thoughtGrowth = options.thoughtGrowth + Util.getRandomArbitrary(0, 10) / 100;

    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);
    this.fillDisplay = this.fillDisplay.bind(this);
    this.computeMoves = this.computeMoves.bind(this);

    this.findWeakestPlayer = this.findWeakestPlayer.bind(this);
    this.findStrongestPlayer = this.findStrongestPlayer.bind(this);
    this.swarm = this.swarm.bind(this);
    this.swarmWeakestBase = this.swarmWeakestBase.bind(this);

    this.aggresiveManuevers = this.aggresiveManuevers.bind(this);
    this.sneakyManuevers = this.sneakyManuevers.bind(this);
    this.slowManuevers = this.slowManuevers.bind(this);
    this.valueManuevers = this.valueManuevers.bind(this);
    this.defaultManuevers = this.defaultManuevers.bind(this);
  }

  fillDisplay() {
    if (this.playerDiv) {
      for (let i = 1; i < this.playerDiv.children.length; i++) {
        let htmlText;
        switch (i) {
          case 1:
            htmlText = this.humanPlayer ? "Human" : computerAITypes[this.computerType];
            break;
          case 2:
            htmlText = "Bases: " + this.bases.length;
            break;
          case 3:
            htmlText = "Units: " + this.unitCount;
            break;
          case 4:
            htmlText = "Power: " + this.attackPower;
            break;

          default:
            console.log('Out of bounds in Player Div');
            break;
        }

        this.playerDiv.children[i].innerText = htmlText;
      }
    }
  }

  swarm(target) {
    this.bases.forEach(base => this.game.swarm(base, target));
  }

  swarmWeakestBase(player) {
    this.swarm(player.bases.reduce((acc, base) => acc.unitCount < base.unitCount ? acc : base));
  }

  findWeakestPlayer(includeSelf = true) {
    if (includeSelf) {
      return this.game.players.reduce((acc, player) => acc.attackPower < player.attackPower ? acc : player);
    } else {
      return this.game.players.reduce((acc, player) => {
        if (acc === this) return player;
        if (player === this) return acc;
        return acc.attackPower < player.attackPower ? acc : player;
      })
    }
  }

  findStrongestPlayer() {
    return this.game.players.reduce((acc, player) => acc.attackPower > player.attackPower ? acc : player);
  }

  aggresiveManuevers() {
    // Find the weakest player and target their weakest base
    this.swarmWeakestBase(this.findWeakestPlayer(false));
  }

  sneakyManuevers() {
    // Find the player with the most favorable bases
    const mostBases = this.game.players.reduce((acc, player) => {
      if (acc === this) return player;
      if (player === this) return acc;
      if (acc.bases.length > player.bases.length) return acc;
      if (acc.bases.length === player.bases.length && acc.unitCount < player.unitCount) return acc;
      return player;
    });

    // Target the weakest base
    this.swarmWeakestBase(mostBases);
  }

  slowManuevers() {
    const closetBase = this.game.bases.reduce((acc, base) => {
      if (acc.player === this) return base;
      if (base.player === this) return acc;
      return Util.distance([this.x, this.y], [acc.x, acc.y]) < Util.distance([this.x, this.y], [base.x, base.y]) ? acc : base;
    });

    if (this.attackPower > closetBase.unitCount) {
      this.swarm(closetBase);
    } else {
      // Do nothing for now
    }
  }

  valueManuevers() {
    const basesWithHighProd = this.game.bases.filter(base => base.player !== this && base.growthCount > 40);

    if (basesWithHighProd.length > 1) {
      const mostDesirableBase = basesWithHighProd.reduce((acc, base) => acc.unitCount < base.unitCount ? acc : base);

      this.swarm(mostDesirableBase);
    } else {
      this.defaultManuevers();
    }
  }

  defaultManuevers() {
    // Determine Current Ranking and decide to Attack or Defend
    const bestPlayer = this.findStrongestPlayer();
    const worstPlayer = this.findWeakestPlayer();

    let weakestBase, strongestBase;

    // If we are the best player
    if (bestPlayer === this) {
      weakestBase = this.game.bases.reduce((acc, base) => {
        if (acc.player === this) return base;
        if (base.player === this) return acc;
        return acc.unitCount < base.unitCount ? acc : base;
      });

      this.swarm(weakestBase);
    } else {
      if (worstPlayer !== this) {
        // Do nothing
      } else if (this.bases.length > 1) {
        strongestBase = this.bases.reduce((acc, base) => acc.unitCount > base.unitCount ? acc : base);
        weakestBase = this.bases.reduce((acc, base) => acc.unitCount < base.unitCount ? acc : base);

        this.game.swarm(strongestBase, weakestBase);
      }
    }
  }

  computeMoves() {
    this.thoughtProgress = 0.0;

    if (this.game.players.length === 1) {
      const survivors = this.game.bases.filter(base => base.player !== this);
      if (survivors.length > 0) {
        survivors.forEach(base => this.swarm(base));
      }

      // Celebration lap
      // if(Util.getRandomArbitrary(0,10) === 7) {
      //   this.swarm(this.bases[Util.getRandomArbitrary(0, this.bases.length)]);
      // }
    } else {
      // Hunt for Neutral Bases
      const neutralBases = this.game.bases.filter(base => base.player.type === null);
  
      if (neutralBases.length > 0) {
        const target = neutralBases.reduce((acc, base) => {
          const accDist = Util.distance([acc.x, acc.y], [this.x, this.y]);
          const baseDist = Util.distance([base.x, base.y], [this.x, this.y]);
          return accDist < baseDist ? acc : base;
        });
  
        this.swarm(target);
      }
  
      switch (this.computerType) {
        case 1:
          this.aggresiveManuevers();
          break;
        case 2:
          this.sneakyManuevers();
          break;
        case 3:
          this.slowManuevers();
          break;
        case 4:
          this.valueManuevers();
          break;
  
        default:
          this.defaultManuevers();
          break;
      }
    }
  }

  step() {
    if (this.bases.length > 0) {
      let newUnitCount = this.bases.reduce((acc, base) => (acc + base.unitCount), 0);
      this.unitCount = newUnitCount;
      this.attackPower = Math.floor(newUnitCount / 2);

      let average = this.bases.reduce((acc, base) => {
        return [acc[0] + base.x, acc[1] + base.y];
      }, [0, 0]);

      this.x = average[0] / this.bases.length;
      this.y = average[1] / this.bases.length;
      this.fillDisplay();

      // Computers take over here
      if (!this.humanPlayer) {
        this.thoughtProgress += this.thoughtGrowth;
      }

      if (this.thoughtProgress >= 100.00) {
        this.computeMoves();
      }
    } else {
      if (this.game) {
        this.game.remove(this);
      }
    }
  }

  draw() {
    // Do nothing
  }
}

export default Player;
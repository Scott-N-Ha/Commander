import Util from './util.js';

class Player {
  constructor(options) {
    this.playerName = options.playerName;
    this.humanPlayer = options.humanPlayer;
    this.color = options.color;

    this.bases = [];
    this.unitCount = 0;
    this.attackPower = 0;

    this.game;
    this.playerDiv;

    this.thoughtProgress = 0.0;
    this.thoughtGrowth = options.thoughtGrowth + Util.getRandomArbitrary(0,10)/100;

    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);
    this.fillDisplay = this.fillDisplay.bind(this);
    this.computeMoves = this.computeMoves.bind(this);
  }

  fillDisplay() {
    if (this.playerDiv) {
      for (let i = 1; i < 4; i++) {
        let htmlText;
        switch (i) {
          case 1:
            htmlText = "Bases: " + this.bases.length;
            break;
          case 2:
            htmlText = "Units: " + this.unitCount;
            break;
          case 3:
            htmlText = "Attack Power: " + this.attackPower;
            break;

          default:
            console.log('Out of bounds in Player Div');
            break;
        }

        this.playerDiv.children[i].innerText = htmlText;
      }
    }
  }

  computeMoves(){
    this.thoughtProgress = 0.0;

    // Hunt for Neutral Bases
    const neutralBases = this.game.bases.filter(base => base.player.type === null);

    if (neutralBases.length > 0) {
      const target = neutralBases.reduce((acc, base) => {
        const accDist = Util.distance([acc.x, acc.y], [this.x, this.y]);
        const baseDist = Util.distance([base.x, base.y], [this.x, this.y]);
        return accDist < baseDist ? acc : base;
      });

      this.bases.forEach(base => {
        this.game.swarm(base, target);
      });
    }

    // Determine Current Ranking and decide to Attack or Defend
    const bestPlayer = this.game.players.reduce((acc, player) => acc.attackPower > player.attackPower ? acc : player);
    const worstPlayer = this.game.players.reduce((acc, player) => acc.attackPower < player.attackPower ? acc : player);

    let weakestBase, strongestBase;

    // If we are the best player
    if (bestPlayer === this) {
      weakestBase = this.game.bases.reduce((acc, base) => {
        if ( acc.player === this ) return base;
        if ( base.player === this ) return acc;
        return acc.unitCount < base.unitCount ? acc : base;
      });

      this.bases.forEach(base => {
        this.game.swarm(base, weakestBase);
      });
    } else {
      if (worstPlayer !== this) {
        // weakestBase = this.game.bases.reduce((acc, base) => {
        //   if ( acc.player === this ) return base;
        //   if ( base.player === this ) return acc;
        //   return acc.player !== bestPlayer && acc.unitCount < base.unitCount ? acc : base;
        // });
        // strongestBase = this.bases.reduce((acc, base) => acc.unitCount > base.unitCount ? acc : base);

        // this.game.swarm(strongestBase, weakestBase);
      } else if (this.bases.length > 1) {
        strongestBase = this.bases.reduce((acc, base) => acc.unitCount > base.unitCount ? acc : base);
        weakestBase = this.bases.reduce((acc, base) => acc.unitCount < base.unitCount ? acc : base);
  
        this.game.swarm(strongestBase, weakestBase);
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
      }, [0,0]);

      this.x = average[0]/this.bases.length;
      this.y = average[1]/this.bases.length;
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
class Player {
  constructor(options) {
    this.playerName = options.playerName;
    this.humanPlayer = options.humanPlayer;
    this.color = options.color;

    this.bases = [];
    this.unitCount = 0;
    this.attackPower = 0;

    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);
  }

  step(){
    let newUnitCount = this.bases.reduce((acc, base) => (acc + base.unitCount), 0);
    this.unitCount = newUnitCount;
    this.attackPower = Math.floor(newUnitCount/2);
  }

  draw(){
    // Do nothing
  }
}

export default Player;
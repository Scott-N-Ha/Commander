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

    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);
  }

  step(){
    if (this.bases.length >= 1) {

      let newUnitCount = this.bases.reduce((acc, base) => (acc + base.unitCount), 0);
      this.unitCount = newUnitCount;
      this.attackPower = Math.floor(newUnitCount/2);
  
      if (this.playerDiv) {
        for (let i = 1; i < 4; i++) {
          let htmlText;
          switch (i) {
            case 1:
              htmlText = "Bases: " +this.bases.length;
              break;
            case 2:
              htmlText = "Units: " +newUnitCount;
              break;
            case 3:
              htmlText = "Attack Power: " +this.attackPower;
              break;
          
            default:
              console.log('Out of bounds in Player Div');
              break;
          }
  
          this.playerDiv.children[i].innerText = htmlText;
        }
      }    
    } else {
      if (this.game) {
        this.game.remove(this);
      }
    }
  }

  draw(){
    // Do nothing
  }
}

export default Player;
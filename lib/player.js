
class Player {
  constructor(options){
    this.playerName = options.playerName;
    this.humanPlayer = options.humanPlayer;
    this.color = options.color;

    this.bases = [];
  }
}

export default Player;

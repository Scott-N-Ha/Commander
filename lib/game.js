import Util from './util.js';

const defaultSettings = {
  height: 500,
  width: 500,
  backgroundColor: "#808080",
}

class Game {
  constructor(settings = defaultSettings){

    this.settings = settings;

    this.draw = this.draw.bind(this);
    this.step = this.step.bind(this);
  }

  draw(context){
    const { settings: { height, width, backgroundColor } } = this;

    context.clearRect(0, 0, width, height);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);
  }

  step(delta){
    console.log("step!", delta);
  }
}

export default Game;

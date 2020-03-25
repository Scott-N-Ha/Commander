import Util from './util.js';
import Base from './base.js';

const defaultSettings = {
  height: 500,
  width: 500,
  backgroundColor: "#808080",
}

class Game {
  constructor(settings = defaultSettings){
    this.settings = settings;

    this.bases = [new Base()];

    this.draw = this.draw.bind(this);
    this.step = this.step.bind(this);
  }

  allObjects(){
    return [].concat(this.bases);
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
      obj.step();
    });
  }
}

export default Game;

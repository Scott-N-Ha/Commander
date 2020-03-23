
class Game {
  constructor(settings, context){
    this.settings = settings;
    this.context = context;
  }

  draw(){
    const { context, settings: { height, width, background } } = this;

    debugger

    context.clearRect(0, 0, width, height);
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }
}

export default Game;

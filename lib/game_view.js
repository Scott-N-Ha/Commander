class GameView {
  constructor(game, context) {
    this.game = game;
    this.context = context;

    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    this.start = this.start.bind(this);
    this.animate = this.animate.bind(this);
  }
  
  bindKeyHandlers() {
    key("esc", () => console.log("Pressed ESC"));
  }
  
  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;

    requestAnimationFrame(this.animate);
  }

  animate(time) {
    let { game, context, lastTime, animate } = this;
    const timeDelta = time - lastTime;

    game.step(timeDelta);
    game.draw(context);
    lastTime = time;

    requestAnimationFrame(animate);
  }
}

export default GameView;

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
    key("a", () => {
      if (this.game.humanPlayer) {
        this.game.prevClick = this.game.humanPlayer.bases;
        this.game.prevClick.forEach(base => {
          base.selected = true;
        });
      }
    })
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;

    requestAnimationFrame(this.animate);
  }

  animate(time) {
    if (!this.game.gameOver) {
      let {
        game,
        context,
        lastTime,
        animate
      } = this;
      const timeDelta = time - lastTime;

      game.step(timeDelta);
      game.draw(context);
      lastTime = time;

      requestAnimationFrame(animate);
    }
  }
}

export default GameView;
class GameView {
  constructor(game, context) {
    this.game = game;
    this.context = context;

    this.start = this.start.bind(this);
    this.animate = this.animate.bind(this);
  }

  start() {
    console.log('Starting GameVIew');
    this.lastTime = 0;

    requestAnimationFrame(this.animate)
  }

  animate(time){
    console.log("Animating GameView");
    let { game, context, lastTime, animate } = this;
    const timeDelta = time - lastTime;

    game.step(timeDelta);
    game.draw(context);
    lastTime = time;

    requestAnimationFrame(animate);
  }
}

export default GameView;

import Util from './util.js';

// const options = {
//   x: ,
//   y: ,
//   velocity: ,
//   player: ,
//   game: ,
//   target: ,
// }

class Unit {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.velocity = options.velocity;
    this.player = options.player;
    this.game = options.game;
    this.target = options.target;

    this.radius = 2;

    this.draw = this.draw.bind(this);
    this.step = this.step.bind(this);
  }

  step(timeDelta) {
    const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const offsetX = this.velocity[0] * velocityScale;
    const offsetY = this.velocity[1] * velocityScale;

    this.x = this.x + offsetX;
    this.y = this.y + offsetY;
  }

  draw(context) {
    context.fillStyle = this.player.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    context.fill();
  }
}

export default Unit;
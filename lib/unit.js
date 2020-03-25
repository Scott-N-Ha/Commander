import Util from './util.js';

// const options = {
//   x: ,
//   y: ,
//   velocity: ,
//   player: ,
//   game: ,
//   target: ,
// }
const NORMAL_FRAME_TIME_DELTA = 10000 / 6;

class Unit {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.velocity = options.velocity;

    this.player = options.player;
    this.game = options.game;
    this.target = options.target;
    this.uniqueId = options.uniqueId;

    this.radius = 2;

    this.draw = this.draw.bind(this);
    this.step = this.step.bind(this);
    this.remove = this.remove.bind(this);
  }

  step(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const velocityScale = 2.0;
    const offsetX = this.velocity[0] * velocityScale;
    const offsetY = this.velocity[1] * velocityScale;

    this.x = this.x + offsetX;
    this.y = this.y + offsetY;

    if (this.y > this.target.y && this.y < this.target.y + this.target.width && this.x > this.target.x && this.x < this.target.x + this.target.width) {
      this.remove();

      if (this.player === this.target.player) {
        this.target.unitCount = this.target.unitCount + 1;
      } else {
        this.target.unitCount = this.target.unitCount - 1;

        if (this.target.unitCount <= 0) {
          this.target.player.bases.splice(this.target.player.bases.indexOf(this.target), 1);
          this.player.bases.push(this.target);
          this.target.player = this.player;
        }
      }

      // if (this.y > this.target.y && this.y < this.target.y + this.target.width && this.x > this.target.x && this.x < this.target.x + this.target.width) {
    }
  }

  draw(context) {
    context.fillStyle = this.player.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    context.fill();
  }

  remove() {
    this.game.remove(this);
  }
}

export default Unit;
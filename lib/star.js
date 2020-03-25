import Util from './util.js';

class Star {
  constructor(height, width) {
    this.x = Util.getRandomArbitrary(0, width);
    this.y = Util.getRandomArbitrary(0, height);
    this.color = `rgba(255, 255, 255, ${Util.getRandomArbitrary(50, 100)/100})`;
    this.radius = Util.getRandomArbitrary(1, 4);
  }

  step() {
    // Do nothing
  }

  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    context.fill();
  }
}

export default Star;
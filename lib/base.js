const defaultSettings = {
  unitCount: 50,
  position: [250,250],
  growthRate: 0.1,
};

const selectedColor = "#09FF4C";

class Base {
  constructor(settings = defaultSettings){
    this.unitCount = settings.unitCount;
    this.width = settings.unitCount * 1.1;
    this.x = settings.position[0];
    this.y = settings.position[1];
    this.progress = 0.0;
    this.growthRate = settings.growthRate;
    this.growthCount = settings.unitCount;
    this.selected = false;

    this.game = settings.game;
    this.player = settings.player;

    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);
  }

  step(){
    this.progress = Number(Number(this.progress + this.growthRate).toFixed(2));

    if (this.progress >= 100.0){
      this.unitCount += this.growthCount;
      this.progress = 0;
    }
  }

  draw(context) {
    context.fillStyle = this.player.color;
    // context.beginPath();
    // context.arc(this.x, this.y, this.width, 0, 2 * Math.PI, true);
    // context.fill();
    context.fillRect(this.x, this.y, this.width, this.width);

    if (this.selected) {
      context.strokeStyle = selectedColor;
      context.lineWidth = 5;
      context.strokeRect(this.x, this.y, this.width, this.width);
    }

    context.font = '10pt Arial';
    context.textAlign = 'center';
    context.fillStyle = 'black';
    context.fillText(this.unitCount, this.x + this.width/2, this.y + this.width/2);
    context.font = '8pt Arial';
    context.fillText(this.progress, this.x + this.width/2, this.y + this.width/2 + this.width/4);
  }
}

export default Base;

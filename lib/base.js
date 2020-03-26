const defaultSettings = {
  unitCount: 50,
  position: [250, 250],
  growthRate: 0.1,
};

const selectedColor = "#09FF4C";

const progressBarDims = {
  width: 20,
  height: 4,
}

const gameDifficulty = {
  easy: 1.0,
  medium: 1.1,
  hard: 1.2,
}

class Base {
  constructor(settings = defaultSettings) {
    this.unitCount = settings.unitCount;
    this.width = settings.width;
    this.x = settings.position[0];
    this.y = settings.position[1];
    this.progress = 0.0;
    this.growthRate = settings.growthRate;
    this.growthCount = settings.growthCount;
    this.selected = false;

    this.humanGrowthRate = settings.growthRate;
    this.cpuGrowthRate = settings.growthRate * gameDifficulty[settings.difficulty];

    this.player = settings.player;

    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);
  }

  step() {
    if (this.unitCount > 0) {
      this.growthRate = this.player.humanPlayer ? this.humanGrowthRate : this.cpuGrowthRate;

      this.progress += this.growthRate;

      if (this.progress >= 100.0) {
        this.unitCount += this.growthCount;
        this.progress = 0.0;
      }
    } else {
      this.progress = 0.0;
    }
  }

  draw(context) {
    context.fillStyle = this.player.color;
    context.beginPath();
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
    context.fillText(this.unitCount, this.x + this.width / 2, this.y + this.width / 2);

    context.font = '6pt Arial';
    context.fillText(this.growthCount, this.x + 10, this.y + 10);

    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.strokeRect(this.x + (this.width / 2) - (progressBarDims.width / 2 + 1), this.y + Math.floor(this.width * .6), progressBarDims.width + 2, progressBarDims.height + 2);
    // context.strokeRect(this.x + this.width/2, this.y + Math.floor(this.width * .75), 12, 3);
    context.fillStyle = 'black';
    context.fillRect(this.x + (this.width / 2) - (progressBarDims.width / 2), this.y + Math.floor(this.width * .6) + 1, progressBarDims.width, progressBarDims.height)
    context.fillStyle = 'green';
    context.fillRect(this.x + (this.width / 2) - (progressBarDims.width / 2), this.y + Math.floor(this.width * .6) + 1, (progressBarDims.width * this.progress / 100), progressBarDims.height)

    // context.font = '8pt Arial';
    // context.fillText(this.progress, this.x + this.width/2, this.y + this.width/2 + this.width/4);
  }
}

export default Base;
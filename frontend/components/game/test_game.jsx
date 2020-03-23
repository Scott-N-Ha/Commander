import React from 'react';

import Game from '../../../lib/game.js';

const test_game = {
  height: 500,
  width: 500,
  background: "#000",
}

class Test extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    debugger
    let canvas = document.getElementById('canvas');

    canvas.width = test_game.width;
    canvas.height = test_game.height;
    
    this.context = canvas.getContext('2d');
    this.canvas = canvas;

    this.game = new Game(test_game, this.context);
    this.game.draw();
  }

  render(){
    return (
      <div id="game-window">
        <canvas id="canvas"></canvas>
      </div>
    )
  }
}

export default Test;

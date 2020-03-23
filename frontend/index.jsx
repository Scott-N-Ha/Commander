import React from 'react'
import ReactDom from 'react-dom'

const GAME_CONSTANTS = {
  height: 500,
  width: 500,
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-window')
  canvas.height = GAME_CONSTANTS.height
  canvas.width = GAME_CONSTANTS.width


  const root = document.getElementById('root')
  ReactDom.render(
    <div>
      React Hooked
    </div>
  , root)
})
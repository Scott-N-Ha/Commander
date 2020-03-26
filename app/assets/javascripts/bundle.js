/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/index.jsx":
/*!****************************!*\
  !*** ./frontend/index.jsx ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_game_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/game_view.js */ "./lib/game_view.js");
/* harmony import */ var _lib_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/game.js */ "./lib/game.js");
/* harmony import */ var _lib_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/util.js */ "./lib/util.js");



var gameView;
var game;
var computerOnly = false;
var bgMusic = false;
var audio;
var SPAWN_SPACE = 69;
var smallSettings = {
  height: 500,
  width: 500,
  backgroundColor: "#101010",
  neutralBaseCount: 4
};
var mediumSettings = {
  height: 1000,
  width: 1000,
  backgroundColor: "#101010",
  neutralBaseCount: 9
};
var largeSettings = {
  height: 1080,
  width: 1920,
  backgroundColor: "#101010",
  neutralBaseCount: 16
};
var playerColors = ['#91EB8F', '#D66342', '#8ACAF6', '#AB77D4'];
var gameDifficulty = {
  easy: .33,
  medium: .66,
  hard: .88
};

function locationPosition(height, width, placement) {
  var leftBound = 5,
      upperBound = 5,
      xPos = 5,
      yPos = 5;
  var leftBound2 = 5,
      upperBound2 = 5,
      xPos2 = 5,
      yPos2 = 5;
  var randomDir = _lib_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].getRandomArbitrary(0, 2);

  switch (placement) {
    case 0:
      // First Base
      leftBound = 5;
      upperBound = 5; // Second Base

      if (randomDir === 0) {
        leftBound2 = leftBound;
        upperBound2 = upperBound + Math.floor(1.6 * SPAWN_SPACE);
      } else {
        leftBound2 = leftBound + Math.floor(1.6 * SPAWN_SPACE);
        upperBound2 = upperBound;
      }

      break;

    case 1:
      leftBound = width - Math.floor(1.4 * SPAWN_SPACE);
      upperBound = 5;

      if (randomDir === 0) {
        leftBound2 = leftBound - Math.floor(1.6 * SPAWN_SPACE);
        upperBound2 = upperBound;
      } else {
        leftBound2 = leftBound;
        upperBound2 = upperBound + Math.floor(1.6 * SPAWN_SPACE);
      }

      break;

    case 2:
      leftBound = width - Math.floor(1.4 * SPAWN_SPACE);
      upperBound = height - Math.floor(1.4 * SPAWN_SPACE);

      if (randomDir === 0) {
        leftBound2 = leftBound - Math.floor(1.6 * SPAWN_SPACE);
        upperBound2 = upperBound;
      } else {
        leftBound2 = leftBound;
        upperBound2 = upperBound - Math.floor(1.6 * SPAWN_SPACE);
      }

      break;

    case 3:
      leftBound = 5;
      upperBound = height - Math.floor(1.4 * SPAWN_SPACE);

      if (randomDir === 0) {
        leftBound2 = leftBound + Math.floor(1.6 * SPAWN_SPACE);
        upperBound2 = upperBound;
      } else {
        leftBound2 = leftBound;
        upperBound2 = upperBound - Math.floor(1.6 * SPAWN_SPACE);
      }

      break;

    default:
      console.log(height, width, placement, "BROKE");
      break;
  }

  xPos = _lib_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].getRandomArbitrary(leftBound, leftBound + SPAWN_SPACE / 4);
  yPos = _lib_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].getRandomArbitrary(upperBound, upperBound + SPAWN_SPACE / 4);
  var firstBase = [xPos, yPos];
  xPos2 = _lib_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].getRandomArbitrary(leftBound2, leftBound2 + SPAWN_SPACE / 4);
  yPos2 = _lib_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].getRandomArbitrary(upperBound2, upperBound2 + SPAWN_SPACE / 4);
  var secondBase = [xPos2, yPos2];
  return {
    first: firstBase,
    second: secondBase
  };
}

function newGame() {
  if (game) game.destroy();
  game = undefined;
  gameView = undefined;
  var selectedSettings;

  switch (document.getElementById('game-setting').value) {
    case "small":
      selectedSettings = smallSettings;
      break;

    case "large":
      selectedSettings = largeSettings;
      break;

    default:
      selectedSettings = mediumSettings;
      break;
  }

  var numPlayers = document.getElementById('game-players').value;
  var startingLocationForPlayers = [];

  while (numPlayers > 0) {
    var randomLocation = _lib_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].getRandomArbitrary(0, 4);

    if (!startingLocationForPlayers.includes(randomLocation)) {
      startingLocationForPlayers.push(randomLocation);
      numPlayers -= 1;
    }
  }

  var selectedDifficulty = document.getElementById('game-difficulty').value;
  game = new _lib_game_js__WEBPACK_IMPORTED_MODULE_1__["default"](Object.assign(selectedSettings, {
    difficulty: selectedDifficulty
  }));
  game.addStars(_lib_util_js__WEBPACK_IMPORTED_MODULE_2__["default"].getRandomArbitrary(69, 420));
  game.addNeutralBases(SPAWN_SPACE * 1.5, game.settings.neutralBaseCount);

  if (audio) {
    audio.play();
    bgMusic = true;
  }

  var canvas = document.getElementById('canvas');
  canvas.width = game.settings.width;
  canvas.height = game.settings.height;
  var context = canvas.getContext('2d');
  canvas.addEventListener('click', function (event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    var clickedBase = false;
    game.bases.forEach(function (base) {
      if (y > base.y && y < base.y + base.width && x > base.x && x < base.x + base.width) {
        if (!!game.prevClick) {
          base.selected = false;
          game.prevClick.forEach(function (b) {
            b.selected = false;

            if (b === base) {
              base.selected = false;
            } else {
              game.swarm(b, base);
            }
          });
          game.prevClick = undefined;
        } else {
          if (base.player.humanPlayer) {
            base.selected = true;
            game.prevClick = [base];
          } else {// Nothing happens for now
          }
        }

        clickedBase = true;
      } else {
        base.selected = false;
      }
    });

    if (!clickedBase) {
      game.prevClick = false;
    }
  });
  startingLocationForPlayers.forEach(function (loc, index) {
    game.addPlayer({
      playerName: "Player ".concat(index + 1),
      humanPlayer: !computerOnly && index === 0,
      thoughtGrowth: !computerOnly && index === 0 ? 0 : gameDifficulty[selectedDifficulty],
      color: playerColors[index],
      origin: locationPosition(game.settings.height, game.settings.width, loc),
      game: game
    });
  });
  document.getElementById('game-toggles').classList.remove('hidden');
  document.getElementById('canvas').scrollIntoView();
  gameView = new _lib_game_view_js__WEBPACK_IMPORTED_MODULE_0__["default"](game, context).start();
}

function toggleGrid() {
  if (game) game.drawGrid = !game.drawGrid;
}

document.addEventListener("DOMContentLoaded", function () {
  var newGameButton = document.getElementById('new-game');
  var computerGameButton = document.getElementById('computer-game');
  newGameButton.addEventListener('click', function (event) {
    event.target.textContent = "Borken Button :(";
    event.target.disabled = true; // computerGameButton.disabled = true;

    newGame();
  });
  computerGameButton.addEventListener('click', function (event) {
    newGameButton.disabled = true;
    newGameButton.textContent = "Borken Button :("; // event.target.disabled = true;

    computerOnly = true;
    newGame();
  });
  audio = document.getElementsByTagName('audio')[0];
  var muteButton = document.getElementById('mute-button');
  muteButton.addEventListener('click', function (event) {
    bgMusic = !bgMusic;
    bgMusic ? audio.play() : audio.pause();
    if (game) game.mute = bgMusic;
    muteButton.innerText = bgMusic ? "Mute" : "Unmute";
  });
  var toggleGridButton = document.getElementById('grid-toggle');
  toggleGridButton.addEventListener('click', function (event) {
    toggleGrid();
  });
});

/***/ }),

/***/ "./lib/base.js":
/*!*********************!*\
  !*** ./lib/base.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultSettings = {
  unitCount: 50,
  position: [250, 250],
  growthRate: 0.1
};
var selectedColor = "#09FF4C";
var progressBarDims = {
  width: 20,
  height: 4
};
var gameDifficulty = {
  easy: 1.0,
  medium: 1.05,
  hard: 1.1
};

var Base = /*#__PURE__*/function () {
  function Base() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSettings;

    _classCallCheck(this, Base);

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

  _createClass(Base, [{
    key: "step",
    value: function step() {
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
  }, {
    key: "draw",
    value: function draw(context) {
      context.fillStyle = this.player.color;
      context.beginPath(); // context.arc(this.x, this.y, this.width, 0, 2 * Math.PI, true);
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
      context.strokeRect(this.x + this.width / 2 - (progressBarDims.width / 2 + 1), this.y + Math.floor(this.width * .6), progressBarDims.width + 2, progressBarDims.height + 2); // context.strokeRect(this.x + this.width/2, this.y + Math.floor(this.width * .75), 12, 3);

      context.fillStyle = 'black';
      context.fillRect(this.x + this.width / 2 - progressBarDims.width / 2, this.y + Math.floor(this.width * .6) + 1, progressBarDims.width, progressBarDims.height);
      context.fillStyle = 'green';
      context.fillRect(this.x + this.width / 2 - progressBarDims.width / 2, this.y + Math.floor(this.width * .6) + 1, progressBarDims.width * this.progress / 100, progressBarDims.height); // context.font = '8pt Arial';
      // context.fillText(this.progress, this.x + this.width/2, this.y + this.width/2 + this.width/4);
    }
  }]);

  return Base;
}();

/* harmony default export */ __webpack_exports__["default"] = (Base);

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");
/* harmony import */ var _star_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./star.js */ "./lib/star.js");
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.js */ "./lib/base.js");
/* harmony import */ var _unit_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./unit.js */ "./lib/unit.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player.js */ "./lib/player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var defaultSettings = {
  height: 500,
  width: 500,
  backgroundColor: "#808080"
};
var computerAITypes = {
  0: "default",
  1: "aggresive",
  2: "sneaky",
  3: "slow but steady",
  4: "value bases"
};

var Game = /*#__PURE__*/function () {
  function Game() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSettings;

    _classCallCheck(this, Game);

    this.settings = settings;
    this.difficulty = settings.difficulty;
    this.players = [];
    this.humanPlayer;
    this.gameOver = false;
    this.alerted = false;
    this.bases = [];
    this.prevClick = undefined;
    this.units = [];
    this.unitsUniqueId = -999999999;
    this.stars = [];
    this.drawGrid = false;
    this.mute = false;
    this.playerStatsDiv;
    this.draw = this.draw.bind(this);
    this.step = this.step.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.addBase = this.addBase.bind(this);
    this.addUnit = this.addUnit.bind(this);
  }

  _createClass(Game, [{
    key: "addStars",
    value: function addStars(intensity) {
      while (this.stars.length < intensity) {
        this.stars.push(new _star_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.settings.height, this.settings.width));
      }
    }
  }, {
    key: "addPlayer",
    value: function addPlayer(settings) {
      var player = new _player_js__WEBPACK_IMPORTED_MODULE_4__["default"](settings);
      var newDiv = document.createElement('div');
      newDiv.classList.add('player');
      newDiv.style.color = player.color;
      var newName = document.createElement('div');
      newName.classList.add('player-name');
      newName.innerHTML = player.playerName;
      newName.style.color = player.color;
      newDiv.appendChild(newName);
      var newType = document.createElement('div');
      newType.classList.add('player-type');
      newType.innerHTML = player.humanPlayer ? "Human" : computerAITypes[player.computerType];
      newType.style.color = player.color;
      newDiv.appendChild(newType);
      var newBase = document.createElement('div');
      newBase.classList.add('player-bases');
      newBase.style.color = player.color;
      newDiv.appendChild(newBase);
      var newUnit = document.createElement('div');
      newUnit.classList.add('player-units');
      newUnit.style.color = player.color;
      newDiv.appendChild(newUnit);
      var newAttack = document.createElement('div');
      newAttack.classList.add('player-attack');
      newAttack.style.color = player.color;
      newDiv.appendChild(newAttack);
      document.getElementById('player-stats').appendChild(newDiv);
      player.playerDiv = newDiv;
      this.players.push(player);
      if (player.humanPlayer) this.humanPlayer = player;
      this.addBase({
        unitCount: 50,
        growthCount: 50,
        position: settings.origin.first,
        growthRate: 0.69,
        width: 69,
        player: player,
        difficulty: this.difficulty
      });
      this.addBase({
        unitCount: 25,
        growthCount: 30,
        position: settings.origin.second,
        growthRate: 0.5,
        width: 50,
        player: player,
        difficulty: this.difficulty
      });
    }
  }, {
    key: "addBase",
    value: function addBase(settings) {
      var newBase = new _base_js__WEBPACK_IMPORTED_MODULE_2__["default"](settings);
      if (settings.player.type !== null) this.players.find(function (player) {
        return player === settings.player;
      }).bases.push(newBase);
      this.bases.push(newBase);
    }
  }, {
    key: "addNeutralBases",
    value: function addNeutralBases(spawnSpaceOrigin, numOfBases) {
      var _this = this;

      var left = spawnSpaceOrigin,
          top = spawnSpaceOrigin,
          width = this.settings.width - spawnSpaceOrigin,
          height = this.settings.height - spawnSpaceOrigin,
          widthChunks = Math.floor(width / Math.sqrt(numOfBases)),
          heightChunks = Math.floor(height / Math.sqrt(numOfBases));
      var positions = [];

      for (var i = 0; i < Math.sqrt(numOfBases); i++) {
        top = spawnSpaceOrigin;

        for (var j = 0; j < Math.sqrt(numOfBases); j++) {
          var newLeft = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(left, left + widthChunks / numOfBases);
          var newTop = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(top, top + heightChunks / numOfBases);
          positions.push([newLeft, newTop]);
          top += heightChunks;
        }

        left += widthChunks;
      }

      positions.forEach(function (pos) {
        _this.addBase({
          unitCount: 0,
          position: pos,
          growthRate: _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(25, 50) / 100,
          growthCount: _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(25, 51),
          width: _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(45, 70),
          player: {
            type: null,
            color: '#C0C0C0'
          },
          difficulty: _this.difficulty
        });
      });
    }
  }, {
    key: "addUnit",
    value: function addUnit(settings) {
      this.units.push(new _unit_js__WEBPACK_IMPORTED_MODULE_3__["default"](settings));
    }
  }, {
    key: "allObjects",
    value: function allObjects() {
      return [].concat(this.stars, this.bases, this.units, this.players);
    }
  }, {
    key: "swarm",
    value: function swarm(base1, base2) {
      var unitCount = Math.floor(base1.unitCount / 2);
      base1.unitCount = base1.unitCount - unitCount;
      var x = base1.x - 34;
      var y = base1.y - 34;
      var width = base1.width + 69;
      var targetX = base2.x + base2.width / 2;
      var targetY = base2.y + base2.width / 2;

      while (unitCount > 0) {
        var newUnitX = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(x, x + width);
        var newUnitY = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(y, y + width);
        var newVelocity = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].direction([targetX - newUnitX, targetY - newUnitY]);
        var newUnit = new _unit_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
          x: newUnitX,
          y: newUnitY,
          velocity: newVelocity,
          player: base1.player,
          game: this,
          target: base2,
          uniqueId: this.unitsUniqueId
        });
        this.units.push(newUnit);
        this.unitsUniqueId += 1;
        unitCount -= 1;
      }
    }
  }, {
    key: "draw",
    value: function draw(context) {
      var _this$settings = this.settings,
          height = _this$settings.height,
          width = _this$settings.width,
          backgroundColor = _this$settings.backgroundColor;
      context.clearRect(0, 0, width, height);
      context.canvas.width = context.canvas.width;
      context.beginPath();
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);

      if (this.drawGrid) {
        context.strokeStyle = 'gray';

        for (var i = 100; i < this.settings.width; i += 100) {
          context.moveTo(i, 0);
          context.lineTo(i, this.settings.height);
          context.stroke();
        }

        for (var _i = 100; _i < this.settings.height; _i += 100) {
          context.moveTo(0, _i);
          context.lineTo(this.settings.width, _i);
          context.stroke();
        }
      }

      this.allObjects().forEach(function (obj) {
        obj.draw(context);
      });
    }
  }, {
    key: "step",
    value: function step(delta) {
      this.allObjects().forEach(function (obj) {
        obj.step(delta);
      });

      if (this.humanPlayer) {
        if (this.humanPlayer.bases.length <= 0 && !this.alerted) {
          // this.gameOver = true;
          alert('You Lose!');
          this.alerted = true;
        }

        if (this.players.length === 1 && !this.alerted) {
          // this.gameOver = true;
          alert('You Win!');
          this.alerted = true;
        }
      }
    }
  }, {
    key: "remove",
    value: function remove(object) {
      if (object instanceof _unit_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
        this.units.splice(this.units.indexOf(object), 1); // Olivia saves the day
      } else if (object instanceof _player_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
        object.playerDiv.remove();
        this.players.splice(this.players.indexOf(object), 1);
      } else if (object instanceof _base_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        this.bases.splice(this.bases.indexOf(object), 1);
      } else if (object instanceof _star_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        this.stars.splice(this.stars.indexOf(object), 1);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.gameOver = true;
      this.allObjects().forEach(function (obj) {
        return _this2.remove(obj);
      });
    }
  }]);

  return Game;
}();

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameView = /*#__PURE__*/function () {
  function GameView(game, context) {
    _classCallCheck(this, GameView);

    this.game = game;
    this.context = context;
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    this.start = this.start.bind(this);
    this.animate = this.animate.bind(this);
  }

  _createClass(GameView, [{
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      var _this = this;

      key("esc", function () {
        return console.log("Pressed ESC");
      });
      key("a", function () {
        if (_this.game.humanPlayer) {
          if (_this.game.prevClick) {
            _this.game.prevClick.forEach(function (base) {
              base.selected = false;
            });

            _this.game.prevClick = undefined;
          } else {
            _this.game.prevClick = _this.game.humanPlayer.bases;

            _this.game.prevClick.forEach(function (base) {
              base.selected = true;
            });
          }
        }
      });
    }
  }, {
    key: "start",
    value: function start() {
      this.bindKeyHandlers();
      this.lastTime = 0;
      requestAnimationFrame(this.animate);
    }
  }, {
    key: "animate",
    value: function animate(time) {
      if (!this.game.gameOver) {
        var game = this.game,
            context = this.context,
            lastTime = this.lastTime,
            animate = this.animate;
        var timeDelta = time - lastTime;
        game.step(timeDelta);
        game.draw(context);
        lastTime = time;
        requestAnimationFrame(animate);
      }
    }
  }]);

  return GameView;
}();

/* harmony default export */ __webpack_exports__["default"] = (GameView);

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var computerAITypes = {
  0: "Default CPU",
  1: "Aggressive CPU",
  2: "Sneaky CPU",
  3: "Defensive CPU",
  4: "Production CPU"
};
var gameDifficulty = {
  easy: 0.0,
  medium: -20.0,
  hard: -50.00
};

var Player = /*#__PURE__*/function () {
  function Player(options) {
    _classCallCheck(this, Player);

    this.playerName = options.playerName;
    this.humanPlayer = options.humanPlayer;
    if (!options.humanPlayer) this.computerType = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(0, 5);
    this.color = options.color;
    this.bases = [];
    this.unitCount = 0;
    this.attackPower = 0;
    this.game = options.game;
    this.playerDiv;
    this.thoughtProgress = gameDifficulty[this.game.difficulty];
    this.thoughtGrowth = options.thoughtGrowth + _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(0, 10) / 100;
    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);
    this.fillDisplay = this.fillDisplay.bind(this);
    this.computeMoves = this.computeMoves.bind(this);
    this.findWeakestPlayer = this.findWeakestPlayer.bind(this);
    this.findStrongestPlayer = this.findStrongestPlayer.bind(this);
    this.swarm = this.swarm.bind(this);
    this.swarmWeakestBase = this.swarmWeakestBase.bind(this);
    this.aggresiveManuevers = this.aggresiveManuevers.bind(this);
    this.sneakyManuevers = this.sneakyManuevers.bind(this);
    this.slowManuevers = this.slowManuevers.bind(this);
    this.valueManuevers = this.valueManuevers.bind(this);
    this.defaultManuevers = this.defaultManuevers.bind(this);
  }

  _createClass(Player, [{
    key: "fillDisplay",
    value: function fillDisplay() {
      if (this.playerDiv) {
        for (var i = 1; i < this.playerDiv.children.length; i++) {
          var htmlText = void 0;

          switch (i) {
            case 1:
              htmlText = this.humanPlayer ? "Human" : computerAITypes[this.computerType];
              break;

            case 2:
              htmlText = "Bases: " + this.bases.length;
              break;

            case 3:
              htmlText = "Units: " + this.unitCount;
              break;

            case 4:
              htmlText = "Power: " + this.attackPower;
              break;

            default:
              console.log('Out of bounds in Player Div');
              break;
          }

          this.playerDiv.children[i].innerText = htmlText;
        }
      }
    }
  }, {
    key: "swarm",
    value: function swarm(target) {
      var _this = this;

      this.bases.forEach(function (base) {
        return _this.game.swarm(base, target);
      });
    }
  }, {
    key: "swarmWeakestBase",
    value: function swarmWeakestBase(player) {
      this.swarm(player.bases.reduce(function (acc, base) {
        return acc.unitCount < base.unitCount ? acc : base;
      }));
    }
  }, {
    key: "findWeakestPlayer",
    value: function findWeakestPlayer() {
      var _this2 = this;

      var includeSelf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (includeSelf) {
        return this.game.players.reduce(function (acc, player) {
          return acc.attackPower < player.attackPower ? acc : player;
        });
      } else {
        return this.game.players.reduce(function (acc, player) {
          if (acc === _this2) return player;
          if (player === _this2) return acc;
          return acc.attackPower < player.attackPower ? acc : player;
        });
      }
    }
  }, {
    key: "findStrongestPlayer",
    value: function findStrongestPlayer() {
      return this.game.players.reduce(function (acc, player) {
        return acc.attackPower > player.attackPower ? acc : player;
      });
    }
  }, {
    key: "aggresiveManuevers",
    value: function aggresiveManuevers() {
      // Find the weakest player and target their weakest base
      this.swarmWeakestBase(this.findWeakestPlayer(false));
    }
  }, {
    key: "sneakyManuevers",
    value: function sneakyManuevers() {
      var _this3 = this;

      // Find the player with the most favorable bases
      var mostBases = this.game.players.reduce(function (acc, player) {
        if (acc === _this3) return player;
        if (player === _this3) return acc;
        if (acc.bases.length > player.bases.length) return acc;
        if (acc.bases.length === player.bases.length && acc.unitCount < player.unitCount) return acc;
        return player;
      }); // Target the weakest base

      this.swarmWeakestBase(mostBases);
    }
  }, {
    key: "slowManuevers",
    value: function slowManuevers() {
      var _this4 = this;

      var closetBase = this.game.bases.reduce(function (acc, base) {
        if (acc.player === _this4) return base;
        if (base.player === _this4) return acc;
        return _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].distance([_this4.x, _this4.y], [acc.x, acc.y]) < _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].distance([_this4.x, _this4.y], [base.x, base.y]) ? acc : base;
      });

      if (this.attackPower > closetBase.unitCount) {
        this.swarm(closetBase);
      } else {// Do nothing for now
      }
    }
  }, {
    key: "valueManuevers",
    value: function valueManuevers() {
      var _this5 = this;

      var basesWithHighProd = this.game.bases.filter(function (base) {
        return base.player !== _this5 && base.growthCount > 40;
      });

      if (basesWithHighProd.length > 1) {
        var mostDesirableBase = basesWithHighProd.reduce(function (acc, base) {
          return acc.unitCount < base.unitCount ? acc : base;
        });
        this.swarm(mostDesirableBase);
      } else {
        this.defaultManuevers();
      }
    }
  }, {
    key: "defaultManuevers",
    value: function defaultManuevers() {
      var _this6 = this;

      // Determine Current Ranking and decide to Attack or Defend
      var bestPlayer = this.findStrongestPlayer();
      var worstPlayer = this.findWeakestPlayer();
      var weakestBase, strongestBase; // If we are the best player

      if (bestPlayer === this) {
        weakestBase = this.game.bases.reduce(function (acc, base) {
          if (acc.player === _this6) return base;
          if (base.player === _this6) return acc;
          return acc.unitCount < base.unitCount ? acc : base;
        });
        this.swarm(weakestBase);
      } else {
        if (worstPlayer !== this) {// Do nothing
        } else if (this.bases.length > 1) {
          strongestBase = this.bases.reduce(function (acc, base) {
            return acc.unitCount > base.unitCount ? acc : base;
          });
          weakestBase = this.bases.reduce(function (acc, base) {
            return acc.unitCount < base.unitCount ? acc : base;
          });
          this.game.swarm(strongestBase, weakestBase);
        }
      }
    }
  }, {
    key: "computeMoves",
    value: function computeMoves() {
      var _this7 = this;

      this.thoughtProgress = 0.0;

      if (this.game.players.length === 1) {
        var survivors = this.game.bases.filter(function (base) {
          return base.player !== _this7;
        });

        if (survivors.length > 0) {
          survivors.forEach(function (base) {
            return _this7.swarm(base);
          });
        } // Celebration lap
        // if(Util.getRandomArbitrary(0,10) === 7) {
        //   this.swarm(this.bases[Util.getRandomArbitrary(0, this.bases.length)]);
        // }

      } else {
        // Hunt for Neutral Bases
        var neutralBases = this.game.bases.filter(function (base) {
          return base.player.type === null;
        });

        if (neutralBases.length > 0) {
          var target = neutralBases.reduce(function (acc, base) {
            var accDist = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].distance([acc.x, acc.y], [_this7.x, _this7.y]);
            var baseDist = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].distance([base.x, base.y], [_this7.x, _this7.y]);
            return accDist < baseDist ? acc : base;
          });
          this.swarm(target);
        }

        switch (this.computerType) {
          case 1:
            this.aggresiveManuevers();
            break;

          case 2:
            this.sneakyManuevers();
            break;

          case 3:
            this.slowManuevers();
            break;

          case 4:
            this.valueManuevers();
            break;

          default:
            this.defaultManuevers();
            break;
        }
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (this.bases.length > 0) {
        var newUnitCount = this.bases.reduce(function (acc, base) {
          return acc + base.unitCount;
        }, 0);
        this.unitCount = newUnitCount;
        this.attackPower = Math.floor(newUnitCount / 2);
        var average = this.bases.reduce(function (acc, base) {
          return [acc[0] + base.x, acc[1] + base.y];
        }, [0, 0]);
        this.x = average[0] / this.bases.length;
        this.y = average[1] / this.bases.length;
        this.fillDisplay(); // Computers take over here

        if (!this.humanPlayer) {
          this.thoughtProgress += this.thoughtGrowth;
        }

        if (this.thoughtProgress >= 100.00) {
          this.computeMoves();
        }
      } else {
        if (this.game) {
          this.game.remove(this);
        }
      }
    }
  }, {
    key: "draw",
    value: function draw() {// Do nothing
    }
  }]);

  return Player;
}();

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./lib/star.js":
/*!*********************!*\
  !*** ./lib/star.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Star = /*#__PURE__*/function () {
  function Star(height, width) {
    _classCallCheck(this, Star);

    this.x = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(0, width);
    this.y = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(0, height);
    this.color = "rgba(255, 255, 255, ".concat(_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(30, 100) / 100, ")");
    this.radius = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomArbitrary(1, 4);
  }

  _createClass(Star, [{
    key: "step",
    value: function step() {// Do nothing
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
      context.fill();
    }
  }]);

  return Star;
}();

/* harmony default export */ __webpack_exports__["default"] = (Star);

/***/ }),

/***/ "./lib/unit.js":
/*!*********************!*\
  !*** ./lib/unit.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var NORMAL_FRAME_TIME_DELTA = 10000 / 6;
var gameDifficulty = {
  easy: 1.0,
  medium: 1.420,
  hard: 1.69
};

var Unit = /*#__PURE__*/function () {
  function Unit(options) {
    _classCallCheck(this, Unit);

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

  _createClass(Unit, [{
    key: "step",
    value: function step(timeDelta) {
      // timeDelta is number of milliseconds since last move
      // if the computer is busy the time delta will be larger
      // in this case the MovingObject should move farther in this frame
      // velocity of object is how far it should move in 1/60th of a second
      // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      var velocityScale = 2.0 * gameDifficulty[this.game.difficulty];
      var offsetX = this.velocity[0] * velocityScale;
      var offsetY = this.velocity[1] * velocityScale;
      this.x = this.x + offsetX;
      this.y = this.y + offsetY;

      if (this.y > this.target.y && this.y < this.target.y + this.target.width && this.x > this.target.x && this.x < this.target.x + this.target.width) {
        this.remove();

        if (this.player === this.target.player) {
          this.target.unitCount = this.target.unitCount + 1;
        } else {
          if (this.target.unitCount <= 1) {
            if (this.target.player.type !== null) this.target.player.bases.splice(this.target.player.bases.indexOf(this.target), 1);
            this.player.bases.push(this.target);
            this.target.player = this.player;
          } else {
            this.target.unitCount = this.target.unitCount - 1;
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.fillStyle = this.player.color;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
      context.fill();
    }
  }, {
    key: "remove",
    value: function remove() {
      this.game.remove(this);
    }
  }]);

  return Unit;
}();

/* harmony default export */ __webpack_exports__["default"] = (Unit);

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Util = {
  distance: function distance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  },
  length: function length(vector) {
    return Util.distance([0, 0], vector);
  },
  scale: function scale(vector, amount) {
    return [vector[0] * amount, vector[1] * amount];
  },
  direction: function direction(vector) {
    var length = Util.length(vector);
    return Util.scale(vector, 1 / length);
  },
  getRandomArbitrary: function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Util);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
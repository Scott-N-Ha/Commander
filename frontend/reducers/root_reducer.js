import { combineReducers } from 'redux';

import gameReducer from './game_reducer.js';

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;

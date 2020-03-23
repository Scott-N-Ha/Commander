import React from 'react';
import ReactDom from 'react-dom';

import configureStore from './store/store.js';

document.addEventListener("DOMContentLoaded", () => {
  let preloadedState = {};



  const store = configureStore(preloadedState);
  const root = document.getElementById('root');
  ReactDom.render(
    <div>
      React Hooked
    </div>
  , root);
});

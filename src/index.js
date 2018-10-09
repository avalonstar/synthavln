import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'scenes/Root';
import baseStyles from 'styles/foundation';

import configureStore from './store';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

const render = () => {
  baseStyles();
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
};

render();
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'scenes/Root';
import baseStyles from 'styles/foundation';

import registerServiceWorker from './registerServiceWorker';

const render = () => {
  baseStyles();
  ReactDOM.render(<Root />, document.getElementById('root'));
};

render();
registerServiceWorker();

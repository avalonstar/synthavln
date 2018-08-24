import React from 'react';
import ReactDOM from 'react-dom';

import baseStyles from 'helpers/foundation';
import Root from 'scenes/Root';

import registerServiceWorker from './registerServiceWorker';

const render = () => {
  baseStyles();
  ReactDOM.render(<Root />, document.getElementById('root'));
};

render();
registerServiceWorker();

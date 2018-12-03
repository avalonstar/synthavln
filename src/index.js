import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Root from 'scenes/Root';
import BaseStyles from 'styles/foundation';

import configureStore from './store';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <Fragment>
      <BaseStyles />
      <Root store={store} />
    </Fragment>,
    document.getElementById('root')
  );
};

render();
serviceWorker.unregister();

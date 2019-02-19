import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Root from 'scenes/Root';
import BaseStyles from 'styles/foundation';

import * as serviceWorker from './serviceWorker';

const render = () => {
  ReactDOM.render(
    <Fragment>
      <BaseStyles />
      <Root />
    </Fragment>,
    document.getElementById('root')
  );
};

render();
serviceWorker.unregister();

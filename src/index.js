import * as Sentry from '@sentry/browser';

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Root from 'scenes/Root';
import BaseStyles from 'styles/foundation';

import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: 'https://9cd75d9eb6cb4698aa5cdc62e90bcba2@sentry.io/1509428'
});

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

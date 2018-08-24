import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import App from 'scenes/App';

const Main = () => (
  <Switch>
    <Route component={App} />
  </Switch>
);

const Root = () => (
  <ThemeProvider theme={foundation}>
    <Main />
  </ThemeProvider>
);

export default Root;

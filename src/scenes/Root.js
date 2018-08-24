import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { foundation } from 'helpers/foundation';
import App from 'scenes/App';

const Main = () => (
  <Switch>
    <Route component={App} />
  </Switch>
);

const Root = () => (
  <BrowserRouter>
    <ThemeProvider theme={foundation}>
      <Main />
    </ThemeProvider>
  </BrowserRouter>
);

export default Root;

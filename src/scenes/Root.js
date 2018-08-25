import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import App from 'scenes/App';
import Activity from 'scenes/Activity';
import { foundation } from 'styles/foundation';

const Main = () => (
  <Switch>
    <Route exact path="/scenes/activity" component={Activity} />
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

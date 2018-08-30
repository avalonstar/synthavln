import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { ThemeProvider } from 'styled-components';

import App from 'scenes/App';
import Activity from 'scenes/Activity';
import { foundation } from 'styles/foundation';
import { history } from 'store';

const Main = () => (
  <Switch>
    <Route exact path="/scenes/activity" component={Activity} />
    <Route component={App} />
  </Switch>
);

const Root = props => (
  <Provider store={props.store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={foundation}>
        <Main />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default Root;

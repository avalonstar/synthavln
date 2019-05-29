import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { ThemeProvider } from 'styled-components';

import { UI } from 'providers';
import { Activity, Ava, Camera, Sounds } from 'scenes/Activity';
import App from 'scenes/App';
import Interstitial from 'scenes/Interstitial';
import { foundation } from 'styles/foundation';

const history = createBrowserHistory();

const Main = () => (
  <Switch>
    <Route exact path="/scenes/ava" component={Ava} />
    <Route exact path="/scenes/activity/sounds" component={Sounds} />
    <Route exact path="/scenes/activity" component={Activity} />
    <Route exact path="/scenes/camera" component={Camera} />

    <Route
      exact
      path="/scenes/brb"
      render={() => (
        <Interstitial
          title="Be right back"
          subtitle="Enjoy the intermission."
        />
      )}
    />
    <Route
      exact
      path="/scenes/start"
      render={() => (
        <Interstitial
          title="Please stand by"
          subtitle="We'll get back to it soon enough!"
        />
      )}
    />

    <Route component={App} />
  </Switch>
);

function Root() {
  return (
    <Router history={history}>
      <ThemeProvider theme={foundation}>
        <UI.Provider>
          <Main />
        </UI.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default Root;

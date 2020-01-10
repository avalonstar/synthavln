import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { ThemeProvider } from 'styled-components';

import {
  useEventContext,
  useImageryContext,
  useNotificationContext,
  usePoolContext,
  useTrainContext,
  useUIContext
} from 'providers';
import { Ava, Camera, Notifiers, Sounds, Splitscreen } from 'scenes/Activity';
import App from 'scenes/App';
import Interstitial from 'scenes/Interstitial';
import { foundation } from 'styles/foundation';

const history = createBrowserHistory();

const Contexts = () => (
  <useUIContext.Provider>
    <useNotificationContext.Provider>
      <usePoolContext.Provider>
        <useEventContext.Provider>
          <useTrainContext.Provider>
            <useImageryContext.Provider>
              <Main />
            </useImageryContext.Provider>
          </useTrainContext.Provider>
        </useEventContext.Provider>
      </usePoolContext.Provider>
    </useNotificationContext.Provider>
  </useUIContext.Provider>
);

const Main = () => (
  <Switch>
    <Route exact path="/scenes/ava" component={Ava} />
    <Route exact path="/scenes/activity/sounds" component={Sounds} />
    <Route exact path="/scenes/camera" component={Camera} />
    <Route exact path="/scenes/notifiers" component={Notifiers} />
    <Route exact path="/scenes/splitscreen" component={Splitscreen} />

    <Route exact path="/scenes/brb">
      <Interstitial title="Be right back" subtitle="Enjoy the intermission." />
    </Route>
    <Route exact path="/scenes/start">
      <Interstitial
        title="Starting soon"
        subtitle="Welcome! Give me a minute to get settled."
      />
    </Route>

    <Route component={App} />
  </Switch>
);

function Root() {
  return (
    <Router history={history}>
      <ThemeProvider theme={foundation}>
        <Contexts />
      </ThemeProvider>
    </Router>
  );
}

export default Root;

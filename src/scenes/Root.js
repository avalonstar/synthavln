import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { ThemeProvider } from 'styled-components';

import { UIProvider } from 'providers';
import App from 'scenes/App';
import { Activity, Camera, Debug, Sounds } from 'scenes/Activity';
import { foundation } from 'styles/foundation';
import { history } from 'store';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_URI
} = process.env;

firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: REACT_APP_FIREBASE_URI
});

const firestore = firebase.firestore();
const firestoreSettings = { timestampsInSnapshots: true };
firestore.settings(firestoreSettings);

const Main = () => (
  <Switch>
    <Route exact path="/scenes/activity/debug" component={Debug} />
    <Route exact path="/scenes/activity/sounds" component={Sounds} />
    <Route exact path="/scenes/activity" component={Activity} />
    <Route exact path="/scenes/camera" component={Camera} />
    <Route component={App} />
  </Switch>
);

const Root = ({ store }) => (
  <FirestoreProvider firebase={firebase}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={foundation}>
          <UIProvider>
            <Main />
          </UIProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </FirestoreProvider>
);

export default Root;

import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider, Firestore } from 'react-firestore';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { ThemeProvider } from 'styled-components';

import App from 'scenes/App';
import Activity from 'scenes/Activity';
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

const Main = () => (
  <Switch>
    <Route exact path="/scenes/activity" component={Activity} />
    <Route component={App} />
  </Switch>
);

const Root = props => (
  <FirestoreProvider firebase={firebase}>
    <Provider store={props.store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={foundation}>
          <Main />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </FirestoreProvider>
);

export default Root;

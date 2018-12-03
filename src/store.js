import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from 'redux/reducers';

export const history = createHistory();

const configureStore = () => {
  const initialState = {};
  const enhancers = [];
  const middleware = [];

  if (process.env.NODE_ENV === 'development') {
    const { devToolsExtension } = window;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }

    const { logger } = require(`redux-logger`); // eslint-disable-line
    middleware.push(logger);
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(rootReducer, initialState, composedEnhancers);
  return store;
};

export default configureStore;

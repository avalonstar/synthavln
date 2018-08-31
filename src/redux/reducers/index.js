import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import notifications from './notifications';
import ui from './ui';

const rootReducer = combineReducers({
  ui,
  notifications,
  router
});

export default rootReducer;

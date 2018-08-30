import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import ui from './ui';

const rootReducer = combineReducers({
  ui,
  router
});

export default rootReducer;

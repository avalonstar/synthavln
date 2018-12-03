import { combineReducers } from 'redux';

import notifications from './notifications';
import ui from './ui';

const rootReducer = combineReducers({
  ui,
  notifications
});

export default rootReducer;

import { combineReducers } from 'redux';

import * as actions from 'redux/actions/notifications';

const notifications = (state = [], action) => {
  switch (action.type) {
    case actions.EVENT_NOTIFIER_ADD:
      return [...state, action.event];
    case actions.EVENT_NOTIFIER_DELETE:
      return [...state.slice(1)];
    default:
      return state;
  }
};

export default notifications;

export const getNotifications = state => state.notifications;

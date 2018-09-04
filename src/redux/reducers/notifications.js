import * as actions from 'redux/actions/notifications';

const notifications = (state = [], action) => {
  switch (action.type) {
    case actions.NOTIFIER_ADD:
      return [...state, action.event];
    case actions.NOTIFIER_DELETE:
      return [...state.slice(1)];
    default:
      return state;
  }
};

export default notifications;

export const getNotifications = state => state.notifications;

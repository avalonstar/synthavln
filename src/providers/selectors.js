import * as fromNotifications from 'redux/reducers/notifications';

export const getNotifications = state =>
  fromNotifications.getNotifications(state);

import { action } from './utils';

export const EVENT_NOTIFIER_ADD = 'EVENT_NOTIFIER_ADD';
export const EVENT_NOTIFIER_DELETE = 'EVENT_NOTIFIER_DELETE';

export const eventNotifier = {
  add: event => action(EVENT_NOTIFIER_ADD, { event }),
  delete: () => action(EVENT_NOTIFIER_DELETE)
};

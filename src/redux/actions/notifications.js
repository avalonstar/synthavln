import { action } from './utils';

export const NOTIFIER_ADD = 'NOTIFIER_ADD';
export const NOTIFIER_DELETE = 'NOTIFIER_DELETE';

export const notifier = {
  add: event => action(NOTIFIER_ADD, { event }),
  delete: () => action(NOTIFIER_DELETE)
};

/* eslint-disable no-param-reassign */

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((act, type) => {
    act[type] = `${base}_${type}`;
    return act;
  }, {});
}

export function action(type, payload = {}) {
  return { type, ...payload };
}

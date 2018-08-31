import { combineReducers } from 'redux';

const frame = (
  state = {
    currentPage: 1
  },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const ui = combineReducers({
  frame
});

export default ui;

import * as actionTypes from '../utils/actionTypes';

const initialState = false;

const touch = (state = initialState, action) => {
  if (action.type === actionTypes.START_TOUCH) {
    return true;
  }
  if (action.type === actionTypes.END_TOUCH) {
    return false;
  }
  if (action.type === actionTypes.LONG_PRESS) {
    return false;
  }
  return state;
};

export default touch;

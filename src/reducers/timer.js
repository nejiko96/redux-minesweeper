import * as actionTypes from '../actions/actionTypes';

const initialState = {
  value: 0,
};

const timer = (state = initialState, action) => {
  if (action.type === actionTypes.START_GAME) {
    return {
      ...state,
      value: 0,
    };
  } else if (action.type === actionTypes.UPDATE_TIMER) {
    return {
      ...state,
      value: state.value + 1
    };
  } else {
    return state;
  }
};

export default timer;

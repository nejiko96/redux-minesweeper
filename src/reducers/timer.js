import * as actionTypes from '../actions/actionTypes';

const initialState = {
  value: 0,
  intervalId: 0
};

const timer = (state = initialState, action) => {
  if (action.type === actionTypes.START_TIMER) {
    return {
      ...state,
      value: 0,
      intervalId: action.intervalId
    };
  } else if (action.type === actionTypes.STOP_TIMER) {
    return {
      ...state,
      intervalId: 0
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

import * as actionTypes from '../utils/actionTypes';

const initialState = {
  interval: '1s',
  limit: 0,
  value: 0,
};

const timer = (state = initialState, action) => {
  if (action.type === actionTypes.INIT_TIMER) {
    return {
      ...state,
      interval: action.interval,
      limit: action.limit,
    };
  }
  if (
    action.type === actionTypes.INIT_GAME
    || action.type === actionTypes.RESTART_GAME
  ) {
    return {
      ...state,
      value: 0,
    };
  }
  if (action.type === actionTypes.UPDATE_TIMER) {
    return {
      ...state,
      value: state.value + 1,
    };
  }
  return state;
};

export default timer;

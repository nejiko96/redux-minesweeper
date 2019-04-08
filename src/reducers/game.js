import * as actionTypes from '../actions/actionTypes';

const initialState = {
  running: false,
};

const game = (state = initialState, action) => {
  if (action.type === actionTypes.START_GAME) {
    return {
      ...state,
      running: true
    };
  } else if (action.type === actionTypes.STOP_GAME) {
    return {
      ...state,
      running: false
    };
  } else {
    return state;
  }
};

export default game;

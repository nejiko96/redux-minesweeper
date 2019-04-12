import * as actionTypes from '../actions/actionTypes';
import * as gameStatusTypes from '../models/gameStatusTypes';

const initialState = {
  status: gameStatusTypes.READY,
};

const game = (state = initialState, action) => {
  if (action.type === actionTypes.INIT_GAME) {
    return {
      ...state,
      status: gameStatusTypes.READY
    };
  } else if (action.type === actionTypes.START_GAME) {
    return {
      ...state,
      status: gameStatusTypes.RUNNING
    };
  } else if (action.type === actionTypes.STOP_GAME) {
    return {
      ...state,
      status: gameStatusTypes.COMPLETE
    };
  } else {
    return state;
  }
};

export default game;

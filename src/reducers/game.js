import * as actionTypes from '../actions/actionTypes';
import * as gameStatusTypes from '../models/gameStatusTypes';
import MouseEventDispatcher from '../models/MouseEventDispatcher';
import * as gameModel from '../models/gameModel';
import { fillArray2D } from '../utils';

const initialState = {
  status: gameStatusTypes.READY,
  grid: fillArray2D(9, 9, () => 0)
};

const mouseDispatcher = new MouseEventDispatcher(gameModel);

const game = (state = initialState, action) => {
  if (action.type === actionTypes.INIT_GAME) {
    return {
      ...state,
      status: gameStatusTypes.READY
    };
  } else if (action.type === actionTypes.START_GAME) {
    // 廃止予定
    return {
      ...state,
      status: gameStatusTypes.RUNNING
    };
  } else if (action.type === actionTypes.STOP_GAME) {
    // 廃止予定
    return {
      ...state,
      status: gameStatusTypes.COMPLETE
    };
  } else if (
    action.type === actionTypes.DOWN_MOUSE
    && state.status !== gameStatusTypes.COMPLETE
  ) {
    return mouseDispatcher.handleMouseDown(action.ev)(state, action.i, action.j);
  } else if (
    action.type === actionTypes.UP_MOUSE
    && state.status !== gameStatusTypes.COMPLETE
  ) {
    return mouseDispatcher.handleMouseUp(action.ev)(state, action.i, action.j);
  } else if (
    action.type === actionTypes.OVER_MOUSE
    && state.status !== gameStatusTypes.COMPLETE
  ) {
    return mouseDispatcher.handleMouseOver(action.ev)(state, action.i, action.j);
  } else if (
    action.type === actionTypes.OUT_MOUSE
    && state.status !== gameStatusTypes.COMPLETE
  ) {
    return mouseDispatcher.handleMouseOut(action.ev)(state, action.i, action.j);
  } else {
    return state;
  }
};

export default game;

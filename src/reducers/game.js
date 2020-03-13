import * as actionTypes from '../utils/actionTypes';
import MouseEventDispatcher from '../models/MouseEventDispatcher';
import * as gameModel from '../models/gameModel';

const initialState = gameModel.initialValue('easy');
const md = new MouseEventDispatcher(gameModel);

const game = (state = initialState, action) => {
  if (action.type === actionTypes.INIT_GAME) {
    return gameModel.initialValue(
      action.level,
      action.width,
      action.height,
      action.mines,
    );
  }
  if (action.type === actionTypes.RESTART_GAME) {
    return gameModel.initialValue(
      state.level,
      state.width,
      state.height,
      state.mines,
    );
  }
  if (action.type === actionTypes.DOWN_MOUSE) {
    return md.handleMouseDown(action.ev)(state, action.i, action.j);
  }
  if (action.type === actionTypes.UP_MOUSE) {
    return md.handleMouseUp()(state, action.i, action.j);
  }
  if (action.type === actionTypes.OVER_MOUSE) {
    return md.handleMouseOver()(state, action.i, action.j);
  }
  if (action.type === actionTypes.OUT_MOUSE) {
    return md.handleMouseOut()(state, action.i, action.j);
  }
  if (action.type === actionTypes.START_TOUCH) {
    if (gameModel.isHidden(state, action.i, action.j)) {
      return gameModel.handleLeftMouseDown(state, action.i, action.j);
    }
    return gameModel.handleBothMouseDown(state, action.i, action.j);
  }
  if (action.type === actionTypes.END_TOUCH) {
    if (gameModel.isHidden(state, action.i, action.j)) {
      return gameModel.handleLeftMouseUp(state, action.i, action.j);
    }
    return gameModel.handleBothMouseUp(state, action.i, action.j);
  }
  if (action.type === actionTypes.LONG_PRESS) {
    if (gameModel.isHidden(state, action.i, action.j)) {
      return gameModel.handleRightMouseDown(state, action.i, action.j);
    }
    return gameModel.handleBothMouseUp(state, action.i, action.j);
  }
  return state;
};

export default game;

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
      action.mines
    );
  } else if (action.type === actionTypes.RESTART_GAME) {
    return gameModel.initialValue(
      state.level,
      state.width,
      state.height,
      state.mines
    );
  } else if (
    action.type === actionTypes.DOWN_MOUSE
    && gameModel.isEnabled(state)
  ) {
    return md.handleMouseDown(action.ev)(state, action.i, action.j);
  } else if (
    action.type === actionTypes.UP_MOUSE
    && gameModel.isEnabled(state)
  ) {
    return md.handleMouseUp()(state, action.i, action.j);
  } else if (
    action.type === actionTypes.OVER_MOUSE
    && gameModel.isEnabled(state)
  ) {
    return md.handleMouseOver()(state, action.i, action.j);
  } else if (
    action.type === actionTypes.OUT_MOUSE
    && gameModel.isEnabled(state)
  ) {
    return md.handleMouseOut()(state, action.i, action.j);
  } else if (
    action.type === actionTypes.START_TOUCH
    && gameModel.isEnabled(state)
  ) {
    if (gameModel.isHidden(state, action.i, action.j)) {
      return gameModel.handleLeftMouseDown(state, action.i, action.j);
    } else {
      return gameModel.handleBothMouseDown(state, action.i, action.j);
    }
  } else if (
    action.type === actionTypes.END_TOUCH
    && gameModel.isEnabled(state)
  ) {
    if (gameModel.isHidden(state, action.i, action.j)) {
      return gameModel.handleLeftMouseUp(state, action.i, action.j);
    } else {
      return gameModel.handleBothMouseUp(state, action.i, action.j);
    }
  } else if (
    action.type === actionTypes.LONG_PRESS
    && gameModel.isEnabled(state)
  ) {
   if (gameModel.isHidden(state, action.i, action.j)) {
    return gameModel.handleRightMouseDown(state, action.i, action.j);
    } else {
      return gameModel.handleBothMouseUp(state, action.i, action.j);
    }
  } else {
    return state;
  }
};

export default game;

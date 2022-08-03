import { createSlice } from '@reduxjs/toolkit';

import * as gameModel from './models/gameModel';
import wrapModel from './models/mouseEventWrapper';

const wrapper = wrapModel(gameModel);

const buildInitialState = () => {
  const state = { level: 'easy' };
  gameModel.init(state);
  wrapper.init(state);
  return state;
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: buildInitialState(),
  reducers: {
    init: (state, action) => {
      const {
        level,
        width,
        height,
        mines,
      } = action.payload;
      state.level = level;
      state.width = width;
      state.height = height;
      state.mines = mines;
      gameModel.init(state);
      wrapper.init(state);
    },
    restart: (state) => {
      gameModel.init(state);
      wrapper.init(state);
    },
    mouseDown: (state, action) => {
      const { button, row, col } = action.payload;
      wrapper.handleMouseDown(state, button, row, col);
    },
    mouseUp: (state, action) => {
      const { row, col } = action.payload;
      wrapper.handleMouseUp(state, row, col);
    },
    mouseOver: (state, action) => {
      const { row, col } = action.payload;
      wrapper.handleMouseOver(state, row, col);
    },
    mouseOut: (state, action) => {
      const { row, col } = action.payload;
      wrapper.handleMouseOut(state, row, col);
    },
    touchStart: (state, action) => {
      const { row, col } = action.payload;
      if (gameModel.isHidden(state, row, col)) {
        return gameModel.handleLeftMouseDown(state, row, col);
      }
      return gameModel.handleBothMouseDown(state, row, col);
    },
    touchEnd: (state, action) => {
      const { row, col } = action.payload;
      if (gameModel.isHidden(state, row, col)) {
        return gameModel.handleLeftMouseUp(state, row, col);
      }
      return gameModel.handleBothMouseUp(state, row, col);
    },
    longPress: (state, action) => {
      const { row, col } = action.payload;
      if (gameModel.isHidden(state, row, col)) {
        return gameModel.handleRightMouseDown(state, row, col);
      }
      return gameModel.handleBothMouseUp(state, row, col);
    },
  },
});

export const {
  init,
  restart,
  mouseDown,
  mouseUp,
  mouseOver,
  mouseOut,
  touchStart,
  touchEnd,
  longPress,
} = gameSlice.actions;

export const selectGame = (state) => state.game;

export default gameSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import * as gameModel from './models/gameModel';
import wrapModel from './models/mouseEventWrapper';

const wrapper = wrapModel(gameModel);

const initAll = (state) => {
  gameModel.init(state);
  wrapper.init(state);
  state.touch = false;
};

const buildInitialState = () => {
  const state = { level: 'easy' };
  initAll(state);
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
      initAll(state);
    },
    restart: (state) => {
      initAll(state);
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
      state.touch = true;
      gameModel.handleTouchStart(state, row, col);
    },
    touchEnd: (state, action) => {
      const { row, col } = action.payload;
      state.touch = false;
      gameModel.handleTouchEnd(state, row, col);
    },
    longPress: (state, action) => {
      const { row, col } = action.payload;
      state.touch = false;
      gameModel.handleLongPress(state, row, col);
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

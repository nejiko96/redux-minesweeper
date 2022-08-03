import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    lang: 'en',
    theme: 'green',
    cellSize: 32,
    board: {
      level: 'easy',
      width: null,
      height: null,
      mines: null,
    },
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
    changeTheme: (state, action) => {
      state.theme = action.payload.theme;
      state.cellSize = action.payload.cellSize;
    },
    changeLevel: (state, action) => {
      state.board.level = action.payload;
    },
    changeWidth: (state, action) => {
      state.board.width = action.payload;
    },
    changeHeight: (state, action) => {
      state.board.height = action.payload;
    },
    changeMines: (state, action) => {
      state.board.mines = action.payload;
    },
  },
});

export const {
  changeLang,
  changeTheme,
  changeLevel,
  changeWidth,
  changeHeight,
  changeMines,
} = settingsSlice.actions;

export const selectSettings = (state) => state.settings;

export default settingsSlice.reducer;

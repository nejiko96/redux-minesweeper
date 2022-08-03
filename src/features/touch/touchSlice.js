import { createSlice } from '@reduxjs/toolkit';

import { touchStart, touchEnd, longPress } from '../game/gameSlice';

export const touchSlice = createSlice({
  name: 'touch',
  initialState: false,
  extraReducers: (builder) => {
    builder
      .addCase(touchStart, () => true)
      .addCase(touchEnd, () => false)
      .addCase(longPress, () => false);
  },
});

export const selectTouch = (state) => state.touch;

export default touchSlice.reducer;

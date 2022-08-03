import { configureStore } from '@reduxjs/toolkit';

import gameReducer from '../features/game/gameSlice';
import settingsReducer from '../features/settings/settingsSlice';
import touchReducer from '../features/touch/touchSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
    touch: touchReducer,
  },
});

export default store;

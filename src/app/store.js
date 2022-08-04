import { configureStore } from '@reduxjs/toolkit';

import gameReducer from '../features/game/gameSlice';
import settingsReducer from '../features/settings/settingsSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
  },
});

export default store;

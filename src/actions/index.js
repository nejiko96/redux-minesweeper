import * as actionTypes from './actionTypes';

export const onGameStart = () => ({
  type: actionTypes.START_GAME,
});

export const onGameStop = () => ({
  type: actionTypes.STOP_GAME
});

export const onTimerInit = (interval, limit) => ({
  type: actionTypes.INIT_TIMER,
  interval: interval,
  limit: limit,
  value: 0
});

export const onTimerUpdate = () => ({
  type: actionTypes.UPDATE_TIMER
});

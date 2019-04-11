import * as actionTypes from './actionTypes';

export const onGameStart = () => ({
  type: actionTypes.START_GAME,
});

export const onGameStop = () => ({
  type: actionTypes.STOP_GAME
});

export const onTimerUpdate = () => ({
  type: actionTypes.UPDATE_TIMER
});

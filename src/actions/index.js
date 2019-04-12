import * as actionTypes from './actionTypes';

export const onGameInit = () => ({
  type: actionTypes.INIT_GAME,
});

// 廃止予定
export const onGameStart = () => ({
  type: actionTypes.START_GAME,
});

// 廃止予定
export const onGameStop = () => ({
  type: actionTypes.STOP_GAME
});

export const onTimerInit = (interval, limit) => ({
  type: actionTypes.INIT_TIMER,
  interval,
  limit,
  value: 0
});

export const onTimerUpdate = () => ({
  type: actionTypes.UPDATE_TIMER
});

export const onMouseDown = (ev, i, j) => ({
  type: actionTypes.DOWN_MOUSE,
  ev, i, j
});

export const onMouseUp = (i, j) => ({
  type: actionTypes.UP_MOUSE,
  i, j
});

export const onMouseOver = (i, j) => ({
  type: actionTypes.OVER_MOUSE,
  i, j
});

export const onMouseOut = (i, j) => ({
  type: actionTypes.OUT_MOUSE,
  i, j
});

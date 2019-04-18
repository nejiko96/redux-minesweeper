import * as actionTypes from '../utils/actionTypes';

export const onGameInit = (level, width, height, mines) => ({
  type: actionTypes.INIT_GAME,
  level, width, height, mines
});

export const onGameRestart = () => ({
  type: actionTypes.RESTART_GAME,
});

export const onTimerInit = (interval, limit) => ({
  type: actionTypes.INIT_TIMER,
  interval, limit
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

export const onTouchStart = (i, j) => ({
  type: actionTypes.START_TOUCH,
  i, j
});

export const onTouchEnd = (i, j) => ({
  type: actionTypes.END_TOUCH,
  i, j
});

export const onLongPress = (i, j) => ({
  type: actionTypes.LONG_PRESS,
  i, j
});

export const onThemeChange = (theme, cellSize) => ({
  type: actionTypes.CHANGE_THEME,
  theme, cellSize
});

export const onLangChange = (lang) => ({
  type: actionTypes.CHANGE_LANG,
  lang
});

export const onSizeChange = (level, width, height, mines) => ({
  type: actionTypes.CHANGE_SIZE,
  level, width, height, mines
});

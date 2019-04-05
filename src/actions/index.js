import * as actionTypes from 'actionTypes';

export const onStartTimer = (intervalId) => ({
  type: actionTypes.START_TIMER,
  intervalId
});

export const onStopTimer = () => ({
  type: actionTypes.STOP_TIMER
});

export const onUpdateTimer = () => ({
  type: actionTypes.UPDATE_TIMER
});

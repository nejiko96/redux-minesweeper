import * as actionTypes from 'actionTypes';

export const onStartTimer = (span) => ({
  type: actionTypes.START_TIMER,
  span
});

export const onStopTimer = () => ({
  type: actionTypes.STOP_TIMER
});

export const onUpdateTimer = () => ({
  type: actionTypes.UPDATE_TIMER
});

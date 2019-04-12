import * as actions from '../actions';
import TimerModel from '../models/TimerModel';
import * as gameStatusTypes from '../models/gameStatusTypes';

const timerModel = new TimerModel();

export const timerToggleListener = {
  key: 'game.status',
  onChange: (dispatch, state) => {
    if (state.game.status === gameStatusTypes.RUNNING) {
      timerModel.start(
        () => dispatch(actions.onTimerUpdate()),
        state.timer.interval
      );
    } else if (state.game.status === gameStatusTypes.COMPLETE) {
      timerModel.stop();
    }
  }
};

export const timerTimeupListener = {
  key: 'timer.value',
  onChange: (dispatch, state) => {
    if (state.timer.value >= state.timer.limit) {
      timerModel.stop();
    }
  }
};

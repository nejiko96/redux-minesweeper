import { onTimerUpdate } from '../actions';
import TimerModel from '../models/TimerModel';
import { STATUS_RUNNING } from '../models/gameModel';

const timerModel = new TimerModel();

export const timerToggleListener = {
  key: 'game.status',
  onChange: (dispatch, state) => {
    if (state.game.status === STATUS_RUNNING) {
      timerModel.start(
        () => dispatch(onTimerUpdate()),
        state.timer.interval,
      );
    } else {
      timerModel.stop();
    }
  },
};

export const timerTimeupListener = {
  key: 'timer.value',
  onChange: (dispatch, state) => {
    if (state.timer.limit > 0 && state.timer.value >= state.timer.limit) {
      timerModel.stop();
    }
  },
};

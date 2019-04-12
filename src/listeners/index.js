import * as actions from '../actions';
import TimerModel from '../models/TimerModel';
import initSubscriber from 'redux-subscriber';

const timerModel = new TimerModel();

const gameListener = {
  key: 'game.running',
  onChange: (dispatch, state) => {
    if (state.game.running) {
      timerModel.start(
        () => dispatch(actions.onTimerUpdate()),
        state.timer.interval
      );
    } else {
      timerModel.stop();
    }
  }
};

const timeupListener = {
  key: 'timer.value',
  onChange: (dispatch, state) => {
    if (state.timer.value >= state.timer.limit) {
      timerModel.stop();
    }
  }
};

const registerListener = (subscribe, dispatch, listener) => {
  subscribe(listener.key, (state) => {
    // console.log(listener.key);
    // console.log(state);
    listener.onChange(dispatch, state);
  });
};

const registerListeners = (store) => {
  const subscribe = initSubscriber(store);
  registerListener(subscribe, store.dispatch, gameListener);
  registerListener(subscribe, store.dispatch, timeupListener);
};

export default registerListeners;

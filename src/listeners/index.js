import * as actions from '../actions';
import initSubscriber from 'redux-subscriber';

let intervalId = null;

const gameListener = {
  key: 'game.running',
  onChange: (dispatch, state) => {
    if (state.game.running) {
      intervalId = setInterval(() => dispatch(actions.onTimerUpdate()), 1000);
    } else if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};

const timeupListener = {
  key: 'timer.value',
  onChange: (dispatch, state) => {
    if (state.timer.value >= 9 && intervalId !== null ) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};

const registerListener = (subscribe, dispatch, listener) => {
  subscribe(listener.key, (state) => {
    //console.log(listener.key);
    //console.log(state);
    listener.onChange(dispatch, state);
  });
};

const registerListeners = (store) => {
  const subscribe = initSubscriber(store);
  registerListener(subscribe, store.dispatch, gameListener);
  registerListener(subscribe, store.dispatch, timeupListener);
};

export default registerListeners;

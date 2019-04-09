import * as actions from '../actions';
import initSubscriber from 'redux-subscriber';

let intervalId = null;

const gameListener = {
  key: 'game.running',
  initial: false,
  select: (state) => (state.game.running),
  onChange: (dispatch, running) => {
    if (running) {
      dispatch(actions.onTimerReset());
      intervalId = setInterval(() => dispatch(actions.onTimerUpdate()), 1000);
    } else if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};

const registerListener = (subscribe, dispatch, listener) => {
  let currentState = listener.initial;
  subscribe(listener.key, (state) => {
    var nextState = listener.select(state);
    console.log(`state changed ${currentState} -> ${nextState}`);
    if (nextState !== currentState) {
      currentState = nextState;
      listener.onChange(dispatch, currentState);
    }
  });
};

const registerListeners = (store) => {
  const subscribe = initSubscriber(store);
  registerListener(subscribe, store.dispatch, gameListener);
};

export default registerListeners;

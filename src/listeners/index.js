import initSubscriber from 'redux-subscriber';
import * as timerListeners from './timer';

const listeners = {
  ...timerListeners
};

const subscribeAll = (store) => {
  const subscribe = initSubscriber(store);
  const dispatch = store.dispatch;
  for(const key in listeners) {
    const listener = listeners[key];
    subscribe(listener.key, (state) => {
      // console.log(listener.key);
      // console.log(state);
      listener.onChange(dispatch, state);
    });
  }
};

export default subscribeAll;

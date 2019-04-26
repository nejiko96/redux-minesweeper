import { createStore } from 'redux';
import initSubscriber from 'redux-subscriber';

import reducer from './reducers';
import listeners from './listeners';

const subscribeListeners = (store, listeners) => {
  const subscribe = initSubscriber(store);
  const dispatch = store.dispatch;
  for(const key in listeners) {
    const listener = listeners[key];
    subscribe(listener.key, (state) => {
      listener.onChange(dispatch, state);
    });
  }
};

const configureStore = () => {
  const store = createStore(reducer);
  subscribeListeners(store, listeners);
  return store;
};

export default configureStore;

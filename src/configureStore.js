import { createStore } from 'redux';
import initSubscriber from 'redux-subscriber';

import reducer from './reducers';
import listeners from './listeners';

const subscribeListeners = (store, lsnrs) => {
  const subscribe = initSubscriber(store);
  const { dispatch } = store;
  Object.keys(lsnrs).forEach((key) => {
    const lsnr = lsnrs[key];
    subscribe(lsnr.key, (state) => {
      lsnr.onChange(dispatch, state);
    });
  });
};

const configureStore = () => {
  const store = createStore(reducer);
  subscribeListeners(store, listeners);
  return store;
};

export default configureStore;

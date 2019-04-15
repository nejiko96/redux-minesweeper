import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// import './index.css';
import MineSweeperContainer from './containers/MineSweeperContainer';
import reducer from './reducers';
import subscribeAll from './listeners';

const store = createStore(reducer);
subscribeAll(store);

render(
  <Provider store={store}>
    <MineSweeperContainer/>
  </Provider>,
  document.getElementById('root')
);

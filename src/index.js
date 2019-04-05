import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MineSweeperContainer from './containers/MineSweeperContainer';
import reducer from './reducers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <MineSweeperContainer />
  </Provider>,
  document.getElementById('root')
);

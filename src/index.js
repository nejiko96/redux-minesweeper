import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers';
import subscribeAll from './listeners';

// import './index.css';
import App from './App';

const store = createStore(reducer);
subscribeAll(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

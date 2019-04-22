import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Header from './Header';

import reducer from './reducers';
import subscribeAll from './listeners';
import MineSweeperContainer from './containers/MineSweeperContainer';

const store = createStore(reducer);
subscribeAll(store);

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Provider store={store}>
          <MineSweeperContainer />
        </Provider>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers';
import subscribeAll from './listeners';

import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import MineSweeperContainer from './containers/MineSweeperContainer';

const store = createStore(reducer);
subscribeAll(store);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <Provider store={store}>
          <MineSweeperContainer />
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import SettingsContainer from './containers/SettingsContainer';
import MineSweeperContainer from './containers/MineSweeperContainer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <SettingsContainer />
        <p/>
        <MineSweeperContainer />
      </React.Fragment>
    );
  }
}

export default App;

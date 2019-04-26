import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import SettingsContainer from './containers/SettingsContainer';
import MineSweeperContainer from './containers/MineSweeperContainer';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <SettingsContainer />
        <p/>
        <MineSweeperContainer />
      </div>
    );
  }
}

export default withStyles(styles)(App);

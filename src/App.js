import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import GithubCircle from 'mdi-material-ui/GithubCircle';

import reducer from './reducers';
import subscribeAll from './listeners';
import MineSweeperContainer from './containers/MineSweeperContainer';

const store = createStore(reducer);
subscribeAll(store);

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              redux-minesweeper demo
            </Typography>
            <Tooltip title="View source on Github" aria-label="View source on Github">
              <IconButton
                color="inherit"
                aria-label="Github"
                href="https://github.com/nejiko96/redux-minesweeper">
                <GithubCircle />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Provider store={store}>
          <MineSweeperContainer />
        </Provider>
      </div>
    );
  }
}

export default withStyles(styles)(App);

import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import GithubCircle from 'mdi-material-ui/GithubCircle';
import Settings from '@material-ui/icons/Settings';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import SettingsContainer from './containers/SettingsContainer';
import MineSweeperContainer from './containers/MineSweeperContainer';

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }
});

class App extends Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(
            classes.appBar,
            { [classes.appBarShift]: open }
          )}
        >
          <Toolbar _disableGutters={!open}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              redux-minesweeper demo
            </Typography>
            <Tooltip title="View source on Github" aria-label="View source on Github">
              <IconButton
                color="inherit"
                href="https://github.com/nejiko96/redux-minesweeper"
              >
                <GithubCircle fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Change settings" aria-label="Change settings">
              <IconButton
                color="inherit"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <Settings fontSize="large" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <main
          className={classNames(classes.conent, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <MineSweeperContainer />
        </main>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <SettingsContainer />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

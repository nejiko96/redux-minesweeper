import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Github from 'mdi-material-ui/Github';
import Settings from '../features/settings/Settings';
import Minesweeper from '../features/game/Minesweeper';

import styles from './styles';
import { selectSettings } from '../features/settings/settingsSlice';

const useStyles = makeStyles(styles, { withTheme: true });

const App = () => {
  const classes = useStyles();
  const theme = useTheme();

  const settings = useSelector(selectSettings);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(
          classes.appBar,
          { [classes.appBarShift]: open },
        )}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            redux-minesweeper demo page
          </Typography>
          <Tooltip title="View source on Github" aria-label="View source on Github">
            <IconButton
              color="inherit"
              href="https://github.com/nejiko96/redux-minesweeper"
            >
              <Github fontSize="large" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.conent, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Minesweeper settings={settings} />
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Settings />
      </Drawer>
    </div>
  );
};

export default App;

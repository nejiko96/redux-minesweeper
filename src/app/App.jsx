import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import clsx from 'clsx';
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = createTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
    },
  });

  const classes = useStyles();

  const settings = useSelector(selectSettings);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
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
    </ThemeProvider>
  );
};

export default App;

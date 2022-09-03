import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import styles from './styles';
import {
  changeLang,
  changeTheme,
  changeLevel,
  changeWidth,
  changeHeight,
  changeMines,
  selectSettings,
} from './settingsSlice';

const useStyles = makeStyles(styles, { withTheme: true });

const Settings = () => {
  const classes = useStyles();

  const {
    lang,
    theme: { name, size },
    board: { level, width, height, mines },
  } = useSelector(selectSettings);

  const dispatch = useDispatch();

  const handleLangChange = (ev) => dispatch(changeLang(ev.target.value));

  const handleThemeChange = (ev) => {
    const [newName, newSize] = ev.target.value.split('_');
    dispatch(
      changeTheme({
        name: newName,
        size: Number(newSize),
      })
    );
  };

  const handleLevelChange = (ev) => dispatch(changeLevel(ev.target.value));

  const handleWidthChange = (ev) => {
    const newWidth = ev.target.value;
    dispatch(changeWidth(newWidth && Number(newWidth)));
  };

  const handleHeightChange = (ev) => {
    const newHeight = ev.target.value;
    dispatch(changeHeight(newHeight && Number(newHeight)));
  };

  const handleMinesChange = (ev) => {
    const newMines = ev.target.value;
    dispatch(changeMines(newMines && Number(newMines)));
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="lang">Language</InputLabel>
        <Select
          value={lang}
          onChange={handleLangChange}
          inputProps={{ name: 'lang', id: 'lang' }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ja">日本語</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="theme">Theme</InputLabel>
        <Select
          value={`${name}_${size}`}
          onChange={handleThemeChange}
          inputProps={{ name: 'theme', id: 'theme' }}
        >
          <MenuItem value="green_32">green(32px)</MenuItem>
          <MenuItem value="MS_32">MS(32px)</MenuItem>
          <MenuItem value="green_16">green(16px)</MenuItem>
          <MenuItem value="MS_16">MS(16px)</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="level">Level</InputLabel>
        <Select
          value={level}
          onChange={handleLevelChange}
          inputProps={{ name: 'level', id: 'level' }}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>
      </FormControl>
      {level === 'custom' ? (
        <>
          <TextField
            id="width"
            label="Width"
            type="number"
            value={width ?? ''}
            placeholder="9 - 30"
            onChange={handleWidthChange}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="height"
            label="Height"
            type="number"
            value={height ?? ''}
            placeholder="9 - 24"
            onChange={handleHeightChange}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="mines"
            label="Mines"
            type="number"
            value={mines ?? ''}
            placeholder="10 - 999"
            onChange={handleMinesChange}
            className={classes.textField}
            margin="normal"
          />
        </>
      ) : null}
    </>
  );
};

export default Settings;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
      themeStr: 'green_32',
      level: 'easy',
    };
  }

  handleLangChange = (ev) => {
    const { onLangChange } = this.props;
    const lang = ev.target.value;
    this.setState({ lang });
    onLangChange(lang);
  };

  handleThemeChange = (ev) => {
    const { onThemeChange } = this.props;
    const themeStr = ev.target.value;
    this.setState({ themeStr });
    const [theme, cellSizeStr] = themeStr.split('_');
    onThemeChange(theme, parseInt(cellSizeStr, 10));
  };

  handleSizeChange = (newValue) => {
    const { onSizeChange } = this.props;
    this.setState(newValue);
    const newState = {
      ...this.state,
      ...newValue,
    };
    onSizeChange(
      newState.level,
      newState.width && parseInt(newState.width, 10),
      newState.height && parseInt(newState.height, 10),
      newState.mines && parseInt(newState.mines, 10),
    );
  };

  render() {
    const { lang, themeStr, level } = this.state;
    const { width, height, mines } = this.state;
    const { classes } = this.props;
    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="lang">Language</InputLabel>
          <Select
            value={lang}
            onChange={this.handleLangChange}
            inputProps={{ name: 'lang', id: 'lang' }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ja">日本語</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="theme">Theme</InputLabel>
          <Select
            value={themeStr}
            onChange={this.handleThemeChange}
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
            onChange={(ev) => this.handleSizeChange({ level: ev.target.value })}
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
              value={width}
              placeholder="9 - 30"
              onChange={(ev) => this.handleSizeChange({ width: ev.target.value })}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="height"
              label="Height"
              type="number"
              value={height}
              placeholder="9 - 24"
              onChange={(ev) => this.handleSizeChange({ height: ev.target.value })}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="mines"
              label="Mines"
              type="number"
              value={mines}
              placeholder="10 - 999"
              onChange={(ev) => this.handleSizeChange({ mines: ev.target.value })}
              className={classes.textField}
              margin="normal"
            />
          </>
        ) : null}
      </>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.shape.isRequired,
  onThemeChange: PropTypes.func.isRequired,
  onLangChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Settings);

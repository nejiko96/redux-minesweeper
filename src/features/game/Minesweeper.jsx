import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Timer, { timerModes } from './Timer';
import Board from './Board';

import localeGen from './locale';
import stylesGen from './styles';
import {
  init,
  restart,
  selectGame,
} from './gameSlice';
import { gameStatusFlags } from './models/gameModel';

const timerModeTbl = {
  [gameStatusFlags.READY]: timerModes.READY,
  [gameStatusFlags.RUNNING]: timerModes.RUNNING,
  [gameStatusFlags.CLEARED]: timerModes.STOPPED,
  [gameStatusFlags.GAMEOVER]: timerModes.STOPPED,
};

const Minesweeper = ({ settings }) => {
  // disable context menu
  const node = useRef();
  const handleContextMenu = (e) => e.preventDefault();
  useEffect(() => {
    node.current.addEventListener('contextmenu', handleContextMenu);
    return () => node.current.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const {
    lang,
    theme,
    cellSize,
    board: {
      level,
      width,
      height,
      mines,
    },
  } = settings;

  const locale = localeGen(lang);
  const styles = stylesGen(theme, cellSize);

  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  // initialize game when board settings changed
  useEffect(() => {
    dispatch(init({
      level,
      width,
      height,
      mines,
    }));
  }, [level, width, height, mines]);

  const handleRestart = () => dispatch(restart());

  return (
    <div
      style={styles.container}
      ref={node}
    >
      {locale.remain1}
      <span style={styles.counter}>{game.mines - Object.keys(game.markPos).length}</span>
      {locale.remain2}
      <span style={styles.space} />
      {locale.timer1}
      <Timer
        style={styles.timer}
        interval="1s"
        limit={999}
        mode={timerModeTbl[game.status]}
      />
      {locale.timer2}
      <span style={styles.space} />
      {game.status === gameStatusFlags.CLEARED ? locale.cleared : ''}
      <br />
      <Board
        styles={styles}
        grid={game.grid}
        overlay={(game.status & gameStatusFlags.ENABLED) > 0 && game.touch}
      />
      <p />
      <Button
        variant="contained"
        onClick={handleRestart}
      >
        {locale.retry}
      </Button>
    </div>
  );
};

Minesweeper.propTypes = {
  settings: PropTypes.shape({
    lang: PropTypes.string,
    theme: PropTypes.string,
    cellSize: PropTypes.number,
    board: PropTypes.shape({
      level: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      mines: PropTypes.number,
    }),
  }),
};

Minesweeper.defaultProps = {
  settings: {
    lang: 'en',
    theme: 'green',
    cellSize: 32,
    board: {
      level: 'easy',
      width: null,
      height: null,
      mines: null,
    },
  },
};

export default Minesweeper;

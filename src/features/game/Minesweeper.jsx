import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Timer, { TimerModeEnum } from './Timer';
import Board from './Board';
import Cell from './Cell';

import { initLocale } from './locale';
import { initStyles } from './styles';
import {
  init,
  restart,
  mouseDown,
  mouseUp,
  mouseOut,
  mouseOver,
  touchStart,
  touchEnd,
  longPress,
  selectGame,
} from './gameSlice';
import { GameStatusEnum, GameStatusFlags } from './models/gameModel';

const timerModesTbl = {
  [GameStatusEnum.READY]: TimerModeEnum.READY,
  [GameStatusEnum.RUNNING]: TimerModeEnum.RUNNING,
  [GameStatusEnum.CLEARED]: TimerModeEnum.STOPPED,
  [GameStatusEnum.GAMEOVER]: TimerModeEnum.STOPPED,
};

const Minesweeper = ({ settings }) => {
  // disable context menu
  const node = useRef();
  const handleContextMenu = (e) => e.preventDefault();
  useEffect(() => {
    const curNode = node.current;
    curNode.addEventListener('contextmenu', handleContextMenu);
    return () => curNode.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const {
    lang,
    theme,
    board: { level, width, height, mines },
  } = settings;

  const locale = initLocale(lang);
  const styles = initStyles(theme);

  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  // initialize game when board settings changed
  useEffect(() => {
    dispatch(
      init({
        level,
        width,
        height,
        mines,
      })
    );
  }, [level, width, height, mines, dispatch]);

  const handleRestart = () => dispatch(restart());

  const handleMouseDown = (param) => dispatch(mouseDown(param));
  const handleMouseUp = (param) => dispatch(mouseUp(param));
  const handleMouseOver = (param) => dispatch(mouseOver(param));
  const handleMouseOut = (param) => dispatch(mouseOut(param));
  const handleTouchStart = (param) => dispatch(touchStart(param));
  const handleTouchEnd = (param) => dispatch(touchEnd(param));
  const handleLongPress = (param) => dispatch(longPress(param));

  return (
    <div style={styles.container} ref={node}>
      {locale.remain1}
      <span style={styles.counter}>
        {game.mines - Object.keys(game.markPos).length}
      </span>
      {locale.remain2}
      <span style={styles.space} />
      {locale.timer1}
      <Timer
        style={styles.timer}
        interval="1s"
        limit={999}
        mode={timerModesTbl[game.status]}
      />
      {locale.timer2}
      <span style={styles.space} />
      {game.status === GameStatusEnum.CLEARED ? locale.cleared : ''}
      <br />
      <Board
        styles={styles}
        grid={game.grid}
        overlay={(game.status & GameStatusFlags.ENABLED) > 0 && game.touch}
      >
        <Cell
          style={styles.cell}
          row={-1}
          col={-1}
          value={-1}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onLongPress={handleLongPress}
        />
      </Board>
      <p />
      <Button variant="contained" onClick={handleRestart}>
        {locale.retry}
      </Button>
    </div>
  );
};

Minesweeper.propTypes = {
  settings: PropTypes.shape({
    lang: PropTypes.string,
    theme: PropTypes.shape({
      name: PropTypes.string,
      size: PropTypes.number,
    }),
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
    theme: {
      name: 'green',
      size: 32,
    },
    board: {
      level: 'easy',
      width: null,
      height: null,
      mines: null,
    },
  },
};

export default Minesweeper;

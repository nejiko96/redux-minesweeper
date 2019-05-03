import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Timer from '../components/Timer';
import Counter from '../components/Counter';
import Board from '../components/Board';
import Button from '@material-ui/core/Button';

import { addEventListener, removeEventListener } from '../utils';
import { STATUSES_ENABLED, STATUS_CLEARED } from '../models/gameModel'

class Minesweeper extends Component {
  componentDidMount() {
    const { settings, actions } = this.props;
    const { level, width, height, mines } = settings;
    actions.onGameInit(level, width, height, mines);
    addEventListener(this, 'contextmenu', this.handleContextMenu);
  }

  componentDidUpdate(prevProps) {
    const { settings, actions } = this.props;
    const { level, width, height, mines } = settings;
    if (level !== prevProps.settings.level) {
      actions.onGameInit(level, width, height, mines);
    } else if (
      level === 'custom'
      && (
        width !== prevProps.settings.width
        || height !== prevProps.settings.height
        || mines !== prevProps.settings.mines
      )
    ) {
      actions.onGameInit(level, width, height, mines);
    }
  }

  componentWillUnmount() {
    removeEventListener(this, 'contextmenu', this.handleContextMenu);
  }

  render() {
    const { game, timer, styles, locale, touch, actions } = this.props;
    return(
      <div style={styles.container}>
        {locale.remain1}<Counter
          style={styles.counter}
          value={game.mines - Object.keys(game.markPos).length}
          />{locale.remain2}
        <span style={styles.space}/>
        {locale.timer1}<Timer
          style={styles.timer}
          interval="1s"
          limit={999}
          value={timer.value}
          onLoad={actions.onTimerInit}
          />{locale.timer2}
        <span style={styles.space}/>
        {game.status === STATUS_CLEARED ? locale.cleared : ''}
        <br />
        <Board
          styles={styles}
          grid={game.grid}
          overlay={(game.status & STATUSES_ENABLED) && touch}
          actions={actions}
          />
        <p />
        <Button
          variant="contained"
          onClick={actions.onGameRestart}
          >{locale.retry}</Button>
      </div>

    );
  }

  handleContextMenu(e) {
    e.preventDefault();
  }
}

Minesweeper.propTypes = {
  settings: PropTypes.object,
  game: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

Minesweeper.defaultProps = {
  settings: { level: 'easy' },
};

export default Minesweeper;

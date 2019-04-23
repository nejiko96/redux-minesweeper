import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Timer from '../components/Timer';
import Counter from '../components/Counter';
import Board from '../components/Board';
import Button from '@material-ui/core/Button';

import { addEventListener, removeEventListener } from '../utils';
import { STATUS_CLEARED } from '../models/gameModel'

class Body extends Component {
  componentDidMount() {
    const { level, width, height, mines, actions } = this.props;
    actions.onGameInit(level, width, height, mines);
    addEventListener(this, 'contextmenu', this.handleContextMenu);
  }

  componentDidUpdate(prevProps) {
    const { level, width, height, mines, actions } = this.props;
    if (level !== prevProps.level) {
      actions.onGameInit(level, width, height, mines);
    } else if (
      level === 'custom'
      && (
        width !== prevProps.width
        || height !== prevProps.height
        || mines !== prevProps.mines
      )
    ) {
      actions.onGameInit(level, width, height, mines);
    }
  }

  componentWillUnmount() {
    removeEventListener(this, 'contextmenu', this.handleContextMenu);
  }

  render() {
    const { state, actions } = this.props;
    const { game, timer, styles, locale } = state;
    return(
      <div style={styles.body}>
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
        <Board
          styles={styles}
          grid={game.grid}
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

Body.propTypes = {
  level: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  mines: PropTypes.number,
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

Body.defaultProps = {
  level: 'easy',
};

export default Body;

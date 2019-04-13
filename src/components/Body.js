import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Timer from '../components/Timer';
import Counter from '../components/Counter';
import Board from '../components/Board';

import { addEventListener, removeEventListener } from '../utils';
import { CLEARED } from '../models/gameModel'

class Body extends Component {
  componentDidMount() {
    const { width, height, mines, actions } = this.props;
    actions.onGameInit(width, height, mines);
    addEventListener(this, 'contextmenu', this.handleContextMenu);
    addEventListener(this, 'selectstart', this.handleSelectStart);
  }
  componentWillUnmount() {
    removeEventListener(this, 'contextmenu', this.handleContextMenu);
    removeEventListener(this, 'selectstart', this.handleSelectStart);
  }
  render() {
    const { state, actions } = this.props;
    const { game, timer, styles } = state;
    return(
      <div style={styles.body}>
        あと<Counter
          style={styles.counter}
          value={game.mines - Object.keys(game.markPos).length}
          />個
        <span style={styles.space}/>
        <Timer
          style={styles.timer}
          interval="1s"
          limit={999}
          value={timer.value}
          onLoad={actions.onTimerInit}
          />秒経過
        <span style={styles.space}/>
        {game.status === CLEARED ? 'クリア！' : ''}
        <Board
          styles={styles}
          grid={game.grid}
          onMouseDown={actions.onMouseDown}
          onMouseUp={actions.onMouseUp}
          onMouseOver={actions.onMouseOver}
          onMouseOut={actions.onMouseOut}
          />
        <button
          type="button"
          style={styles.restart}
          onClick={actions.onGameRestart}
          >もう一回？</button>
      </div>
    );
  }
  handleContextMenu(e) {
    e.preventDefault();
  }
  handleSelectStart(e) {
    e.preventDefault();
  }
}

Body.propTypes = {
  // level: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
  //lang: PropTypes.string,
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

Body.defaultProps = {
  // level: 'easy',
  //lang: 'en'
};

export default Body;

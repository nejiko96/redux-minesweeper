import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import Control from '../components/Control';
import Timer from '../components/Timer';
import Counter from '../components/Counter';
import Board from '../components/Board';

import styles from '../styles';
import { addEventListener, removeEventListener } from '../utils';
import * as gameStatusTypes from '../models/gameStatusTypes';

class MineSweeperContainer extends Component {
  componentDidMount() {
    addEventListener(this, 'contextmenu', this.handleContextMenu);
    addEventListener(this, 'selectstart', this.handleSelectStart);
  }
  componentWillUnmount() {
    removeEventListener(this, 'contextmenu', this.handleContextMenu);
    removeEventListener(this, 'selectstart', this.handleSelectStart);
  }
  render() {
    const { game, timer, actions } = this.props;
    return(
      <div style={styles.container}>
        <Control />
        <p/>
        <div style={styles.body}>
          あと<Counter
            value={999}
            />個
          <span style={styles.space}/>
          <Timer
            interval="1s"
            limit={999}
            value={timer.value}
            onLoad={actions.onTimerInit}
            />秒経過
          <span style={styles.space}/>
          クリア！
          <Board
            grid={game.grid}
            onMouseDown={actions.onMouseDown}
            onMouseUp={actions.onMouseUp}
            onMouseOver={actions.onMouseOver}
            onMouseOut={actions.onMouseOut}
            />
          {game.status === gameStatusTypes.RUNNING ?
            <button
              type="button"
              style={styles.restart}
              onClick={actions.onGameStop}
              >停止</button>
          :
            <button
              type="button"
              style={styles.restart}
              onClick={actions.onGameStart}
              >開始</button>
          }
        </div>
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

const mapState = (state, ownProps) => ({
  // return stateでもよさそう
  game: state.game,
  timer: state.timer,
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(MineSweeperContainer);

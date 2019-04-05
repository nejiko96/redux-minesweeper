import React, { Component } from 'react';
import Control from '../components/Control';
import Timer from '../components/Timer';
import Counter from '../components/Counter';
import Board from '../components/Board';

import styles from '../styles';

class MineSweeperContainer extends Component {
  render() {
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
            />秒経過
          <span style={styles.space}/>
          クリア！
          <Board
            width={9}
            height={9}
            mines={9}
            />
          <button
            type="button"
            style={styles.restart}
            >もう一回？</button>
        </div>
      </div>
    );
  }
}

export default MineSweeperContainer;

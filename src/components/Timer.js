import React, { Component } from 'react';
import styles from '../styles';

class Timer extends Component {
  componentDidMount() {
    const { interval, limit, onLoad } = this.props;
    onLoad(interval, limit);
  }
  render() {
    const { value } = this.props;
    return (
      <span style={styles.timer} >{value}</span>
    );
  }
}

export default Timer;

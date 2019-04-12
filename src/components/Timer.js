import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

Timer.propTypes = {
  interval: PropTypes.string,
  limit: PropTypes.number,
  onLoad: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

Timer.defaultProps = {
  interval: '1s',
  limit: 0,
};

export default Timer;

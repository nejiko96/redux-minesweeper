import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  componentDidMount() {
    const { interval, limit, onLoad } = this.props;
    onLoad(interval, limit);
  }

  render() {
    const { style, value } = this.props;
    return (
      <span style={style}>{value}</span>
    );
  }
}

Timer.propTypes = {
  style: PropTypes.shape({}).isRequired,
  interval: PropTypes.string,
  limit: PropTypes.number,
  value: PropTypes.number.isRequired,
  onLoad: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  interval: '1s',
  limit: 0,
};

export default Timer;

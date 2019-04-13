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
      <span style={style} >{value}</span>
    );
  }
}

Timer.propTypes = {
  interval: PropTypes.string,
  limit: PropTypes.number,
  onLoad: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
};

Timer.defaultProps = {
  interval: '1s',
  limit: 0,
};

export default Timer;

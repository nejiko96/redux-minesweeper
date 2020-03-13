import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ style, value }) => (
  <span style={style}>{value}</span>
);

Counter.propTypes = {
  style: PropTypes.shape({}).isRequired,
  value: PropTypes.number.isRequired,
};

export default Counter;

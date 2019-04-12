import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';

const Counter = ({ value }) => (
  <span style={styles.counter} >{value}</span>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired
};

export default Counter;

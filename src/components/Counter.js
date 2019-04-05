import React from 'react';
import styles from '../styles';

const Counter = (props) => (
  <span style={styles.counter} >{props.value}</span>
);

export default Counter;

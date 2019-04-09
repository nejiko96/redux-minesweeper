import React from 'react';
import styles from '../styles';

const Timer = (props) => (
  <span style={styles.timer} >{props.value}</span>
);

export default Timer;

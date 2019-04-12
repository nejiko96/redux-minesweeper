import React from 'react';
import styles from '../styles';

const Cell = ({ value, onMouseDown, onMouseUp, onMouseOver, onMouseOut }) => (
  <span
    style={styles.cell[value]}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    />
);

export default Cell;

import React from 'react';
import Cell from './Cell';
import styles from '../styles';
import utils from '../utils';

const Board = (props) => (
  <div style={styles.cells}>
  {utils.fillArray2D(9, 9, () => {}).map((row, i) =>
    row.map((cell, j) =>
      <Cell />
    ).concat(<br/>)
  )}
  </div>
);


export default Board;

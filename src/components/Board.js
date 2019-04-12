import React from 'react';
import Cell from './Cell';
import styles from '../styles';

const Board = ({ grid, actions }) => (
  <div style={styles.cells}>
  {grid.map((row, i) => row.map((value, j) =>
      <Cell
        key={`${i}_${j}`}
        value={value}
        onMouseDown={(ev) => actions.onMouseDown(ev, i, j)}
        onMouseUp={() => actions.onMouseUp(i, j)}
        onMouseOver={() => actions.onMouseOver(i, j)}
        onMouseOut={() => actions.onMouseOut(i, j)}
        />
    ).concat(<br/>)
  )}
  </div>
);


export default Board;

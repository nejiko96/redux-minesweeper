import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

const Board = ({
  styles,
  grid,
  onMouseDown,
  onMouseUp,
  onMouseOver,
  onMouseOut
 }) => (
  <div style={styles.cells}>
  {grid.map((row, i) => row.map((value, j) =>
      <Cell
        key={`${i}_${j}`}
        style={styles.cell}
        value={value}
        onMouseDown={(ev) => onMouseDown(ev, i, j)}
        onMouseUp={() => onMouseUp(i, j)}
        onMouseOver={() => onMouseOver(i, j)}
        onMouseOut={() => onMouseOut(i, j)}
        />
    ).concat(<br/>)
  )}
  </div>
);

Board.propTypes = {
  styles: PropTypes.object.isRequired,
  grid: PropTypes.arrayOf(PropTypes.array).isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
};

export default Board;

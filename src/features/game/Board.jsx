import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

const Board = ({
  styles, grid, overlay,
}) => (
  <div style={styles.board}>
    <div style={styles.cells}>
      { /* eslint-disable react/no-array-index-key */
        grid.map((arr, i) => arr.map((value, j) => (
          <Cell
            key={`${i}_${j}`}
            style={styles.cell}
            row={i}
            col={j}
            value={value}
          />
        )).concat(<br key={i} />))
        /* eslint-enable react/no-array-index-key */
      }
    </div>
    { overlay ? <div style={styles.cellsOverlay} /> : null }
  </div>
);

Board.propTypes = {
  styles: PropTypes.shape({
    board: PropTypes.shape({}),
    cells: PropTypes.shape({}),
    cell: PropTypes.arrayOf(PropTypes.shape({})),
    cellsOverlay: PropTypes.shape({}),
  }).isRequired,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  overlay: PropTypes.bool.isRequired,
};

export default Board;

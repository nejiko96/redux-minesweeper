import React from 'react';
import PropTypes from 'prop-types';

const Board = ({ styles, grid, overlay, children }) => (
  <div style={styles.board}>
    <div style={styles.cells}>
      {
        /* eslint-disable react/no-array-index-key */
        grid.map((arr, i) =>
          arr
            .map((value, j) =>
              React.cloneElement(children, {
                key: `${i}_${j}`,
                row: i,
                col: j,
                value,
              })
            )
            .concat(<br key={i} />)
        )
        /* eslint-enable react/no-array-index-key */
      }
    </div>
    {overlay ? <div style={styles.cellsOverlay} /> : null}
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
  children: PropTypes.node.isRequired,
};

export default Board;

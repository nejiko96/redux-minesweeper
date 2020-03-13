import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

const Board = ({
  styles, grid, overlay, actions,
}) => (
  <div style={styles.board}>
    <div style={styles.cells}>
      {grid.map((row, i) => row.map((value, j) => (
        <Cell
          // eslint-disable-next-line react/no-array-index-key
          key={`${i}_${j}`}
          style={styles.cell}
          value={value}
          onMouseDown={(ev) => actions.onMouseDown(ev, i, j)}
          onMouseUp={() => actions.onMouseUp(i, j)}
          onMouseOver={() => actions.onMouseOver(i, j)}
          onMouseOut={() => actions.onMouseOut(i, j)}
          onTouchStart={() => actions.onTouchStart(i, j)}
          onTouchEnd={() => actions.onTouchEnd(i, j)}
          onLongPress={() => actions.onLongPress(i, j)}
          onFocus={() => undefined}
          onBlur={() => undefined}
        />
      )).concat(<br key={i.toString()} />))}
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
  actions: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    onMouseOut: PropTypes.func.isRequired,
    onTouchStart: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
    onLongPress: PropTypes.func.isRequired,
  }).isRequired,
};

export default Board;

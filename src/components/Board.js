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
        />
      )).concat(<br key={i.toString()} />))}
    </div>
    { overlay ? <div style={styles.cellsOverlay} /> : null }
  </div>
);

Board.propTypes = {
  styles: PropTypes.shape({}).isRequired,
  grid: PropTypes.arrayOf(PropTypes.array).isRequired,
  overlay: PropTypes.bool.isRequired,
  actions: PropTypes.shape({}).isRequired,
};

export default Board;

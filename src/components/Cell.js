import React from 'react';
import PropTypes from 'prop-types';
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

Cell.propTypes = {
  // value: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired
};

export default Cell;

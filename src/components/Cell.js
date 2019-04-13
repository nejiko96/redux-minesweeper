import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';
import { styleIdx } from '../models/cellModel';

const Cell = ({ value, onMouseDown, onMouseUp, onMouseOver, onMouseOut }) => (
  <span
    style={styles.cell[styleIdx(value)]}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    />
);

Cell.propTypes = {
  value: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired
};

export default Cell;

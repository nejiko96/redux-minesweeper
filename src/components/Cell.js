import React from 'react';
import PropTypes from 'prop-types';
import { styleIdx } from '../models/cellModel';

const Cell = ({ style, value, onMouseDown, onMouseUp, onMouseOver, onMouseOut }) => (
  <span
    style={style[styleIdx(value)]}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    />
);

Cell.propTypes = {
  style: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired
};

export default Cell;

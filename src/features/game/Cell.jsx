import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { styleIdx } from './models/cellModel';

const Cell = ({
  style,
  row,
  col,
  value,
  onMouseDown,
  onMouseUp,
  onMouseOut,
  onMouseOver,
  onTouchStart,
  onTouchEnd,
  onLongPress,
}) => {
  const [touched, setTouched] = useState(false);

  const handleMouseDown = (ev) => onMouseDown({ button: ev.button, row, col });
  const handleMouseUp = () => onMouseUp({ row, col });
  const handleMouseEnter = () => onMouseOver({ row, col });
  const handleMouseLeave = () => onMouseOut({ row, col });

  const handleTouchStart = () => {
    // console.log('handleTouchStart');
    onTouchStart({ row, col });
    setTouched(true);
  };

  const handleTouchEnd = (ev) => {
    // console.log('handleTouchEnd');
    if (touched) {
      setTouched(false);
      onTouchEnd({ row, col });
    }
    ev.preventDefault(); // disable double tap zoom
  };

  useEffect(() => {
    // console.log('touched', touched);
    let timerId = null;
    if (touched) {
      timerId = setTimeout(() => {
        // console.log('detected longpress');
        setTouched(false);
        onLongPress({ row, col });
      }, 300);
    }
    return () => clearTimeout(timerId);
  }, [row, col, touched, onLongPress]);

  return (
    <span
      style={style[styleIdx(value)]}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onFocus={() => undefined}
      onBlur={() => undefined}
      role="button"
      aria-label="cell"
      tabIndex="-1"
    />
  );
};

Cell.propTypes = {
  style: PropTypes.arrayOf(PropTypes.shape).isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired,
};

export default Cell;

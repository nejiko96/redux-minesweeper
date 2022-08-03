import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  mouseDown,
  mouseUp,
  mouseOver,
  mouseOut,
  touchStart,
  touchEnd,
  longPress,
} from './gameSlice';

import { styleIdx } from './models/cellModel';

const Cell = ({
  style,
  row,
  col,
  value,
}) => {
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();

  const handleMouseDown = (ev) => dispatch(mouseDown({ button: ev.button, row, col }));
  const handleMouseUp = () => dispatch(mouseUp({ row, col }));
  const handleMouseOver = () => dispatch(mouseOver({ row, col }));
  const handleMouseOut = () => dispatch(mouseOut({ row, col }));

  const handleTouchStart = () => {
    // console.log('handleTouchStart');
    dispatch(touchStart({ row, col }));
    setTouched(true);
  };

  const handleTouchEnd = (ev) => {
    // console.log('handleTouchEnd');
    setTouched(false);
    dispatch(touchEnd({ row, col }));
    ev.preventDefault(); // disable double tap zoom
  };

  useEffect(() => {
    // console.log('touched', touched);
    let timerId = null;
    if (touched) {
      timerId = setTimeout(() => {
        // console.log('detected longpress');
        setTouched(false);
        dispatch(longPress({ row, col }));
      }, 300);
    }
    return () => clearTimeout(timerId);
  }, [touched]);

  return (
    <span
      style={style[styleIdx(value)]}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
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
};

export default Cell;

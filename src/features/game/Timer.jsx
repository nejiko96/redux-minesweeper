import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const TimerModeEnum = {
  READY: 'ready',
  RUNNING: 'running',
  STOPPED: 'stopped',
};

const timeUnitTbl = {
  ms: 1,
  s: 1000,
};

const timeParse = (value) => {
  const result = /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/.exec(value.trim());
  const num = (result[1] && parseFloat(result[1])) || 1000;
  const mult = (result[2] && timeUnitTbl[result[2]]) || 1;
  return num * mult;
};

const Timer = ({
  style,
  interval,
  limit,
  mode,
}) => {
  const [count, setCount] = useState(0);
  const intervalMs = timeParse(interval);
  const innerMode = (
    mode === TimerModeEnum.RUNNING
    && limit > 0
    && count >= limit
  ) ? TimerModeEnum.STOPPED : mode;

  // update counter
  const update = (newCount) => {
    // console.log('updateCount', 'count', count, 'newCount', newCount);
    setCount(newCount === undefined ? count + 1 : newCount);
  };

  // hold latest version of update function
  const updateRef = useRef(null);
  useEffect(() => {
    updateRef.current = update;
  }, [update]);

  useEffect(() => {
    let intervalId = null;
    if (innerMode === TimerModeEnum.READY) {
      // console.log('timer ready');
      updateRef.current(0);
    } else if (innerMode === TimerModeEnum.RUNNING) {
      // console.log('timer running');
      intervalId = setInterval(() => updateRef.current(), intervalMs);
    } else {
      // console.log('timer stopped');
    }
    return () => clearInterval(intervalId);
  }, [innerMode]);

  return (
    <span style={style}>{count}</span>
  );
};

Timer.propTypes = {
  style: PropTypes.shape({}),
  interval: PropTypes.string,
  limit: PropTypes.number,
  mode: PropTypes.oneOf(Object.values(TimerModeEnum)),
};

Timer.defaultProps = {
  style: {},
  interval: '1s',
  limit: 0,
  mode: TimerModeEnum.READY,
};

export { TimerModeEnum };
export default Timer;

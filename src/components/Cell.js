import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { styleIdx } from '../models/cellModel';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = { timeoutId: null };
  }

  handleTouchStart = () => {
    const { timeoutId } = this.state;
    const { onTouchStart } = this.props;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      this.setState({ timeoutId: null });
    }
    onTouchStart();
    this.setState({ timeoutId: setTimeout(this.handleLongPress, 300) });
  };

  handleTouchEnd = (ev) => {
    const { timeoutId } = this.state;
    const { onTouchEnd } = this.props;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      this.setState({ timeoutId: null });
      onTouchEnd();
    }
    ev.preventDefault();
  };

  handleLongPress = () => {
    const { timeoutId } = this.state;
    const { onLongPress } = this.props;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      this.setState({ timeoutId: null });
      onLongPress();
    }
  };

  render() {
    const { style, value } = this.props;
    const {
      onMouseDown, onMouseUp, onMouseOver, onMouseOut,
    } = this.props;
    return (
      <span
        style={style[styleIdx(value)]}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onFocus={onMouseOver}
        onMouseOut={onMouseOut}
        onBlur={onMouseOut}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        role="button"
        aria-label="cell"
        tabIndex="-1"
      />
    );
  }
}

Cell.propTypes = {
  style: PropTypes.arrayOf(PropTypes.shape).isRequired,
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

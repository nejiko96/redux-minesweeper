import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { styleIdx } from '../models/cellModel';

class Cell extends Component {

  state = { timeoutId: null };

  render() {
    const { style, value } = this.props;
    const { onMouseDown, onMouseUp, onMouseOver, onMouseOut } = this.props;
    return(
      <span
        style={style[styleIdx(value)]}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        />
    );
  }

  handleTouchStart = (ev) => {
    if (this.state.timeoutId !== null) {
      clearTimeout(this.state.timeoutId);
      this.setState({ timeoutId: null });
    }
    this.props.onTouchStart();
    this.setState({ timeoutId: setTimeout(this.handleLongPress, 300) });
  };

  handleTouchEnd = (ev) => {
    if (this.state.timeoutId !== null) {
      clearTimeout(this.state.timeoutId);
      this.setState({ timeoutId: null });
      this.props.onTouchEnd();
    }
    ev.preventDefault();
  };

  handleLongPress = (ev) => {
    if (this.state.timeoutId !== null) {
      clearTimeout(this.state.timeoutId);
      this.setState({ timeoutId: null });
      this.props.onLongPress();
    }
  };
}

Cell.propTypes = {
  style: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired
};

export default Cell;

import { noop } from '../utils';

const EVENT_MOUSE_DOWN = 0;
const EVENT_MOUSE_UP = 1;
const EVENT_MOUSE_OVER = 2;
const EVENT_MOUSE_OUT = 3;

const BUTTON_LEFT = 1;
const BUTTON_RIGHT = 2;


class MouseEventDispatcher {
  constructor(target) {
    this.pressed = 0;
    this.table = [
      [
        target.handleLeftMouseDown,
        target.handleRightMouseDown,
        target.handleBothMouseDown,
      ],
      [
        target.handleLeftMouseUp,
        target.handleRightMouseUp,
        target.handleBothMouseUp,
      ],
      [
        target.handleLeftMouseOver,
        target.handleRightMouseOver,
        target.handleBothMouseOver,
      ],
      [
        target.handleLeftMouseOut,
        target.handleRightMouseOut,
        target.handleBothMouseOut,
      ],
    ];
  }

  dispatch(e, b) {
    return this.table[e][b - 1];
  }

  handleMouseDown(ev) {
    this.pressed |= {
      0: BUTTON_LEFT,
      2: BUTTON_RIGHT,
    }[ev.button];
    return this.dispatch(EVENT_MOUSE_DOWN, this.pressed);
  }

  handleMouseUp() {
    if (this.pressed === 0) {
      return noop;
    }
    const { pressed } = this;
    this.pressed = 0;
    return this.dispatch(EVENT_MOUSE_UP, pressed);
  }

  handleMouseOver() {
    if (this.pressed === 0) {
      return noop;
    }
    return this.dispatch(EVENT_MOUSE_OVER, this.pressed);
  }

  handleMouseOut() {
    if (this.pressed === 0) {
      return noop;
    }
    return this.dispatch(EVENT_MOUSE_OUT, this.pressed);
  }
}

export default MouseEventDispatcher;

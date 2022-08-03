import { noop } from '../utils';

// mouse events
const EVENT_MOUSE_DOWN = 0;
const EVENT_MOUSE_UP = 1;
const EVENT_MOUSE_OVER = 2;
const EVENT_MOUSE_OUT = 3;

// mouse buttons
const BUTTON_LEFT = 1;
const BUTTON_RIGHT = 2;

// ev.button -> state.pressed value
const PRESSED_TBL = {
  0: BUTTON_LEFT,
  2: BUTTON_RIGHT,
};

const DISPATCH_TBL = (model) => [
  [
    noop,
    model.handleLeftMouseDown,
    model.handleRightMouseDown,
    model.handleBothMouseDown,
  ],
  [
    noop,
    model.handleLeftMouseUp,
    model.handleRightMouseUp,
    model.handleBothMouseUp,
  ],
  [
    noop,
    model.handleLeftMouseOver,
    model.handleRightMouseOver,
    model.handleBothMouseOver,
  ],
  [
    noop,
    model.handleLeftMouseOut,
    model.handleRightMouseOut,
    model.handleBothMouseOut,
  ],
];

const wrapModel = (model) => ({
  init: (state) => { state.pressed = 0; },
  handleMouseDown: (state, button, i, j) => {
    state.pressed |= PRESSED_TBL[button];
    DISPATCH_TBL(model)[EVENT_MOUSE_DOWN][state.pressed](state, i, j);
  },
  handleMouseUp: (state, i, j) => {
    if (state.pressed === 0) return;
    const pressedOld = state.pressed;
    state.pressed = 0;
    DISPATCH_TBL(model)[EVENT_MOUSE_UP][pressedOld](state, i, j);
  },
  handleMouseOver: (state, i, j) => {
    if (state.pressed === 0) return;
    DISPATCH_TBL(model)[EVENT_MOUSE_OVER][state.pressed](state, i, j);
  },
  handleMouseOut: (state, i, j) => {
    if (state.pressed === 0) return;
    DISPATCH_TBL(model)[EVENT_MOUSE_OUT][state.pressed](state, i, j);
  },
});

export default wrapModel;

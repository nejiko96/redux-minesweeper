import { noop } from '../utils';

// mouse events
const EventEnum = {
  MOUSE_DOWN: 0,
  MOUSE_UP: 1,
  MOUSE_OVER: 2,
  MOUSE_OUT: 3,
};

// ev.button values
const EvBtnEnum = {
  LEFT: 0,
  RIGHT: 2,
};

// state.pressed values
const PressedEnum = {
  LEFT: 1,
  RIGHT: 2,
};

// ev.button -> state.pressed value
const pressedTbl = {
  [EvBtnEnum.LEFT]: PressedEnum.LEFT,
  [EvBtnEnum.RIGHT]: PressedEnum.RIGHT,
};

const makeDispatch = (model) => [
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

const makeWrapper = (model) => ({
  dispatch: makeDispatch(model),
  initState() {
    return { pressed: 0 };
  },
  handleMouseDown(state, button, ...args) {
    state.pressed |= pressedTbl[button];
    this.dispatch[EventEnum.MOUSE_DOWN][state.pressed](state, ...args);
  },
  handleMouseUp(state, ...args) {
    if (state.pressed === 0) return;
    const pressedOld = state.pressed;
    state.pressed = 0;
    this.dispatch[EventEnum.MOUSE_UP][pressedOld](state, ...args);
  },
  handleMouseOver(state, ...args) {
    if (state.pressed === 0) return;
    this.dispatch[EventEnum.MOUSE_OVER][state.pressed](state, ...args);
  },
  handleMouseOut(state, ...args) {
    if (state.pressed === 0) return;
    this.dispatch[EventEnum.MOUSE_OUT][state.pressed](state, ...args);
  },
});

export { makeWrapper };

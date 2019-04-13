const FLAG_HIDDEN = 0x001;
const FLAG_MINE = 0x002;
const FLAG_MARKED = 0x004;
const FLAG_MAIN = 0x007;

const FLAG_OPEN_EXPLODED = 0x008;
const FLAG_OPEN_HINT = 0x0F0;
const FLAG_HID_PRESSED = 0x100;
const FLAG_HID_PENDING = 0x200;

const STYLE_HIDDEN = 0;
const STYLE_MARKED = 1;
const STYLE_PENDING = 2;
const STYLE_PRESSED = 3;
const STYLE_OPEN = 3;
const STYLE_MINE = 12;
const STYLE_EXPLOSION = 13;
const STYLE_MISTAKE = 14;

export const RESULT_NONE = 0;
export const RESULT_OPENED = 1;
export const RESULT_EXPLODED = 2;
export const RESULT_MARKED = 4;
export const RESULT_UNMARKED = 8;

export const initialValue = () => (FLAG_HIDDEN);

export const styleIdx = (f) => {
  if (f & FLAG_MARKED) {
    return (f & FLAG_MAIN) === FLAG_MARKED ? STYLE_MISTAKE : STYLE_MARKED
  }
  if (f & FLAG_HIDDEN) {
    return f & FLAG_HID_PRESSED ? STYLE_PRESSED :
      f & FLAG_HID_PENDING ? STYLE_PENDING : STYLE_HIDDEN;
  }
  if (f & FLAG_MINE) {
    return f & FLAG_OPEN_EXPLODED ? STYLE_EXPLOSION : STYLE_MINE;
  }
  return STYLE_OPEN + getHint(f);
};

export const putMine = (f) => (f | FLAG_MINE);

export const press = (f) => (f | FLAG_HID_PRESSED);

export const release = (f) => (f & ~FLAG_HID_PRESSED);

export const toggleMark = (f) => {
  // already opened
  if (!(f & FLAG_HIDDEN)) {
    return { f, result: RESULT_NONE };
  }
  // marked -> pending
  if (f & FLAG_MARKED) {
    return {
      f: (f & ~FLAG_MARKED) | FLAG_HID_PENDING,
      result: RESULT_UNMARKED
    };
  }
  // pending -> not marked
  if (f & FLAG_HID_PENDING) {
    return {
      f: f & ~FLAG_HID_PENDING,
      result: RESULT_NONE
    };
  }
  // not marked -> marked
  return {
    f: f | FLAG_MARKED,
    result: RESULT_MARKED
  };
};

export const forceMark = (f) => ((f & ~FLAG_HID_PENDING) | FLAG_MARKED)

export const open = (f, byClick = true) => {
  // already opened
  if (!(f & FLAG_HIDDEN)) {
    return { f, result: RESULT_NONE };
  }
  // ignore if clicked on mark
  if (f & FLAG_MARKED && byClick) {
    return { f, result: RESULT_NONE };
  }
  // open
  f &= ~FLAG_HIDDEN;
  // if opend a mine
  if (f & FLAG_MINE) {
    // esplode when clicked
    if (byClick) {
      f |= FLAG_OPEN_EXPLODED;
    }
    return { f, result: RESULT_EXPLODED };
  }
  return { f, result: RESULT_OPENED };
};

export const setHint = (f, hint) => (
  (f & ~FLAG_OPEN_HINT) | (hint << 4)
);

export const getHint = (f) => {
  // return -1 if not empty
  return (f & FLAG_MAIN) ? -1 : ((f & FLAG_OPEN_HINT) >> 4);
};

const FLAG = {
  HIDDEN: 0x001,
  MINE: 0x002,
  MARKED: 0x004,
  OPEN_EXPLODED: 0x008,
  HID_PRESSED: 0x100,
  HID_PENDING: 0x200,
};

const FLAGS = {
  MAIN: 0x007,
  OPEN_HINT: 0x0F0,
};

const STYLE = {
  HIDDEN: 0,
  MARKED: 1,
  PENDING: 2,
  PRESSED: 3,
  MINE: 12,
  EXPLOSION: 13,
  MISTAKE: 14,
};

const STYLES = {
  OPEN: 3,
};

export const RESULT = {
  NONE: 0,
  OPENED: 1,
  EXPLODED: 2,
  MARKED: 4,
  UNMARKED: 8,
};

export const initialValue = () => (FLAG.HIDDEN);

export const putMine = (f) => (f | FLAG.MINE);

export const press = (f) => (f | FLAG.HID_PRESSED);

export const release = (f) => (f & ~FLAG.HID_PRESSED);

export const toggleMark = (f) => {
  // already opened
  if (!(f & FLAG.HIDDEN)) {
    return { f, result: RESULT.NONE };
  }
  // marked -> pending
  if (f & FLAG.MARKED) {
    return {
      f: (f & ~FLAG.MARKED) | FLAG.HID_PENDING,
      result: RESULT.UNMARKED,
    };
  }
  // pending -> not marked
  if (f & FLAG.HID_PENDING) {
    return {
      f: f & ~FLAG.HID_PENDING,
      result: RESULT.NONE,
    };
  }
  // not marked -> marked
  return {
    f: f | FLAG.MARKED,
    result: RESULT.MARKED,
  };
};

export const forceMark = (f) => ((f & ~FLAG.HID_PENDING) | FLAG.MARKED);

export const open = (f, byClick = true) => {
  // already opened
  if (!(f & FLAG.HIDDEN)) {
    return { f, result: RESULT.NONE };
  }
  // ignore if clicked on mark
  if (f & FLAG.MARKED && byClick) {
    return { f, result: RESULT.NONE };
  }
  // open
  let f2 = f & ~FLAG.HIDDEN;
  // if opend a mine
  if (f2 & FLAG.MINE) {
    // esplode when clicked
    if (byClick) {
      f2 |= FLAG.OPEN_EXPLODED;
    }
    return { f: f2, result: RESULT.EXPLODED };
  }
  return { f: f2, result: RESULT.OPENED };
};

export const setHint = (f, hint) => (
  (f & ~FLAGS.OPEN_HINT) | (hint << 4)
);

export const getHint = (f) => (
  // return -1 if not empty
  (f & FLAGS.MAIN) ? -1 : ((f & FLAGS.OPEN_HINT) >> 4)
);

export const isHidden = (f) => (f & FLAG.HIDDEN > 0);

export const styleIdx = (f) => {
  if (f & FLAG.MARKED) {
    if ((f & FLAGS.MAIN) === FLAG.MARKED) return STYLE.MISTAKE;
    return STYLE.MARKED;
  }
  if (f & FLAG.HIDDEN) {
    if (f & FLAG.HID_PRESSED) return STYLE.PRESSED;
    if (f & FLAG.HID_PENDING) return STYLE.PENDING;
    return STYLE.HIDDEN;
  }
  if (f & FLAG.MINE) {
    if (f & FLAG.OPEN_EXPLODED) return STYLE.EXPLOSION;
    return STYLE.MINE;
  }
  return STYLES.OPEN + getHint(f);
};

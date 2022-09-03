const valueEnum = {
  HIDDEN: 0x001,
  MINE: 0x002,
  MARKED: 0x004,
  OPEN_EXPLODED: 0x008,
  HID_PRESSED: 0x100,
  HID_PENDING: 0x200,
};

const valueFlags = {
  ...valueEnum,
  MAIN: 0x007,
  OPEN_HINT: 0x0f0,
};

const styleEnum = {
  HIDDEN: 0,
  MARKED: 1,
  PENDING: 2,
  PRESSED: 3,
  OPEN: 3,
  MINE: 12,
  EXPLOSION: 13,
  MISTAKE: 14,
};

const resultEnum = {
  NONE: 0,
  OPENED: 1,
  EXPLODED: 2,
  MARKED: 4,
  UNMARKED: 8,
};

const initialValue = () => valueFlags.HIDDEN;

const putMine = (f) => f | valueFlags.MINE;

const press = (f) => f | valueFlags.HID_PRESSED;

const release = (f) => f & ~valueFlags.HID_PRESSED;

const toggleMark = (f) => {
  // already opened
  if (!(f & valueFlags.HIDDEN)) {
    return [f, resultEnum.NONE];
  }
  // marked -> pending
  if (f & valueFlags.MARKED) {
    return [
      (f & ~valueFlags.MARKED) | valueFlags.HID_PENDING,
      resultEnum.UNMARKED,
    ];
  }
  // pending -> not marked
  if (f & valueFlags.HID_PENDING) {
    return [f & ~valueFlags.HID_PENDING, resultEnum.NONE];
  }
  // not marked -> marked
  return [f | valueFlags.MARKED, resultEnum.MARKED];
};

const forceMark = (f) => (f & ~valueFlags.HID_PENDING) | valueFlags.MARKED;

const open = (f, byClick = true) => {
  // already opened
  if (!(f & valueFlags.HIDDEN)) {
    return [f, resultEnum.NONE];
  }
  // ignore if clicked on mark
  if (f & valueFlags.MARKED && byClick) {
    return [f, resultEnum.NONE];
  }
  // open
  let f2 = f & ~valueFlags.HIDDEN;
  // if opend a mine
  if (f2 & valueFlags.MINE) {
    // esplode when clicked
    if (byClick) {
      f2 |= valueFlags.OPEN_EXPLODED;
    }
    return [f2, resultEnum.EXPLODED];
  }
  return [f2, resultEnum.OPENED];
};

const setHint = (f, hint) => (f & ~valueFlags.OPEN_HINT) | (hint << 4);

const getHint = (f) =>
  // return -1 if not empty
  f & valueFlags.MAIN ? -1 : (f & valueFlags.OPEN_HINT) >> 4;

const isHidden = (f) => f & (valueFlags.HIDDEN > 0);

const styleIdx = (f) => {
  if (f & valueFlags.MARKED) {
    if ((f & valueFlags.MAIN) === valueFlags.MARKED) return styleEnum.MISTAKE;
    return styleEnum.MARKED;
  }
  if (f & valueFlags.HIDDEN) {
    if (f & valueFlags.HID_PRESSED) return styleEnum.PRESSED;
    if (f & valueFlags.HID_PENDING) return styleEnum.PENDING;
    return styleEnum.HIDDEN;
  }
  if (f & valueFlags.MINE) {
    if (f & valueFlags.OPEN_EXPLODED) return styleEnum.EXPLOSION;
    return styleEnum.MINE;
  }
  return styleEnum.OPEN + getHint(f);
};

export {
  resultEnum,
  initialValue,
  putMine,
  press,
  release,
  toggleMark,
  forceMark,
  open,
  setHint,
  getHint,
  isHidden,
  styleIdx,
};

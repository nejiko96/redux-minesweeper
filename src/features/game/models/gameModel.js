import * as cell from './cellModel';
import sizeGen from './sizeModel';
import { fillArray, fillArray2D, noop } from '../utils';

const STATUS = {
  READY: 1,
  RUNNING: 2,
  CLEARED: 4,
  GAMEOVER: 8,
};

const STATUSES = {
  ENABLED: STATUS.READY | STATUS.RUNNING,
};

const isEnabled = (state) => (state.status & STATUSES.ENABLED);

const isHidden = (state, i, j) => (cell.isHidden(state.grid[i][j]));

const pos2key = ([i, j]) => (i << 8) | j;

const relatives = (state, i, j, diffs) => (
  diffs
    .map(([di, dj]) => [i + di, j + dj])
    .filter(
      ([i2, j2]) => state.grid[i2] && state.grid[i2][j2],
    )
);

const surroundings = (state, i, j) => (
  relatives(
    state,
    i,
    j,
    [
      [-1, -1], [-1, 0], [-1, 1], [0, 1],
      [1, 1], [1, 0], [1, -1], [0, -1],
    ],
  )
);

const neighbors = (state, i, j) => (
  relatives(
    state,
    i,
    j,
    [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 0], [0, 1],
      [1, -1], [1, 0], [1, 1],
    ],
  )
);

const generateMines = (state, i, j) => {
  state.minePos = {};
  const w = state.width;
  let n = w * state.height;
  const samples = fillArray(n, (k) => k);
  const excludes = neighbors(state, i, j).map(([i2, j2]) => i2 * w + j2);
  for (let e = 0; e < excludes.length && n > 0; e++) {
    const k = excludes[e];
    n -= 1;
    [samples[k], samples[n]] = [samples[n], samples[k]];
  }
  for (let m = 0; m < state.mines && n > 0; m++) {
    const k = Math.floor(Math.random() * n);
    const smp = samples[k];
    const [i2, j2] = [smp / w | 0, smp % w];
    state.grid[i2][j2] = cell.putMine(state.grid[i2][j2]);
    const pos = [i2, j2];
    state.minePos[pos2key(pos)] = pos;
    n -= 1;
    [samples[k], samples[n]] = [samples[n], samples[k]];
  }
};

const start = (state, i, j) => {
  generateMines(state, i, j);
  state.status = STATUS.RUNNING;
};

const toggleMark = (state, i, j) => {
  const { f, result } = cell.toggleMark(state.grid[i][j]);
  state.grid[i][j] = f;
  if (result === cell.RESULT.NONE) {
    return;
  }
  const pos = [i, j];
  const key = pos2key(pos);
  if (result === cell.RESULT.MARKED) {
    state.markPos[key] = pos;
  }
  if (result === cell.RESULT.UNMARKED) {
    delete state.markPos[key];
  }
};

// eslint:no-use-before-define
let postOpen;

const open = (state, i, j) => {
  const { f, result } = cell.open(state.grid[i][j]);
  state.grid[i][j] = f;
  if (result === cell.RESULT.OPENED) {
    state.countDown -= 1;
    postOpen(state, i, j);
  }
  return result;
};

postOpen = (state, i, j) => {
  const surr = surroundings(state, i, j);
  const hint = surr
    .filter((pos) => state.minePos[pos2key(pos)])
    .length;
  state.grid[i][j] = cell.setHint(state.grid[i][j], hint);
  if (hint > 0) {
    return;
  }
  surr.forEach(([i2, j2]) => open(state, i2, j2));
};

const areaOpen = (state, i, j) => {
  const hint = cell.getHint(state.grid[i][j]);
  // exit if not empty
  if (hint < 0) {
    return 0;
  }
  const surr = surroundings(state, i, j);
  const marks = surr
    .filter((pos) => state.markPos[pos2key(pos)])
    .length;
  if (marks !== hint) {
    return 0;
  }
  return surr
    .map(([i2, j2]) => open(state, i2, j2))
    .reduce((a, b) => a | b, 0);
};

const gameClear = (state) => {
  state.status = STATUS.CLEARED;
  Object.entries(state.minePos)
    .forEach(([key, pos]) => {
      const [i, j] = pos;
      state.markPos[key] = pos;
      state.grid[i][j] = cell.forceMark(state.grid[i][j]);
    });
};

const gameOver = (state) => {
  state.status = STATUS.GAMEOVER;
  const mineMarkPos = {
    ...state.minePos,
    ...state.markPos,
  };
  Object.values(mineMarkPos)
    .forEach(([i, j]) => {
      state.grid[i][j] = cell.open(state.grid[i][j], false).f;
    });
};

const init = (state) => {
  const { width, height, mines } = sizeGen(state);
  Object.assign(state, {
    width,
    height,
    mines,
    status: STATUS.READY,
    grid: fillArray2D(width, height, cell.initialValue),
    minePos: {},
    markPos: {},
    countDown: width * height - mines,
  });
};

const handleLeftMouseDown = (state, i, j) => {
  if (!isEnabled(state)) {
    return;
  }
  state.grid[i][j] = cell.press(state.grid[i][j]);
};

const handleLeftMouseOver = (state, i, j) => {
  if (!isEnabled(state)) {
    return;
  }
  state.grid[i][j] = cell.press(state.grid[i][j]);
};

const handleLeftMouseOut = (state, i, j) => {
  if (!isEnabled(state)) {
    return;
  }
  state.grid[i][j] = cell.release(state.grid[i][j]);
};

const handleLeftMouseUp = (state, i, j) => {
  if (!isEnabled(state)) {
    return;
  }
  state.grid[i][j] = cell.release(state.grid[i][j]);
  if (state.status === STATUS.READY) {
    start(state, i, j);
  }
  const result = open(state, i, j);
  if (result === cell.RESULT.EXPLODED) {
    gameOver(state);
  } else if (state.countDown <= 0) {
    gameClear(state);
  }
};

const handleRightMouseDown = (state, i, j) => {
  if (!isEnabled(state)) {
    return;
  }
  state.grid[i][j] = cell.release(state.grid[i][j]);
  toggleMark(state, i, j);
};

const handleRightMouseOver = noop;

const handleRightMouseOut = noop;

const handleRightMouseUp = noop;

const handleBothMouseDown = (state, i, j) => {
  if (!isEnabled(state)) {
    return;
  }
  neighbors(state, i, j).forEach(
    ([i2, j2]) => { state.grid[i2][j2] = cell.press(state.grid[i2][j2]); },
  );
};

const handleBothMouseOver = (state, i, j) => {
  if (!isEnabled(state)) {
    return;
  }
  neighbors(state, i, j).forEach(
    ([i2, j2]) => { state.grid[i2][j2] = cell.press(state.grid[i2][j2]); },
  );
};

const handleBothMouseOut = (state, i, j) => {
  if (!isEnabled(state)) {
    return;
  }
  neighbors(state, i, j).forEach(
    ([i2, j2]) => {
      state.grid[i2][j2] = cell.release(state.grid[i2][j2]);
    },
  );
};

const handleBothMouseUp = (state, i, j) => {
  if (!isEnabled(state)) {
    return;
  }
  neighbors(state, i, j).forEach(
    ([i2, j2]) => {
      state.grid[i2][j2] = cell.release(state.grid[i2][j2]);
    },
  );
  const result = areaOpen(state, i, j);
  if (result & cell.RESULT.EXPLODED) {
    gameOver(state);
  } else if (state.countDown <= 0) {
    gameClear(state);
  }
};

const handleTouchStart = (state, i, j) => {
  if (isHidden(state, i, j)) {
    handleLeftMouseDown(state, i, j);
  } else {
    handleBothMouseDown(state, i, j);
  }
};

const handleTouchEnd = (state, i, j) => {
  if (isHidden(state, i, j)) {
    handleLeftMouseUp(state, i, j);
  } else {
    handleBothMouseUp(state, i, j);
  }
};

const handleLongPress = (state, i, j) => {
  if (isHidden(state, i, j)) {
    handleRightMouseDown(state, i, j);
  } else {
    handleBothMouseUp(state, i, j);
  }
};

export {
  STATUS,
  STATUSES,
  init,
  handleLeftMouseDown,
  handleLeftMouseOver,
  handleLeftMouseOut,
  handleLeftMouseUp,
  handleRightMouseDown,
  handleRightMouseOver,
  handleRightMouseOut,
  handleRightMouseUp,
  handleBothMouseDown,
  handleBothMouseOver,
  handleBothMouseOut,
  handleBothMouseUp,
  handleTouchStart,
  handleTouchEnd,
  handleLongPress,
};

import * as cell from './cellModel';
import sizeGen from './sizeModel';
import { fillArray, fillArray2D, noop } from '../utils';

export const STATUS = {
  READY: 1,
  RUNNING: 2,
  CLEARED: 4,
  GAMEOVER: 8,
};

export const STATUSES = {
  ENABLED: STATUS.READY | STATUS.RUNNING,
};

const isEnabled = (state) => (state.status & STATUSES.ENABLED);

const dup = (state) => JSON.parse(JSON.stringify(state));

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
    state, i, j,
    [
      [-1, -1], [-1, 0], [-1, 1], [0, 1],
      [1, 1], [1, 0], [1, -1], [0, -1],
    ],
  )
);

const neighbors = (state, i, j) => (
  relatives(
    state, i, j,
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
  const h = state.height;
  const samples = fillArray(w * h, (k) => k);
  const excludes = neighbors(state, i, j).map(([i2, j2]) => i2 * w + j2);
  let s = samples.length;
  let e = excludes.length;
  let m = state.mines;
  while (e--) {
    const k = excludes[e];
    s--;
    [samples[k], samples[s]] = [samples[s], samples[k]];
  }
  while (m--) {
    const k = Math.floor(Math.random() * s--);
    const smp = samples[k];
    const i2 = smp / w | 0;
    const j2 = smp % w;
    const pos = [i2, j2];
    state.minePos[pos2key(pos)] = pos;
    state.grid[i2][j2] = cell.putMine(state.grid[i2][j2]);
    [samples[k], samples[s]] = [samples[s], samples[k]];
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
    state.countDown--;
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

export const initialValue = (level, w, h, m) => {
  const { width, height, mines } = sizeGen(
    {
      level, width: w, height: h, mines: m,
    },
  );
  return {
    level,
    width,
    height,
    mines,
    status: STATUS.READY,
    grid: fillArray2D(width, height, cell.initialValue),
    minePos: {},
    markPos: {},
    countDown: width * height - mines,
  };
};

export const handleLeftMouseDown = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  const state2 = dup(state);
  state2.grid[i][j] = cell.press(state2.grid[i][j]);
  return state2;
};

export const handleLeftMouseOver = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  const state2 = dup(state);
  state2.grid[i][j] = cell.press(state2.grid[i][j]);
  return state2;
};

export const handleLeftMouseOut = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  const state2 = dup(state);
  state2.grid[i][j] = cell.release(state2.grid[i][j]);
  return state2;
};

export const handleLeftMouseUp = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  const state2 = dup(state);
  state2.grid[i][j] = cell.release(state2.grid[i][j]);
  if (state2.status === STATUS.READY) {
    start(state2, i, j);
  }
  const result = open(state2, i, j);
  if (result === cell.RESULT.EXPLODED) {
    gameOver(state2);
  } else if (state2.countDown <= 0) {
    gameClear(state2);
  }
  return state2;
};

export const handleRightMouseDown = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  const state2 = dup(state);
  state2.grid[i][j] = cell.release(state2.grid[i][j]);
  toggleMark(state2, i, j);
  return state2;
};

export const handleRightMouseOver = noop;

export const handleRightMouseOut = noop;

export const handleRightMouseUp = noop;

export const handleBothMouseDown = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  const state2 = dup(state);
  neighbors(state2, i, j).forEach(
    ([i2, j2]) => { state2.grid[i2][j2] = cell.press(state2.grid[i2][j2]); },
  );
  return state2;
};

export const handleBothMouseOver = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  const state2 = dup(state);
  neighbors(state2, i, j).forEach(
    ([i2, j2]) => { state2.grid[i2][j2] = cell.press(state2.grid[i2][j2]); },
  );
  return state2;
};

export const handleBothMouseOut = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  const state2 = dup(state);
  neighbors(state2, i, j).forEach(
    ([i2, j2]) => {
      state2.grid[i2][j2] = cell.release(state2.grid[i2][j2]);
    },
  );
  return state2;
};

export const handleBothMouseUp = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  const state2 = dup(state);
  neighbors(state2, i, j).forEach(
    ([i2, j2]) => {
      state2.grid[i2][j2] = cell.release(state2.grid[i2][j2]);
    },
  );
  const result = areaOpen(state2, i, j);
  if (result & cell.RESULT.EXPLODED) {
    gameOver(state2);
  } else if (state2.countDown <= 0) {
    gameClear(state2);
  }
  return state2;
};

export const isHidden = (state, i, j) => (cell.isHidden(state.grid[i][j]));

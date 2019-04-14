import * as cellModel from './cellModel';
import sizeGen from './sizeModel';
import { fillArray, fillArray2D, noop } from '../utils';

const relatives = (state, i, j, diffs) => {
  return diffs
    .map(([di, dj]) => [i + di, j + dj])
    .filter(
      ([i, j]) => state.grid[i] && state.grid[i][j]
    );
};

const surroundings = (state, i, j) => {
  return relatives(state, i, j,
    [
      [-1, -1], [-1, 0], [-1, 1], [0, 1],
      [1, 1], [1, 0], [1, -1], [0, -1]
    ]
  );
};

const neighbors = (state, i, j) => {
  return relatives(state, i, j,
    [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 0], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ]
  );
};

const pos2key = ([i, j]) => (i << 8) | j;

const generateMines = (state, i, j) => {
  state.minePos = {};
  const w = state.width;
  const h = state.height;
  const samples = fillArray(w * h, k => k);
  const excludes = neighbors(state, i, j).map(([i2, j2]) => i2 * w + j2)
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
    const pos = [i, j] = [smp / w | 0, smp % w];
    state.minePos[pos2key(pos)] = pos;
    state.grid[i][j] = cellModel.putMine(state.grid[i][j]);
    [samples[k], samples[s]] = [samples[s], samples[k]];
  }
};

const start = (state, i, j) => {
  generateMines(state, i, j);
  state.status = STATUS_RUNNING
};

const toggleMark = (state, i, j) => {
  const {f, result} = cellModel.toggleMark(state.grid[i][j]);
  state.grid[i][j] = f;
  if (result === cellModel.RESULT_NONE) {
    return;
  }
  const pos = [i, j];
  const key = pos2key(pos);
  if (result === cellModel.RESULT_MARKED) {
    state.markPos[key] = pos;
  }
  if (result === cellModel.RESULT_UNMARKED) {
    delete state.markPos[key];
  }
};

const open = (state, i, j) => {
  const {f, result} = cellModel.open(state.grid[i][j]);
  state.grid[i][j] = f;
  if (result === cellModel.RESULT_OPENED) {
    state.countDown--;
    postOpen(state, i, j);
  }
  return result;
};

const postOpen = (state, i, j) => {
  const surr = surroundings(state, i, j);
  const hint = surr
    .filter(pos => state.minePos[pos2key(pos)])
    .length;
  state.grid[i][j] = cellModel.setHint(state.grid[i][j], hint);
  if (hint > 0) {
    return;
  }
  surr.forEach(([i2, j2]) => open(state, i2, j2));
};

const areaOpen = (state, i, j) => {
  const hint = cellModel.getHint(state.grid[i][j]);
  // exit if not empty
  if (hint < 0) {
    return;
  }
  const surr = surroundings(state, i, j);
  const marks = surr
    .filter(pos => state.markPos[pos2key(pos)])
    .length;
  if (marks !== hint) {
    return;
  }
  return surr
    .map(([i2, j2]) => open(state, i2, j2))
    .reduce((a, b) => a | b);
};

const gameClear = (state) => {
  state.status = STATUS_CLEARED;
  Object.keys(state.minePos)
    .forEach(key => {
      const [i, j] = state.markPos[key] = state.minePos[key];
      state.grid[i][j] = cellModel.forceMark(state.grid[i][j]);
    });
};

const gameOver = (state) => {
  state.status = STATUS_GAMEOVER;
  const mineMarkPos = {
    ...state.minePos,
    ...state.markPos
  };
  Object.values(mineMarkPos)
    .forEach(([i, j]) => {
      state.grid[i][j] = cellModel.open(state.grid[i][j], false).f;
    });
};

const dup = (state) => JSON.parse(JSON.stringify(state));

export const STATUS_READY = 1;
export const STATUS_RUNNING = 2;
export const STATUS_CLEARED = 4;
export const STATUS_GAMEOVER = 8;
export const STATUSES_ENABLED = STATUS_READY | STATUS_RUNNING;

export const initialValue = (level, w, h, m) => {
  const { width, height, mines } = sizeGen(
    { level, width: w, height: h, mines: m }
  );
  return {
    level,
    width,
    height,
    mines,
    status: STATUS_READY,
    grid: fillArray2D(width, height, cellModel.initialValue),
    minePos: {},
    markPos: {},
    countDown: width * height - mines
  };
};

export const handleLeftMouseDown = (state, i, j) => {
  state = dup(state);
  state.grid[i][j] = cellModel.press(state.grid[i][j]);
  return state;
};

export const handleLeftMouseOver = (state, i, j) => {
  state = dup(state);
  state.grid[i][j] = cellModel.press(state.grid[i][j]);
  return state;
};

export const handleLeftMouseOut = (state, i, j) => {
  state = dup(state);
  state.grid[i][j] = cellModel.release(state.grid[i][j]);
  return state;
};

export const handleLeftMouseUp = (state, i, j) => {
  state = dup(state);
  state.grid[i][j] = cellModel.release(state.grid[i][j]);
  if (state.status === STATUS_READY) {
    start(state, i, j);
  }
  const result = open(state, i, j);
  if (result === cellModel.RESULT_EXPLODED) {
    gameOver(state);
  } else if (state.countDown <= 0) {
    gameClear(state);
  }
  return state;
};

export const handleRightMouseDown = (state, i, j) => {
  state = dup(state);
  toggleMark(state, i, j);
  return state;
};

export const handleRightMouseOver = noop;

export const handleRightMouseOut = noop;

export const handleRightMouseUp = noop;

export const handleBothMouseDown = (state, i, j) => {
  state = dup(state);
  neighbors(state, i, j).forEach(
    ([i, j]) => state.grid[i][j] = cellModel.press(state.grid[i][j])
  );
  return state;
};

export const handleBothMouseOver = (state, i, j) => {
  state = dup(state);
  neighbors(state, i, j).forEach(
    ([i, j]) => state.grid[i][j] = cellModel.press(state.grid[i][j])
  );
  return state;
};

export const handleBothMouseOut = (state, i, j) => {
  state = dup(state);
  neighbors(state, i, j).forEach(
    ([i, j]) => state.grid[i][j] = cellModel.release(state.grid[i][j])
  );
  return state;
};

export const handleBothMouseUp = (state, i, j) => {
  state = dup(state);
  neighbors(state, i, j).forEach(
    ([i, j]) => state.grid[i][j] = cellModel.release(state.grid[i][j])
  );
  const result = areaOpen(state, i, j);
  if (result & cellModel.RESULT_EXPLODED) {
    gameOver(state);
  } else if (state.countDown <= 0) {
    gameClear(state);
  }
  return state;
};

export const isEnabled = (state) => (state.status & STATUSES_ENABLED);


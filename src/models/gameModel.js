import * as cellModel from './cellModel';
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
    state.grid[i2][j2] = cellModel.putMine(state.grid[i2][j2]);
    [samples[k], samples[s]] = [samples[s], samples[k]];
  }
};

const start = (state, i, j) => {
  generateMines(state, i, j);
  state.status = STATUS.RUNNING;
};

const toggleMark = (state, i, j) => {
  const { f, result } = cellModel.toggleMark(state.grid[i][j]);
  state.grid[i][j] = f;
  if (result === cellModel.RESULT.NONE) {
    return;
  }
  const pos = [i, j];
  const key = pos2key(pos);
  if (result === cellModel.RESULT.MARKED) {
    state.markPos[key] = pos;
  }
  if (result === cellModel.RESULT.UNMARKED) {
    delete state.markPos[key];
  }
};

let postOpen;

const open = (state, i, j) => {
  const { f, result } = cellModel.open(state.grid[i][j]);
  state.grid[i][j] = f;
  if (result === cellModel.RESULT.OPENED) {
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
    .filter((pos) => state.markPos[pos2key(pos)])
    .length;
  if (marks !== hint) {
    return;
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
      state.grid[i][j] = cellModel.forceMark(state.grid[i][j]);
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
      state.grid[i][j] = cellModel.open(state.grid[i][j], false).f;
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
    grid: fillArray2D(width, height, cellModel.initialValue),
    minePos: {},
    markPos: {},
    countDown: width * height - mines,
  };
};

export const handleLeftMouseDown = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  state = dup(state);
  state.grid[i][j] = cellModel.press(state.grid[i][j]);
  return state;
};

export const handleLeftMouseOver = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  state = dup(state);
  state.grid[i][j] = cellModel.press(state.grid[i][j]);
  return state;
};

export const handleLeftMouseOut = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  state = dup(state);
  state.grid[i][j] = cellModel.release(state.grid[i][j]);
  return state;
};

export const handleLeftMouseUp = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  state = dup(state);
  state.grid[i][j] = cellModel.release(state.grid[i][j]);
  if (state.status === STATUS.READY) {
    start(state, i, j);
  }
  const result = open(state, i, j);
  if (result === cellModel.RESULT.EXPLODED) {
    gameOver(state);
  } else if (state.countDown <= 0) {
    gameClear(state);
  }
  return state;
};

export const handleRightMouseDown = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  state = dup(state);
  state.grid[i][j] = cellModel.release(state.grid[i][j]);
  toggleMark(state, i, j);
  return state;
};

export const handleRightMouseOver = noop;

export const handleRightMouseOut = noop;

export const handleRightMouseUp = noop;

export const handleBothMouseDown = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  state = dup(state);
  neighbors(state, i, j).forEach(
    ([i2, j2]) => { state.grid[i2][j2] = cellModel.press(state.grid[i2][j2]); },
  );
  return state;
};

export const handleBothMouseOver = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  state = dup(state);
  neighbors(state, i, j).forEach(
    ([i2, j2]) => { state.grid[i2][j2] = cellModel.press(state.grid[i2][j2]); },
  );
  return state;
};

export const handleBothMouseOut = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  state = dup(state);
  neighbors(state, i, j).forEach(
    ([i2, j2]) => {
      state.grid[i2][j2] = cellModel.release(state.grid[i2][j2]);
    },
  );
  return state;
};

export const handleBothMouseUp = (state, i, j) => {
  if (!isEnabled(state)) {
    return state;
  }
  state = dup(state);
  neighbors(state, i, j).forEach(
    ([i2, j2]) => {
      state.grid[i2][j2] = cellModel.release(state.grid[i2][j2]);
    },
  );
  const result = areaOpen(state, i, j);
  if (result & cellModel.RESULT.EXPLODED) {
    gameOver(state);
  } else if (state.countDown <= 0) {
    gameClear(state);
  }
  return state;
};

export const isHidden = (state, i, j) => (cellModel.isHidden(state.grid[i][j]));

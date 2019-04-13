import * as cellModel from './cellModel';
import { fillArray, fillArray2D } from '../utils';

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
    const pos = [i, j] = [Math.floor(smp / w), smp % w];
    state.minePos[JSON.stringify(pos)] = true;
    state.grid[i][j] = cellModel.putMine(state.grid[i][j]);
    [samples[k], samples[s]] = [samples[s], samples[k]];
  }
};

const start = (state, i, j) => {
  generateMines(state, i, j);
  state.status = RUNNING
};

const toggleMark = (state, i, j) => {
  const {f, result} = cellModel.toggleMark(state.grid[i][j]);
  state.grid[i][j] = f;
  if (result === cellModel.RESULT_NONE) {
    return;
  }
  const pos = JSON.stringify([i, j]);
  if (result === cellModel.RESULT_MARKED) {
    state.markPos[pos] = true;
  }
  if (result === cellModel.RESULT_UNMARKED) {
    delete state.markPos[pos];
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
    .filter(pos => state.minePos[JSON.stringify(pos)])
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
    .filter(pos => state.markPos[JSON.stringify(pos)])
    .length;
  if (marks !== hint) {
    return;
  }
  return surr
    .map(([i2, j2]) => open(state, i2, j2))
    .reduce((a, b) => a | b);
};

const gameClear = (state) => {
  state.status = CLEARED;
  Object.keys(state.minePos)
    .forEach(pos => {
      const [i, j] = JSON.parse(pos);
      state.markPos[pos] = true;
      state.grid[i][j] = cellModel.forceMark(state.grid[i][j]);
    });
};

const gameOver = (state) => {
  state.status = GAMEOVER;
  const mineMarkPos = {
    ...state.minePos,
    ...state.markPos
  };
  Object.keys(mineMarkPos)
    .forEach(pos => {
      const [i, j] = JSON.parse(pos);
      state.grid[i][j] = cellModel.open(state.grid[i][j], false).f;
    });
};

const dup = (state) => JSON.parse(JSON.stringify(state));

export const READY = 1;
export const RUNNING = 2;
export const CLEARED = 4;
export const GAMEOVER = 8;
export const ENABLED = READY | RUNNING;

export const initialValue = (width, height, mines) => ({
  width,
  height,
  mines,
  grid: fillArray2D(width, height, cellModel.initialValue),
  minePos: null,
  markPos: {},
  countDown: width * height - mines,
  status: READY,
});

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
  if (state.minePos === null) {
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
  console.log(state);
  return state;
};

export const handleRightMouseOver = (state, i, j) => (state);

export const handleRightMouseOut = (state, i, j) => (state);

export const handleRightMouseUp = (state, i, j) => (state);

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

export const isEnabled = (state) => (state.status & ENABLED);


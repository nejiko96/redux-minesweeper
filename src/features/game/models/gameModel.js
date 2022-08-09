import * as cell from './cellModel';
import sizeGen from './sizeModel';
import { fillArray, fillArray2D, noop } from '../utils';

const gameStatusEnum = {
  READY: 1,
  RUNNING: 2,
  CLEARED: 4,
  GAMEOVER: 8,
};

const gameStatusFlags = {
  ...gameStatusEnum,
  ENABLED: gameStatusEnum.READY | gameStatusEnum.RUNNING,
};

const isEnabled = (state) => (state.status & gameStatusFlags.ENABLED);

const isHidden = (state, i, j) => (cell.isHidden(state.grid[i][j]));

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
    state.minePos[pos] = pos;
    n -= 1;
    [samples[k], samples[n]] = [samples[n], samples[k]];
  }
};

const start = (state, i, j) => {
  generateMines(state, i, j);
  state.status = gameStatusFlags.RUNNING;
};

const toggleMark = (state, i, j) => {
  const [f, result] = cell.toggleMark(state.grid[i][j]);
  state.grid[i][j] = f;
  if (result === cell.resultEnum.NONE) {
    return;
  }
  const pos = [i, j];
  if (result === cell.resultEnum.MARKED) {
    state.markPos[pos] = pos;
  }
  if (result === cell.resultEnum.UNMARKED) {
    delete state.markPos[pos];
  }
};

const postOpen = (state, i, j) => {
  const surr = surroundings(state, i, j);
  const hint = surr
    .filter((pos) => state.minePos[pos])
    .length;
  state.grid[i][j] = cell.setHint(state.grid[i][j], hint);
  return hint > 0 ? [] : surr;
};

const open = (state, i, j) => {
  const [f, result] = cell.open(state.grid[i][j]);
  state.grid[i][j] = f;
  if (result === cell.resultEnum.OPENED) {
    state.countDown -= 1;
    postOpen(state, i, j).forEach(([i2, j2]) => open(state, i2, j2));
  }
  return result;
};

const areaOpen = (state, i, j) => {
  const hint = cell.getHint(state.grid[i][j]);
  // exit if not empty
  if (hint < 0) {
    return cell.resultEnum.NONE;
  }
  const surr = surroundings(state, i, j);
  const marks = surr
    .filter((pos) => state.markPos[pos])
    .length;
  if (marks !== hint) {
    return cell.resultEnum.NONE;
  }
  return surr
    .map(([i2, j2]) => open(state, i2, j2))
    .reduce((a, b) => a | b, cell.resultEnum.NONE);
};

const gameClear = (state) => {
  state.status = gameStatusFlags.CLEARED;
  Object.values(state.minePos)
    .forEach((pos) => {
      const [i, j] = pos;
      state.markPos[pos] = pos;
      state.grid[i][j] = cell.forceMark(state.grid[i][j]);
    });
};

const gameOver = (state) => {
  state.status = gameStatusFlags.GAMEOVER;
  const mineMarkPos = {
    ...state.minePos,
    ...state.markPos,
  };
  Object.values(mineMarkPos)
    .forEach(([i, j]) => {
      [state.grid[i][j]] = cell.open(state.grid[i][j], false);
    });
};

const init = (state) => {
  const { width, height, mines } = sizeGen(state);
  Object.assign(state, {
    width,
    height,
    mines,
    status: gameStatusFlags.READY,
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
  if (state.status === gameStatusFlags.READY) {
    start(state, i, j);
  }
  const result = open(state, i, j);
  if (result === cell.resultEnum.EXPLODED) {
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
  if (result & cell.resultEnum.EXPLODED) {
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
  gameStatusFlags,
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

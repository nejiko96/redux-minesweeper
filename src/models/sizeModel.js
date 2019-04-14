const levelSettings = {
  easy: {
    width: 9,
    height: 9,
    mines: 10
  },
  medium: {
    width: 16,
    height: 16,
    mines: 40
  },
  hard: {
    width: 30,
    height: 16,
    mines: 99
  }
};

const widthSettings = {
  min: 9,
  max: 30,
  default: 9
};

const heightSettings =  {
  min: 9,
  max: 24,
  default: 9
}

const minesSettings = (n) => {
  const pct = 10 + (n / 45 | 0);
  return {
    min: 10,
    max: Math.floor(n * 0.94 - 8.45),
    default: Math.round(n * pct / 1000) * 10
  };
}

const initProperty = (value, def) => value ? Math.min(Math.max(value, def.min), def.max) : def.default;

const defaultSize = (state) => levelSettings[state.level];

const customSize = (state) => {
  const width = initProperty(state.width, widthSettings);
  const height = initProperty(state.height, heightSettings);
  const mines = initProperty(state.mines, minesSettings(width * height));
  return { width, height, mines };
}

const sizeGen = (state) => defaultSize(state) || customSize(state);

export default sizeGen;

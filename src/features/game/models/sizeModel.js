const stdSizeDef = {
  easy: {
    width: 9,
    height: 9,
    mines: 10,
  },
  medium: {
    width: 16,
    height: 16,
    mines: 40,
  },
  hard: {
    width: 30,
    height: 16,
    mines: 99,
  },
};

const widthDef = {
  min: 9,
  max: 30,
  default: 9,
};

const heightDef = {
  min: 9,
  max: 24,
  default: 9,
};

const minesDef = (n) => {
  const pct = 10 + (n / 45 | 0);
  return {
    min: 10,
    max: Math.floor(n * 0.94 - 8.45),
    default: Math.round(n * pct * 0.001) * 10,
  };
};

const adjustParam = (value, rng) => (
  value ? Math.min(Math.max(value | 0, rng.min), rng.max) : rng.default
);

const calcCustomSize = (param) => {
  const width = adjustParam(param.width, widthDef);
  const height = adjustParam(param.height, heightDef);
  const mines = adjustParam(param.mines, minesDef(width * height));
  return { width, height, mines };
};

const calcSize = (param) => stdSizeDef[param.level] ?? calcCustomSize(param);

export default calcSize;

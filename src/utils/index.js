import ReactDOM from 'react-dom';

const utils = {
  noop: () => {},
  fillArray: (n, fn) => Array.from({length: n}, (_, i) => fn(i)),
  fillArray2D: (w, h, fn) => Array.from({length: h}, (_, i) =>
    Array.from({length: w}, (_, j) => fn(i, j))
  ),
  initProperty: (value, def) => value ? Math.min(Math.max(value, def.min), def.max) : def.default,
  addEventListener: (cmp, event, fn) => {
    ReactDOM.findDOMNode(cmp).addEventListener(event, fn);
  },
  removeEventListener: (cmp, event, fn) => {
    ReactDOM.findDOMNode(cmp).removeEventListener(event, fn);
  }
};

export default utils;

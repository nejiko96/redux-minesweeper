import ReactDOM from 'react-dom';

export const noop = (state) => state;

export const fillArray = (n, fn) => Array.from({length: n}, (_, i) => fn(i));

export const fillArray2D = (w, h, fn) => Array.from({length: h}, (_, i) =>
    Array.from({length: w}, (_, j) => fn(i, j))
);

export const addEventListener = (cmp, event, fn) => {
  ReactDOM.findDOMNode(cmp).addEventListener(event, fn);
};

export const removeEventListener = (cmp, event, fn) => {
  ReactDOM.findDOMNode(cmp).removeEventListener(event, fn);
};

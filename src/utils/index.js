export const noop = (state) => state;

export const fillArray = (n, fn) => (
  Array.from({ length: n }, (_, i) => fn(i))
);

export const fillArray2D = (w, h, fn) => (
  Array.from(
    { length: h },
    (_, i) => (
      Array.from(
        { length: w },
        (__, j) => fn(i, j),
      )
    ),
  )
);

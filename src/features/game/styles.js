import { fillArray } from './utils';
import cellImgGreen16 from './images/green_16x16.png';
import cellImgGreen32 from './images/green_32x32.png';
import cellImgMS16 from './images/MS_16x16.png';
import cellImgMS32 from './images/MS_32x32.png';

const textBoxStyle = {
  backgroundColor: '#f5f5f5',
  color: '#000000',
  border: '1px solid #d3d3d3',
  display: 'inline-block',
  paddingRight: '2px',
  textAlign: 'right',
  width: '40px',
};

const cellImgTbl = {
  green_16: cellImgGreen16,
  green_32: cellImgGreen32,
  MS_16: cellImgMS16,
  MS_32: cellImgMS32,
};

const cellStyle = (name, size) => (i) => {
  const x = -size * (i % 3);
  const y = -size * ((i / 3) | 0);
  const cellImg = cellImgTbl[`${name}_${size}`];
  return {
    backgroundImage: `url(${cellImg})`,
    display: 'inline-block',
    height: `${size}px`,
    overflow: 'hidden',
    width: `${size}px`,
    backgroundPosition: `${x}px ${y}px`,
  };
};

const initStyles = ({ name, size }) => {
  const cellStyleCurry = cellStyle(name, size);
  return {
    theme: name,
    cellSize: size,
    container: {
      padding: '2rem',
      whiteSpace: 'nowrap',
      WebkitTouchCallout: 'none',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
    },
    counter: textBoxStyle,
    timer: textBoxStyle,
    space: {
      display: 'inline-block',
      width: '20px',
    },
    board: {
      position: 'relative',
      display: 'inline-block',
    },
    cells: {
      lineHeight: 0,
    },
    cell: fillArray(15, (i) => cellStyleCurry(i)),
    cellsOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      pointerEvents: 'none',
    },
  };
};

export { initStyles };

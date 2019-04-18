import { fillArray } from '.';
import cellImgGreen16 from '../images/green_16x16.png';
import cellImgGreen32 from '../images/green_32x32.png';
import cellImgMS16 from '../images/MS_16x16.png';
import cellImgMS32 from '../images/MS_32x32.png';

const textBoxStyle = {
  backgroundColor: '#f5f5f5',
  border: '1px solid #d3d3d3',
  display: 'inline-block',
  paddingRight: '2px',
  textAlign: 'right',
  width: '40px'
};

const cellImgTbl = {
  "green_16": cellImgGreen16,
  "green_32": cellImgGreen32,
  "MS_16": cellImgMS16,
  "MS_32": cellImgMS32,
};

const cellStyle = (theme, cellSize) => (i) => {
  const x = -cellSize * (i % 3);
  const y = -cellSize * (i / 3 | 0);
  const cellImg = cellImgTbl[`${theme}_${cellSize}`];
  return {
    backgroundImage: `url(${cellImg})`,
    display: 'inline-block',
    height: `${cellSize}px`,
    overflow: 'hidden',
    width: `${cellSize}px`,
    backgroundPosition: `${x}px ${y}px`
  };
};

const stylesGen = (theme, cellSize) => {
  const cellStyleCurry = cellStyle(theme, cellSize);
  return {
    theme,
    cellSize,
    container: {
      margin: '2rem'
    },
    body: {
      whiteSpace: 'nowrap',
      WebkitUserSelect: 'none',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent'
    },
    counter: textBoxStyle,
    timer: textBoxStyle,
    cells: {
      lineHeight: 0
    },
    cell: fillArray(15, i => cellStyleCurry(i)),
    restart: {
      fontSize: '14px',
      padding: '5px'
    },
    space: {
      display: 'inline-block',
      width: '20px'
    }
  };
}

export default stylesGen;

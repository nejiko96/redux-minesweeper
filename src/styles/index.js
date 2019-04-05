import utils from '../utils';
import cellImg32 from '../images/green_32x32.png';

const cellSize = 32;
const cellPx = `${cellSize}px`;
const textBoxStyle = {
  backgroundColor: '#f5f5f5',
  border: '1px solid #d3d3d3',
  display: 'inline-block',
  paddingRight: '2px',
  textAlign: 'right',
  width: '40px'
};
const cellStyle = i => {
  const x = -cellSize * (i % 3);
  const y = -cellSize * Math.floor(i / 3);
  return {
    backgroundImage: `url(${cellImg32})`,
    display: 'inline-block',
    height: cellPx,
    overflow: 'hidden',
    width: cellPx,
    backgroundPosition: `${x}px ${y}px`
  };
};
const styles = {
  container: {
    margin: '2rem'
  },
  body: {
    whiteSpace: 'nowrap'
  },
  counter: textBoxStyle,
  timer: textBoxStyle,
  cells: {
    lineHeight: 0
  },
  cell: utils.fillArray(15, i => cellStyle(i)),
  restart: {
    fontSize: '14px',
    padding: '5px'
  },
  space: {
    display: 'inline-block',
    width: '20px'
  }
};

export default styles;

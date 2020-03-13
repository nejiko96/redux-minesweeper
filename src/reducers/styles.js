import * as actionTypes from '../utils/actionTypes';
import stylesGen from '../utils/styles';

const initialState = stylesGen('green', 32);

const styles = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_THEME) {
    return stylesGen(action.theme, action.cellSize);
  }
  return state;
};

export default styles;

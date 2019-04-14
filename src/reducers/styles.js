import * as actionTypes from '../actions/actionTypes';
import stylesGen from '../utils/styles';

const initialState = stylesGen('green', 32);

const styles = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_THEME) {
    return stylesGen(action.theme, action.cellSize);
  } else {
    return state;
  }
};

export default styles;

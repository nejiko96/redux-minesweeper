import * as actionTypes from '../actions/actionTypes';
import stylesGen from '../utils/styles';

const initialState = stylesGen('green', 32);
// const initialState = stylesGen('MS', 16);

const styles = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_THEME) {
    return stylesGen(action.theme, state.cellSize);
  } else if (action.type === actionTypes.CHANGE_CELLSIZE) {
    return stylesGen(state.theme, action.cellSize);
  } else {
    return state;
  }
};

export default styles;

import * as actionTypes from '../utils/actionTypes';

const initialState = { level: 'easy' };

const settings = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_SIZE) {
    return {
      ...state,
      level: action.level,
      width: action.width,
      height: action.height,
      mines: action.mines,
    };
  }
  return state;
};

export default settings;

import * as actionTypes from '../actions/actionTypes';
import sizeGen from '../models/sizeModel';

const initialState = sizeGen({ level: 'easy' });

const settings = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_SIZE) {
    return sizeGen(action);
  } else {
    return state;
  }
};

export default settings;

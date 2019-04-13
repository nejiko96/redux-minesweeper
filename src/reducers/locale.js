import * as actionTypes from '../actions/actionTypes';
import localeGen from '../utils/locale';

const initialState = localeGen('en');

const locale = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_LANG) {
    return localeGen(action.lang);
  } else {
    return state;
  }
};

export default locale;

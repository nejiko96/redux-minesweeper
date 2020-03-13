import * as actionTypes from '../utils/actionTypes';
import localeGen from '../utils/locale';

const initialState = localeGen('en');

const locale = (state = initialState, action) => {
  if (action.type === actionTypes.CHANGE_LANG) {
    return localeGen(action.lang);
  }
  return state;
};

export default locale;

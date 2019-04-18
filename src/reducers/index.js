import { combineReducers } from 'redux';
import game from './game';
import timer from './timer';
import styles from './styles';
import locale from './locale';
import settings from './settings';
//import debug from './debug';

const reducer = combineReducers({
  game,
  timer,
  styles,
  locale,
  settings,
//  debug
});

export default reducer;
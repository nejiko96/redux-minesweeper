import { combineReducers } from 'redux';
import game from './game';
import timer from './timer';
import styles from './styles';
import locale from './locale';

const reducer = combineReducers({
  game,
  timer,
  styles,
  locale
});

export default reducer;

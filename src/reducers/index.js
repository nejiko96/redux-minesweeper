import { combineReducers } from 'redux';
import game from './game';
import timer from './timer';
import styles from './styles';

const reducer = combineReducers({
    game,
    timer,
    styles
});


export default reducer;

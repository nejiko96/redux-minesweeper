import { combineReducers } from 'redux';
import game from './game';
import timer from './timer';

const reducer = combineReducers({
    game,
    timer
});


export default reducer;

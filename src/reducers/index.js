import { combinedReducers } from 'redux';
import timer from './timer';

const reducer = combineReducers({
    timer
});


export default reducer;
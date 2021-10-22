import { combineReducers } from 'redux';
import { reducer } from './reducer';
import { reducerImageDate } from './reducerImageDate';


export const rootReducer = combineReducers({
    reduce: reducer,
    reduceImages: reducerImageDate,
});
import { combineReducers } from 'redux';
import { reducer } from './reducer';
import { reducerImageDate } from './reducerImageDate';
import { reducerAllUsers } from './reducerAllUsers';


export const rootReducer = combineReducers({
    reduce: reducer,
    reduceImages: reducerImageDate,
    reduceUsers: reducerAllUsers,
});
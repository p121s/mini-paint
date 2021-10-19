import { combineReducers } from 'redux';
import { reduser } from './reduser';


export const rootReduser = combineReducers({
    redus: reduser,
});
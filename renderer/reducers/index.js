import { combineReducers } from 'redux';
import connectionReducer from './connection.reducer';
import electronLocalReducer from './electron-local.reducer';

export default combineReducers({
    connectionReducer,
    electronLocalReducer
});
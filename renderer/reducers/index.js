import { combineReducers } from 'redux';
import mongoConnectionReducer from './mongo-connection.reducer';
import connectionManagerReducer from './connection-manager.reducer';

export default combineReducers({
    mongoConnectionReducer,
    connectionManagerReducer
});
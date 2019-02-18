import db from '../services/database';
import { ipcRenderer } from 'electron';

export const connectionManagerActionTypes = {
    UPDATE_CONNECTION_MANAGER_START: 'UPDATE_CONNECTION_MANAGER_START',
    UPDATE_CONNECTION_MANAGER_SUCCESS: 'UPDATE_CONNECTION_MANAGER_SUCCESS',
    UPDATE_CONNECTION_MANAGER_FAIL: 'UPDATE_CONNECTION_MANAGER_FAIL',
    SAVE_CONNECTION_MANAGER_START: 'SAVE_CONNECTION_MANAGER_START',
    SAVE_CONNECTION_MANAGER_SUCCESS: 'SAVE_CONNECTION_MANAGER_SUCCESS',
    SAVE_CONNECTION_MANAGER_FAIL: 'SAVE_CONNECTION_MANAGER_FAIL',
    GET_ALL_CONNECTION_MANAGER_START: 'GET_ALL_CONNECTION_MANAGER_START',
    GET_ALL_CONNECTION_MANAGER_SUCCESS: 'GET_ALL_CONNECTION_MANAGER_SUCCESS',
    GET_ALL_CONNECTION_MANAGER_FAIL: 'GET_ALL_CONNECTION_MANAGER_FAIL',
    REMOVE_CONNECTION_MANAGER_START: 'REMOVE_CONNECTION_MANAGER_START',
    REMOVE_CONNECTION_MANAGER_SUCCESS: 'REMOVE_CONNECTION_MANAGER_SUCCESS',
    REMOVE_CONNECTION_MANAGER_FAIL: 'REMOVE_CONNECTION_MANAGER_FAIL'
}

export const updateDataAction = (value) => {
    return dispatch => {
        dispatch({ type: connectionManagerActionTypes.UPDATE_CONNECTION_MANAGER_START });
        return db.connections.update({_id: value._id}, value, {returnUpdatedDocs: true}).then(database => {
            dispatch({ type: connectionManagerActionTypes.UPDATE_CONNECTION_MANAGER_SUCCESS, data: { database }});
        }).catch(error => {
            dispatch({ type: connectionManagerActionTypes.UPDATE_CONNECTION_MANAGER_FAIL, error });
        });
    };
}

export const saveDataAction = (value) => {
    return dispatch => {
        dispatch({ type: connectionManagerActionTypes.SAVE_CONNECTION_MANAGER_START});
        return db.connections.insert(value).then(database => {
            dispatch({ type: connectionManagerActionTypes.SAVE_CONNECTION_MANAGER_SUCCESS , data: { database }});
        }).catch(error => {
            dispatch({ type: connectionManagerActionTypes.CONNECTION_FAIL , error});
        });
      };
}


export const getAllDataAction = () => {
    return dispatch => {
        dispatch({ type: connectionManagerActionTypes.GET_ALL_CONNECTION_MANAGER_START });
        return db.connections.find()
            .then(connections => {
                 dispatch({ type: connectionManagerActionTypes.GET_ALL_CONNECTION_MANAGER_SUCCESS , data: { connections }});
            }).catch(error => {
                 dispatch({ type: connectionManagerActionTypes.GET_ALL_CONNECTION_MANAGER_FAIL , error});
            });
    }
}

export const removeDataAction = (_id) => {
    return dispatch => {
        dispatch({ type: connectionManagerActionTypes.REMOVE_CONNECTION_MANAGER_START });
        return db.connections.remove({ _id: _id })
            .then(status => {
                    if( status > 0) {
                        dispatch({ type: connectionManagerActionTypes.REMOVE_CONNECTION_MANAGER_SUCCESS});
                    } else {
                        dispatch({ type: connectionManagerActionTypes.REMOVE_CONNECTION_MANAGER_FAIL});
                    }
            }).catch(error => {
                 dispatch({ type: connectionManagerActionTypes.REMOVE_CONNECTION_MANAGER_FAIL , error});
            });
    }
}
import db from '../services/database';
import { tmpdir } from 'os';

export const electronLocalActionTypes = {
    SAVE_LOCAL_START: 'SAVE_LOCAL_START',
    SAVE_LOCAL_SUCCESS: 'SAVE_LOCAL_SUCCESS',
    SAVE_LOCAL_FAIL: 'SAVE_LOCAL_FAIL',
    GET_LOCAL_SUCCESS: 'GET_LOCAL_SUCCESS',
    GET_LOCAL_FAIL: 'GET_LOCAL_FAIL',
    GET_ALL_LOCAL_START: 'GET_ALL_LOCAL_START',
    GET_ALL_LOCAL_SUCCESS: 'GET_ALL_LOCAL_SUCCESS',
    GET_ALL_LOCAL_FAIL: 'GET_ALL_LOCAL_FAIL'
}

// const electronClient =  new ElectronLocal();

export const saveDataAction = (value) => {
    return dispatch => {
        dispatch({ type: electronLocalActionTypes.SAVE_LOCAL_START});
        return db.connections.insert(value).then(database => {
            dispatch({ type: electronLocalActionTypes.SAVE_LOCAL_SUCCESS , data: { database }});
        }).catch(error => {
            dispatch({ type: electronLocalActionTypes.CONNECTION_FAIL , error});
        });
      };
}

export const getDataAction = (key) => {

    try {
        const store = new ElectronStore({
            cwd: tmpdir()
        });
        const response = store.get(key);
        return { type: electronLocalActionTypes.GET_LOCAL_SUCCESS , data: { response }};

    } catch(error) {
        return { type: electronLocalActionTypes.GET_LOCAL_FAIL , error};
    }
}

export const getAllDataAction = () => {
    return dispatch => {
        dispatch({ type: electronLocalActionTypes.GET_ALL_LOCAL_START });
        return db.connections.find()
            .then(connections => {
                 dispatch({ type: electronLocalActionTypes.GET_ALL_LOCAL_SUCCESS , data: { connections }});
            }).catch(error => {
                 dispatch({ type: electronLocalActionTypes.GET_ALL_LOCAL_FAIL , error});
            });
    }
}
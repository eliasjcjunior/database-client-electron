import { connectionManagerActionTypes } from '../actions';

const initialReducer = {
    connections: [],
    connection: null
}

const reducer = (state = initialReducer, action) => {
    switch (action.type) {
        case connectionManagerActionTypes.SAVE_CONNECTION_MANAGER_START:
            return { ...state };
        case connectionManagerActionTypes.SAVE_CONNECTION_MANAGER_SUCCESS:
            return {...state };
        case connectionManagerActionTypes.SAVE_CONNECTION_MANAGER_FAIL:
            return {...state , error: action.error};
        case connectionManagerActionTypes.GET_ALL_CONNECTION_MANAGER_START:
            return {...state };
        case connectionManagerActionTypes.GET_ALL_CONNECTION_MANAGER_SUCCESS:
            return {...state , connections: action.data.connections};
        case connectionManagerActionTypes.GET_ALL_CONNECTION_MANAGER_FAIL:
            return {...state , error: action.error};
        case connectionManagerActionTypes.REMOVE_CONNECTION_MANAGER_START:
            return {...state };
        case connectionManagerActionTypes.REMOVE_CONNECTION_MANAGER_SUCCESS:
            return {...state };
        case connectionManagerActionTypes.REMOVE_CONNECTION_MANAGER_FAIL:
            return {...state , error: action.error};
        default:
            return state
    }
};

export default reducer;
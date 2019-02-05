import { electronLocalActionTypes } from '../actions';

const initialReducer = {
    connections: [],
    connection: null
}

const reducer = (state = initialReducer, action) => {
    console.log(action);
    switch (action.type) {
        case electronLocalActionTypes.SAVE_LOCAL_START:
            return { ...state };
        case electronLocalActionTypes.SAVE_LOCAL_SUCCESS:
            return {...state };
        case electronLocalActionTypes.SAVE_LOCAL_FAIL:
            return {...state , error: action.error};
        case electronLocalActionTypes.GET_LOCAL_SUCCESS:
            return {...state , connection: action.data.connection};
        case electronLocalActionTypes.GET_LOCAL_FAIL:
            return {...state , error: action.error};
        case electronLocalActionTypes.GET_ALL_LOCAL_START:
            return {...state };
        case electronLocalActionTypes.GET_ALL_LOCAL_SUCCESS:
            return {...state , connections: action.data.connections};
        case electronLocalActionTypes.GET_ALL_LOCAL_FAIL:
            return {...state , error: action.error};
        default:
            return state
    }
};

export default reducer;
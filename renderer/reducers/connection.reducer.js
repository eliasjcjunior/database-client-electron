import { connectionActionTypes } from '../actions';

const initialReducer = {
    data: {}
}

const reducer = (state = initialReducer, action) => {
    switch (action.type) {
        case connectionActionTypes.NEW_CONNECTION:
            return {...state , data: action.data};
        case connectionActionTypes.CONNECTION_SUCCESS:
            return {...state , data: action.data};
        case connectionActionTypes.CONNECTION_FAIL:
            return {...state , data: action.data};
        default:
            return state
    }
};

export default reducer;
import { mongoConnectionActionTypes } from '../actions';

const initialReducer = {
    collections: []
}

const reducer = (state = initialReducer, action) => {
    switch (action.type) {
        case mongoConnectionActionTypes.MONGO_CONNECTION_START:
            return {...state };
        case mongoConnectionActionTypes.MONGO_CONNECTION_SUCCESS:
            return {...state , collections: action.data.collections};
        case mongoConnectionActionTypes.MONGO_CONNECTION_FAIL:
            return {...state , error: action.error};
        default:
            return state
    }
};

export default reducer;
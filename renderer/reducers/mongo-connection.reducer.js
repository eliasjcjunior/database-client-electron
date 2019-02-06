import { mongoConnectionActionTypes } from '../actions';

const initialReducer = {
    connection: null
}

const reducer = (state = initialReducer, action) => {
    switch (action.type) {
        case mongoConnectionActionTypes.MONGO_CONNECTION_START:
            return {...state , data: action.data};
        case mongoConnectionActionTypes.MONGO_CONNECTION_SUCCESS:
            return {...state , data: action.data};
        case mongoConnectionActionTypes.MONGO_CONNECTION_FAIL:
            return {...state , data: action.data};
        default:
            return state
    }
};

export default reducer;
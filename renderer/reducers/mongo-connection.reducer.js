import { mongoConnectionActionTypes } from '../actions';

const initialReducer = {
    collections: [],
    collection: [],
    handleConnections: []
}

const reducer = (state = initialReducer, action) => {
    console.log(action);
    switch (action.type) {
        case mongoConnectionActionTypes.LIST_HANDLER_CONNECTIONS_START:
            return {...state };
        case mongoConnectionActionTypes.LIST_HANDLER_CONNECTIONS_SUCCESS:
            return {...state , handleConnections: action.data.handleConnections };
        case mongoConnectionActionTypes.LIST_HANDLER_CONNECTIONS_FAIL:
            return {...state , error: action.error};
        case mongoConnectionActionTypes.FIND_COLLECTION_START:
            return {...state };
        case mongoConnectionActionTypes.FIND_COLLECTION_SUCCESS:
            return {...state , collection: action.data.collection};
        case mongoConnectionActionTypes.FIND_COLLECTION_FAIL:
            return {...state , error: action.error};
        default:
            return state
    }
};

export default reducer;
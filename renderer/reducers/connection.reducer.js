import { actionsType } from '../actions';

const initialReducer = {
    status: false,
    data: {}
}

const reducer = (state = initialReducer, action) => {
    switch (action.type) {
        case actionsType.NEW_CONNECTION:
            return {...state , data: action.data};
        case actionsType.CONNECTION_SUCCESS:
            return {...state , data: action.data};
        default:
            return state
    }
};

export default reducer;
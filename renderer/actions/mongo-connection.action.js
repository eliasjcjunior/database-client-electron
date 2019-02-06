import { Connection } from '../services/mongo/connection';

export const mongoConnectionActionTypes = {
    MONGO_CONNECTION_START: 'MONGO_CONNECTION_START',
    MONGO_CONNECTION_SUCCESS: 'MONGO_CONNECTION_SUCCESS',
    MONGO_CONNECTION_FAIL: 'MONGO_CONNECTION_FAIL',
}

export const startConnection = (connectionOptions) => {

    const connec = new Connection(connectionOptions);

    return dispatch => {
        dispatch({ type: mongoConnectionActionTypes.MONGO_CONNECTION_START});
        return connec.getConnection().then(database => {
            dispatch({ type: mongoConnectionActionTypes.MONGO_CONNECTION_SUCCESS , data: { database }});
        }).catch(error => {
            dispatch({ type: mongoConnectionActionTypes.MONGO_CONNECTION_FAIL, error});
        });
      };
  }
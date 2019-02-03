import { Connection } from '../mongo/connection';

export const actionsType = {
    NEW_CONNECTION: 'NEW_CONNECTION',
    CONNECTION_SUCCESS: 'CONNECTION_SUCCESS',
    CONNECTION_FAIL: 'CONNECTION_FAIL',
}

export const startConnection = (connectionOptions) => {

    const connec = new Connection(connectionOptions);

    return dispatch => {
        dispatch({ type: actionsType.NEW_CONNECTION , data: { log: 'Connection Started'}});
        return connec.getConnection().then(database => {
            dispatch({ type: actionsType.CONNECTION_SUCCESS , data: { log: 'Connection Finished', database }});
        }).catch(error => {
            dispatch({ type: actionsType.CONNECTION_FAIL , data: { log: 'Connection Failed'}});
        });
      };
  }
export const actionsType = {
    NEW_CONNECTION: 'NEW_CONNECTION',
    CONNECTION_SUCCESS: 'CONNECTION_SUCCESS'
}

export const startConnection = () => {
    return dispatch => {
        dispatch({ type: actionsType.NEW_CONNECTION , data: { log: 'Connection started'}});
        setTimeout(() => {
            console.log('aqui');
            dispatch({ type: actionsType.CONNECTION_SUCCESS , data: { log: 'Connection finished'}});
        }, 5000);
      };
  }
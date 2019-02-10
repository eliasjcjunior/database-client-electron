import { Connection } from '../services/mongo/connection';

export const mongoConnectionActionTypes = {
    MONGO_CONNECTION_START: 'MONGO_CONNECTION_START',
    MONGO_CONNECTION_SUCCESS: 'MONGO_CONNECTION_SUCCESS',
    MONGO_CONNECTION_FAIL: 'MONGO_CONNECTION_FAIL',
}

export const startConnection = (connectionOptions) => {

    const connects = connectionOptions.map(item => {
        return new Connection(item).getConnection();
    });

    const getCollections = (clients, connects) => {
        return Promise.all(clients.map((client, index) => {
            return client.db(connects[index].db_name).listCollections().toArray();
        }));
    }

    const handleCollections = (connecCollections) => {
        return connecCollections.map(connecCollection => {
            return {
                name : connecCollection.connectionName,
                toggled : false,
                type : "connection",
                children: [{
                    name : connecCollection.database,
                    toggled : false,
                    type : "database",
                    children: [{
                        name: 'Collections',
                        type: 'collectionsFolder',
                        toggled : false,
                        children: connecCollection.collections.map(({name, type}) => {
                            return {
                                name,
                                type,
                                connection_id: connecCollection._id
                            }
                        })
                    }]
                }]
            }
        });
    }

    return dispatch => {
        dispatch({ type: mongoConnectionActionTypes.MONGO_CONNECTION_START});
        return Promise.all(connects).then(clients => {
            return getCollections(clients, connects).then(collections => {
                const connecCollections = collections.map((collection, index) => {
                    return {
                        ...connectionOptions[index],
                        collections:collection
                    }
                });
                dispatch({ type: mongoConnectionActionTypes.MONGO_CONNECTION_SUCCESS , data: { collections: handleCollections(connecCollections) }});
            });
        }).catch(error => {
            dispatch({ type: mongoConnectionActionTypes.MONGO_CONNECTION_FAIL, error});
        });
      };
  }
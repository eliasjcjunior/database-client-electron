import { Connection } from '../services/mongo/connection';
import db from '../services/database';

export const mongoConnectionActionTypes = {
    LIST_HANDLER_CONNECTIONS_START: 'LIST_HANDLER_CONNECTIONS_START',
    LIST_HANDLER_CONNECTIONS_SUCCESS: 'LIST_HANDLER_CONNECTIONS_SUCCESS',
    LIST_HANDLER_CONNECTIONS_FAIL: 'LIST_HANDLER_CONNECTIONS_FAIL',
    FIND_COLLECTION_SUCCESS: 'FIND_COLLECTION_SUCCESS',
    FIND_COLLECTION_FAIL: 'FIND_COLLECTION_FAIL',
    FIND_COLLECTION_START: 'FIND_COLLECTION_START'
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

    const handleConnections = (connecCollections) => {
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
        dispatch({ type: mongoConnectionActionTypes.LIST_HANDLER_CONNECTIONS_START});
        return Promise.all(connects).then(clients => {
            return getCollections(clients, connects).then(collections => {
                const connecCollections = collections.map((collection, index) => {
                    return {
                        ...connectionOptions[index],
                        collections:collection
                    }
                });
                clients.forEach(client => {
                    client.close();
                });
                dispatch({ type: mongoConnectionActionTypes.LIST_HANDLER_CONNECTIONS_SUCCESS , data: { handleConnections: handleConnections(connecCollections) }});
            });
        }).catch(error => {
            dispatch({ type: mongoConnectionActionTypes.LIST_HANDLER_CONNECTIONS_SUCCESS, error});
        });
      };
}

export const findCollection = (collection_name, connection_id) => {
    return dispatch => {
        dispatch({ type: mongoConnectionActionTypes.FIND_COLLECTION_START });
            return db.connections.findOne({ '_id': connection_id })
                .then(connection => {
                    return new Connection(connection).getConnection()
                        .then(client => {
                            return client.db(connection.database).collection(collection_name).find().limit(10).toArray()
                            .then(result => {
                                console.log(result);
                                dispatch({ type: mongoConnectionActionTypes.FIND_COLLECTION_SUCCESS , data: { collection: result }});
                            });
                        });
                })
                .catch(error => {
                    dispatch({ type: mongoConnectionActionTypes.FIND_COLLECTION_FAIL , error});
                });
    }
}
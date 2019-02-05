import { ConnectionOptions } from './types';
import { MongoClient } from 'mongodb';


export class Connection  {

    constructor(connectionOptions){
        this.connectionOptions = new ConnectionOptions(connectionOptions);
    }

    async getConnection() {
        const uri = this.connectionOptions.getConnectUri();
        return MongoClient.connect(uri, { useNewUrlParser: true });
    }
}
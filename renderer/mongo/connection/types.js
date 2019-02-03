export class ConnectionOptions  {

    constructor({username, password, host = 'localhost', port = '27017', database, connectUri = ''} = {}) {
        this.username = username;
        this.password = password;
        this.host = host;
        this.port = port;
        this.database = database;
        this.connectUri = connectUri;
    }

    getConnectUri() {
        if (this.connectUri.length > 0) {
            return this.connectUri;
        }
        return `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
    }
}
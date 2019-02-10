import React, {Component} from "react";
import {connect} from "react-redux";
import {ipcRenderer} from 'electron';
import TreeView from '../components/TreeView';
import data from '../data';
import { getAllDataAction, startConnection } from '../actions';

class Home extends Component {
    ipc = ipcRenderer || false;
    
    state = {
        connection: null,
        connections: [],
        collections: []
    };

    constructor(props) {
        super(props);
        this.getConnection = this.getConnection.bind(this);
        props.getAllDataAction();
        this.handleConnections();
    }
    
    getConnection() {
        if(this.ipc) {
            this.ipc.on('message', (e, args) => {
                console.log('event', e);
                console.log('args', args);
            })
        }
    }

    handleConnections() {
        const connections = [{
            connectUri: "",
            connectionName: "DB Example Mlab",
            database: "database_example",
            host: "ds119755.mlab.com",
            password: "database123",
            port: "19755",
            username: "root",
            _id: "123"
        }, {
            connectUri: "",
            connectionName: "Escolas Mlab",
            database: "escolas",
            host: "ds135704.mlab.com",
            password: "database123",
            port: "35704",
            username: "root",
            _id: "321"
        }];

       this.props.startConnection(connections);
    }

    loadCollection(node) {
        if(node.type === "collection") {
            console.log(node);
        }
    }
    

    render() {
        const { collections } = this.props;
        return (
            <div
                style={{
                margin: 10,
                marginTop: 20
            }}>
                <TreeView 
                    data={collections}
                    loadCollection={this.loadCollection}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        connection: state.connectionManagerReducer.connection,
        connections: state.connectionManagerReducer.connections,
        collections: state.mongoConnectionReducer.collections
    };
};

export default connect(mapStateToProps, { getAllDataAction, startConnection })(Home);

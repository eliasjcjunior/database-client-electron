import React, {Component} from "react";
import {connect} from "react-redux";
import {ipcRenderer} from 'electron';
import TreeView from '../components/TreeView';

import { getAllDataAction, startConnection, findCollection } from '../actions';

class Home extends Component {
    ipc = ipcRenderer || false;
    
    state = {
        connection: null,
        connections: [],
        handleConnections: []
    };

    constructor(props) {
        super(props);
        props.getAllDataAction();
        this.getConnection = this.getConnection.bind(this);
        this.loadCollection = this.loadCollection.bind(this);
    }

    componentDidUpdate(prevProps){
        const { connections , startConnection } = this.props;

        if (prevProps.connections !== connections) {
            startConnection(connections);
        }
    }
    
    getConnection() {
        if(this.ipc) {
            this.ipc.on('message', (e, args) => {
                console.log('event', e);
                console.log('args', args);
            })
        }
    }

    loadCollection(node) {
        if(node.type === "collection") {
            this.props.findCollection(node.name, node.connection_id)
        }
    }

    render() {
        const { handleConnections } = this.props;

        return (
            <div
                style={{
                margin: 10,
                marginTop: 20
            }}>
                <TreeView 
                    data={handleConnections}
                    loadCollection={this.loadCollection}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return { 
        collection: state.connectionManagerReducer.collection,
        connections: state.connectionManagerReducer.connections,
        handleConnections: state.mongoConnectionReducer.handleConnections
    };
};

export default connect(mapStateToProps, { getAllDataAction, startConnection, findCollection })(Home);

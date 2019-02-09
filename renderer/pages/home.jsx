import React, {Component} from "react";
import {connect} from "react-redux";
import { remote, ipcRenderer} from 'electron';
import TreeView from '../components/TreeView';
import data from '../data';

class Home extends Component {

    ipc = ipcRenderer || false

    state = {
        connection: null
    }

    constructor(props) {
        super(props);
        this.getConnection = this.getConnection.bind(this);
    }
    
    getConnection() {
        if(this.ipc) {
            this.ipc.on('message', (e, args) => {
                console.log('event', e);
                console.log('args', args);
            })
        }
    }
    

    render() {
        this.getConnection();
        return (
            <div
                style={{
                margin: 10,
                marginTop: 20
            }}>
                <TreeView data={data}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {connection: state.connectionManagerReducer.connection};
};

export default connect(mapStateToProps, {  })(Home);

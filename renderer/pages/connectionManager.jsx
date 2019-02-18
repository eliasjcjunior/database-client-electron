import React, {Component} from "react";
import {connect} from "react-redux";
import {getAllDataAction, removeDataAction, saveDataAction} from '../actions';
import {Button, Dropdown, Icon, Menu, Modal, Table} from 'antd';
import electron from 'electron';
import Settings from './connections/connection-settings';

class ConnectionManager extends Component {
  ipcRenderer = electron.ipcRenderer || false;
  defaultFormValues = {
    connectionName: {
      value: ''
    },
    host: {
      value: ''
    },
    port: {
      value: 3306
    },
    database: {
      value: ''
    },
    username: {
      value: ''
    },
    password: {
      value: ''
    }
  };
  state = {
    connections: [],
    connection: null,
    visible: false,
    modalTitle: '',
    fields: {...this.defaultFormValues},
    toBeUpdate: false,
    _id: ''
  };

  constructor(props) {
    super(props);
    this.saveConnection = this.saveConnection.bind(this);
    ConnectionManager.handleConnections = ConnectionManager.handleConnections.bind(this);
    this.removeConnection = this.removeConnection.bind(this);
    this.connect = this.connect.bind(this);
    this.openConnectionSettings = this.openConnectionSettings.bind(this);
    this.hide = this.hide.bind(this);
    this.props.getAllDataAction();
  }

  updateConnection() {
  }

  connect(connection) {
    this.ipcRenderer.send('call-home', {connection});
  }

  hide() {
    this.setState({
      visible: false
    });
  }

  openConnectionSettings(con = {}, toBeUpdate = false) {
    this.loadProps(con, toBeUpdate);
    const titlePrefix = "Connection Settings";
    const conName = con && con.connectionName ? con.connectionName : 'New Connection';
    const modalTitle = `${titlePrefix} - ${conName}`;
    this.setState({
      visible: true,
      modalTitle
    });
  }

  loadProps(props = {}, toBeUpdate = false) {
    const obj = this.defaultFormValues;
    const whitelist = ['connectionName', 'database', 'host', 'port', 'password', 'username', '_id'];
    for (const key of whitelist) {
      obj[key] = {
        value: props.hasOwnProperty(key) ? props[key] : ''
      };
    }
    this.setState({fields: {...obj}, toBeUpdate, _id: obj._id});
  };

  removeConnection(connection) {
    const {removeDataAction, getAllDataAction} = this.props;
    removeDataAction(connection._id);
    getAllDataAction();
  }

  saveConnection() {
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      connections: nextProps.connections,
      connection: nextProps.connection
    };
  }

  selectMenuItem(key, connection) {
    if (key === 'remove') {
      this.removeConnection(connection);
    } else if (key === 'edit') {
      this.openConnectionSettings(connection, true);
    }
  }

  handleInput(evt) {
    const changes = {};
    changes[evt.target.name] = evt.target.value;
    this.setState(changes);
  }

  static handleConnections(connections) {
    return connections.map(item => {
      return {
        ...item,
        key: item['_id'],
        ssl: 'N/A'
      }
    });
  }

  render() {
    const {connections} = this.props;
    const menu = (connection) => {
      return (
        <Menu onClick={({key}) => {
          this.selectMenuItem(key, connection)
        }}>
          <Menu.Item key="edit">
            <a>Edit</a>
          </Menu.Item>
          <Menu.Item key="remove">
            <a>Remove</a>
          </Menu.Item>
        </Menu>
      );
    };
    const columns = [{
      title: 'Connection Name',
      dataIndex: 'connectionName',
      key: 'connectionName',
      width: '25%',
      render: (text, record) => (
        <span>
          <Icon style={{fontSize: 13, marginRight: 5}} type="bulb" theme="twoTone" twoToneColor="red"/>
          <Icon type="poweroff" theme="twoTone" twoToneColor="blue"/>
          <span style={{fontWeight: 'bold'}}>{text}</span>
        </span>
      )
    }, {
      title: 'Host',
      dataIndex: 'host',
      key: 'host',
      width: '15%',
    }, {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '15%',
    }, {
      title: 'Database',
      dataIndex: 'database',
      key: 'database',
      width: '100px',
    }, {
      title: 'SSL',
      dataIndex: 'ssl',
      key: 'ssl',
      width: '10%',
    }, {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '25%',
      render: (text, record) => (
        <span>
          <Button onClick={() => {
            this.connect(record)
          }} style={{width: 70, marginRight: 10, paddingLeft: 5, paddingRight: 5}}>Connect</Button>
          <Dropdown overlay={menu(record)} trigger={['click']} placement="bottomCenter">
            <Button style={{width: 70}}>
              <Icon type="setting"/>
            </Button>
          </Dropdown>
        </span>
      ),
    }];
    return (
      <div style={{margin: 10, marginTop: 20}}>
        <div style={{marginBottom: 20}}>
          <Settings
            {...this.state.fields}
            title={this.state.modalTitle}
            visible={this.state.visible}
            hide={this.hide}
            toBeUpdated={this.state.toBeUpdate}
            _id={this.state._id}
          />
          <Button onClick={() => {
            this.openConnectionSettings()
          }} style={{backgroundColor: 'green', width: '150px', color: 'white'}}>
            Create Connection
          </Button>
        </div>
        <Table scroll={{y: 700}}
               pagination={false}
               dataSource={ConnectionManager.handleConnections(connections)}
               columns={columns}
               size="middle"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connections: state.connectionManagerReducer.connections,
    connection: state.connectionManagerReducer.connection
  };
};

export default connect(mapStateToProps, {saveDataAction, getAllDataAction, removeDataAction})(ConnectionManager);

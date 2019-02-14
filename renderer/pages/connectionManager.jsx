import React, {Component} from "react";
import {connect} from "react-redux";
import {getAllDataAction, removeDataAction, saveDataAction} from '../actions';
import {Button, Dropdown, Icon, Menu, Modal, Table} from 'antd';
import electron from 'electron';
import Settings from './connections/connection-settings';

class ConnectionManager extends Component {
  ipcRenderer = electron.ipcRenderer || false;
  selectedConnection = {};
  state = {
    connections: [],
    connection: null,
    visible: false
  };

  constructor(props) {
    super(props);
    this.saveConnection = this.saveConnection.bind(this);
    ConnectionManager.handleConnections = ConnectionManager.handleConnections.bind(this);
    this.removeConnection = this.removeConnection.bind(this);
    this.connect = this.connect.bind(this);
    this.openConnectionSettings = this.openConnectionSettings.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.props.getAllDataAction();
  }

  static updatableProp(property) {
    const whitelist = ['connectionName', 'database', 'host', 'port', 'password', 'username'];
    return whitelist.indexOf(property) >= 0;
  }

  updateConnection() {
  }

  connect(connection) {
    this.ipcRenderer.send('call-home', {connection});
  }

  openConnectionSettings(connection) {
    this.loadProps(connection);
    this.setState({
      visible: true
    });
  }

  hideModal() {
    this.setState({
      visible: false
    });
  }

  loadProps(props) {
    const obj = {
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
    for (const key in props) {
      if (props.hasOwnProperty(key) && ConnectionManager.updatableProp(key)) {
        obj[key] = {
          value: props[key]
        };
      }
    }
    this.setState({fields: {...obj}});
  };

  removeConnection() {
    const {removeDataAction, connection, getAllDataAction} = this.props;
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

  selectMenuItem(key) {
    if (key === 'remove') {
      this.removeConnection();
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

    const menu = (
      <Menu onClick={({key}) => {
        this.selectMenuItem(key)
      }}>
        <Menu.Item key="edit">
          <a>Edit</a>
        </Menu.Item>
        <Menu.Item key="remove">
          <a>Remove</a>
        </Menu.Item>
      </Menu>
    );

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
            this.openConnectionSettings(record)
          }} style={{width: 70, marginRight: 10, paddingLeft: 5, paddingRight: 5}}>Connect</Button>
          <Dropdown onClick={() => {
            this.openConnectionSettings(record)
          }} overlay={menu} trigger={['click']} placement="bottomCenter">
            <Button style={{width: 70}}>
              <Icon type="setting"/>
            </Button>
          </Dropdown>
        </span>
      ),
    }];
    const titlePrefix = "Connection Settings";
    const conName = this.selectedConnection && this.selectedConnection.connectionName ?
      this.selectedConnection.connectionName : 'New Connection';
    const modalTitle = `${titlePrefix} - ${conName}`;
    const fields = this.state.fields;
    return (
      <div style={{margin: 10, marginTop: 20}}>
        <div style={{marginBottom: 20}}>
          <Modal
            title={modalTitle}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[]}
          >
            <Settings
              {...fields}
              hide={this.hideModal}
            />
          </Modal>
          <Button onClick={() => {
            this.openConnectionSettings()
          }} style={{backgroundColor: 'green', width: '150px', color: 'white'}}>
            Create Connection
          </Button>
        </div>
        <Table scroll={{y: 300}} pagination={false} dataSource={ConnectionManager.handleConnections(connections)} columns={columns}
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

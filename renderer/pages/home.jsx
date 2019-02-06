import React, {Component} from "react";
import {connect} from "react-redux";
import { saveDataAction, getAllDataAction, removeDataAction, selectConnectionAction } from '../actions';
import {  Button, Table, Icon, Menu, Dropdown } from 'antd';
import { remote } from 'electron';

const isProd = process.env.NODE_ENV === 'production';

let newWindow = null;

const connectionObj = {
  username: 'eliasjcjunior',
  password: '123',
  host: 'ggg.com.br',
  port: '222',
  database: 'db_mongo',
  connectUri: '',
  connectionName: 'AWSMongo'
}

class Page extends Component {

  state = {
    connections: [],
    connection: null
  }

  constructor(props) {
    super(props);
    this.openScreenAddConnection = this.openScreenAddConnection.bind(this);
    this.selectConnectionByMenu = this.selectConnectionByMenu.bind(this);
    this.saveConnection = this.saveConnection.bind(this);
    this.handleConnections = this.handleConnections.bind(this);
    this.removeConnection = this.removeConnection.bind(this);
    this.props.getAllDataAction();
  }

  openScreenAddConnection () {

    if (newWindow) {
      newWindow.focus()
      return
    }
  
    newWindow = new remote.BrowserWindow({
      height: 800,
      resizable: false,
      width: 1000,
      title: 'Add connection',
      maximizable: false,
    });

    if (isProd) {
      const homeFile = join(app.getAppPath(), 'app/home/index.html')
      mainWindow.loadFile(homeFile)
    } else {
      const homeUrl = 'http://localhost:8888/home'
      mainWindow.loadURL(homeUrl);
    }
  
    newWindow.on('closed', function() {
      newWindow = null
    })
  }

  updateConnection() {

  }

  removeConnection() {
    const { removeDataAction, connection, getAllDataAction } = this.props;
    removeDataAction(connection._id);
    getAllDataAction();
  }

  saveConnection() {
    this.props.saveDataAction(connectionObj);
    this.props.getAllDataAction();
  }


  static getDerivedStateFromProps(nextProps) {
      return {
        connections: nextProps.connections,
        connection: nextProps.connection
      };
  }

  selectConnectionByMenu(connection) {
    this.props.selectConnectionAction(connection);
  }

  selectMenuItem(key){
    if (key === 'remove') {
      this.removeConnection();
    }
  }
  

  handleInput(evt) {
    const changes = {};
    changes[evt.target.name] = evt.target.value;
    this.setState(changes);
  }

  handleConnections(connections) {
    return connections.map(item => {
      return {
        ...item,
        key: item['_id'],
        ssl: 'N/A'
      }
    });
  }

  render() {

    const { connections } = this.props;

    const menu = (
      <Menu onClick={({ key }) => {this.selectMenuItem(key)}}>
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
          <Icon style={{fontSize: '13px'}} type="bulb" theme="twoTone" twoToneColor="red" />
          <Icon type="poweroff" theme="twoTone" twoToneColor="blue" />
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
          <Button style={{width: '60px', marginRight: '10px'}}>Test</Button>
          <Dropdown onClick={() => {this.selectConnectionByMenu(record)}} overlay={menu} trigger={['click']} placement="bottomCenter">
            <Button style={{width: '60px'}}>
              <Icon type="setting" />
            </Button>
          </Dropdown>
        </span>
      ),
    }];

    return (
      <div style={{ margin: 10, marginTop: 20}}>
        <div style={{ marginBottom: 20}}>
          <Button onClick={() => this.saveConnection()} style={{backgroundColor: 'green', width: '150px', color: 'white'}}>
            Create Connection
          </Button>
        </div>
        <Table scroll={{y: 300}} pagination={false} dataSource={this.handleConnections(connections)} columns={columns} size="middle"/>
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

export default connect(mapStateToProps, { saveDataAction, getAllDataAction, removeDataAction, selectConnectionAction })(Page);
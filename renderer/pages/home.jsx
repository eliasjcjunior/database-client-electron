import React, {Component} from "react";
import {connect} from "react-redux";
import { saveDataAction, getAllDataAction } from '../actions';
import {  Button, Table, Icon } from 'antd';
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
    selectedRow: null,
    connection: null
  }

  constructor(props) {
    super(props);
    this.openScreenAddConnection = this.openScreenAddConnection.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.saveConnection = this.saveConnection.bind(this);
    this.handleConnections = this.handleConnections.bind(this);
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

  }

  saveConnection() {
    this.props.saveDataAction(connectionObj);
    this.props.getAllDataAction();
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.someValue !== prevState.someValue) {
      return {
        connections: nextProps.connections,
        connection: nextProps.connection
      };
    }
    else return null;
  }

  selectRow(selectRow, index) {
    const dataSource = this.state.dataSource.map(item => { 
      return {
        ...item,
        selected: false
      }
     });
    dataSource[index].selected = true;
    this.setState({ selectRow, dataSource }); 
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
        key: item['_id']
      }
    });
  }

  render() {
    
    const columns = [{
      title: 'Connection Name',
      dataIndex: 'connectionName',
      key: 'connectionName',
    }, {
      title: 'Database',
      dataIndex: 'database',
      key: 'database',
    }, {
      title: 'Last Connection',
      dataIndex: 'lastConnection',
      key: 'lastConnection',
    }];

    const { connections } = this.props;
    

    return (
      <div style={{ margin: 10, marginTop: 20}}>
        <div style={{ marginBottom: 20}}>
          <Button onClick={() => this.saveConnection()} style={{backgroundColor: 'green'}}>
            <Icon style={{ fontSize: 20, color: 'white' }} type="plus" />
          </Button>
          <Button style={{backgroundColor: '#FFBD33', marginLeft: 10}}>
            <Icon style={{ fontSize: 20, color: 'white' }} type="edit" />
          </Button>
          <Button style={{backgroundColor: 'red', marginLeft: 10}}>
           <Icon style={{ fontSize: 20, color: 'white'}} type="close" />
          </Button>
        </div>
        <Table rowClassName={ (record) => {
          return record.selected ? 'change_color' : 'row'
        } } onRow={(record, index) => {
          return {
            onClick: () => {
              this.selectRow(record, index);
            }
          }
        }} bordered pagination={false} dataSource={this.handleConnections(connections)} columns={columns} size="middle"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connections: state.electronLocalReducer.connections,
    connection: state.electronLocalReducer.connection
  };
};

export default connect(mapStateToProps, { saveDataAction, getAllDataAction })(Page);
import React, {Component} from "react";
import {connect} from "react-redux";
import { startConnection } from '../actions';
import { Input, Button, List, Table, Icon } from 'antd';
import { remote } from 'electron';

const isProd = process.env.NODE_ENV === 'production';

let newWindow = null;

class Page extends Component {

  state = {
    dataSource: [],
    selectedRow: null
  }

  constructor(props) {
    super(props);
    this.openScreenAddConnection = this.openScreenAddConnection.bind(this);
    this.listConnections = this.listConnections.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }

  componentWillMount() {
    this.listConnections();
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
  
  listConnections() {
    this.setState({
      dataSource: [{
        key: '1',
        connectionName: 'AWSMongoDB',
        database: 'mongo_db_production',
        lastConnection: '02-04-2019 - 16:37',
        selected: false
      }, {
        key: '2',
        connectionName: 'AzureMongoDB',
        database: 'mongo_db_stg',
        lastConnection: '01-15-2019 - 09:12',
        selected: false
      }]
    })
  }

  handleInput(evt) {
    const changes = {};
    changes[evt.target.name] = evt.target.value;
    this.setState(changes);
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

    const { dataSource } = this.state;

    return (
      <div style={{ margin: 10, marginTop: 20}}>
        <div style={{ marginBottom: 20}}>
          <Button onClick={() => this.openScreenAddConnection()} style={{backgroundColor: 'green'}}>
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
        }} bordered pagination={false} dataSource={dataSource} columns={columns} size="middle"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    log: state.connectionReducer.data.log
  };
};

export default connect(mapStateToProps, { startConnection })(Page);
import React, {Component} from "react";
import {connect} from "react-redux";
import { startConnection } from '../actions';
import { Input, Button } from 'antd';


class Page extends Component {

  state = {
    log: 'Disconnected',
    host: '',
    password: '',
    port: '',
    username: '',
    database: ''
  }

  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  
  componentWillReceiveProps(props) {
    this.setState({
      log: props.log
    })
  }

  connect() {
    const { host, password, username, port, database} = this.state;

    this.props.startConnection({
      username,
      password,
      host,
      port,
      database
    });
  }

  handleInput(evt) {
    const changes = {};
    changes[evt.target.name] = evt.target.value;
    this.setState(changes);
  }

  render() {

    const { host, password, username, port, database } = this.state;

    return (
      <div style={{ padding: 20 }}>
        <Input value={host} name="host" placeholder="Host" onChange = {this.handleInput}/>
        <Input  value={password} name="password" placeholder="Password" onChange = {this.handleInput}/>
        <Input  value={username} name="username" placeholder="Username" onChange = {this.handleInput}/>
        <Input  value={port} name="port" placeholder="Port" onChange = {this.handleInput}/>
        <Input  value={database} name="database" placeholder="Database" onChange = {this.handleInput}/>
        <Button type="primary" onClick = {() => this.connect()}>
          Connect
        </Button>
        <div>Prop from Redux {this.state.log}</div>
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
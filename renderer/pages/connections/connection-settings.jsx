import React, { Component } from "react";
import { connect } from "react-redux";
import { startConnection, saveDataAction, getAllDataAction } from '../../actions';
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Tabs } from 'antd';
import electron from 'electron';

const InputGroup = Input.Group;

class Settings extends Component {
  ipcRenderer = electron.ipcRenderer || false;
  BrowserWindow = electron.BrowserView || false;

  state = {
    connections: [],
    connection: null,
    confirmDirty: false,
    autoCompleteResult: [],
    loading: false,
    loadingIcon: false,
    performAuth: true,
    form: {}
  };

  constructor(props) {
    super(props);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  callConnectionManager = () => {
    this.ipcRenderer.send('call-connection-manager');
  }

  getConnection = () => {
    if (this.ipc) {
      this.ipc.on('message', (e, args) => {
        console.log('event', e);
        console.log('args', args);
        this.setState(args);
      })
    }
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleInput = e => {
    const changes = {};
    changes[e.target.name] = e.target.value;
    this.setState(changes);
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.callConnectionManager();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.saveDataAction(values);
        this.props.getAllDataAction();
        this.callConnectionManager();
      }
    });
  };

  toggleChecked = () => {
    this.setState({ performAuth: !this.state.performAuth });
  };

  render() {
    this.getConnection();
    const TabPane = Tabs.TabPane;
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: 10 }}>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Connection" key="1">
              <Form.Item
                label='Name'
              >
                {getFieldDecorator('connectionName', {
                  rules: [{
                    required: true, message: 'Please define your connection name.'
                  }]
                })(
                  <Input name='connectionName' />
                )}
              </Form.Item>
              <Form.Item
                label='Address'
              >
                <InputGroup compact>
                  {getFieldDecorator('host', {
                    rules: [{
                      required: true,
                      message: 'An IP address is required to connect.'
                    }]
                  })(
                    <Input
                      style={{ width: '80%' }}
                      placeholder='Address'
                      name='host'
                    />
                  )}
                  {getFieldDecorator('port', {
                    rules: [{
                      required: true,
                      message: 'An IP port is required to connect.'
                    }],
                    option: {
                      initialValue: 3306
                    }
                  })(
                    <InputNumber
                      style={{ width: '20%' }}
                      min={0}
                      max={65535}
                      placeholder='Port'
                      name='port'
                    />
                  )}
                </InputGroup>
              </Form.Item>
            </TabPane>
            <TabPane tab="Authentication" key="2">
              <div>
                <p style={{ marginBottom: '20px' }}>
                  <Checkbox
                    checked={this.state.performAuth}
                    onClick={this.toggleChecked}
                  >
                    Perform Authentication
                  </Checkbox>
                </p>
              </div>
              <Form.Item
                label='Database Name'
              >
                {getFieldDecorator('database', {
                  rules: [{
                    required: this.state.performAuth,
                    message: 'Please define specify your database name.'
                  }]
                })(
                  <Input
                    name='database'
                    disabled={!this.state.performAuth}
                  />
                )}
              </Form.Item>
              <Form.Item
                label='User Name'
              >
                {getFieldDecorator('username', {
                  rules: [{
                    required: this.state.performAuth,
                    message: 'Please define your user name.'
                  }]
                })(
                  <Input
                    name='username'
                    disabled={!this.state.performAuth}
                  />
                )}
              </Form.Item>
              <Form.Item
                label='Password'
              >
                <InputGroup compact>
                  {getFieldDecorator('password', {
                    rules: [{
                      required: false,
                      message: 'An IP address is required to connect.'
                    }]
                  })(
                    <Input.Password
                      placeholder='Password'
                      name='password'
                      disabled={!this.state.performAuth}
                    />
                  )}
                </InputGroup>
              </Form.Item>
            </TabPane>
          </Tabs>
          <div>
            <Row>
              <Col span={15}></Col>
              <Col span={9}>
                <Row>
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connection: state.connectionManagerReducer.connection
  };
};

const WrappedClass = Form.create({ name: 'settings' })(Settings);

export default connect(mapStateToProps, { startConnection, saveDataAction, getAllDataAction })(WrappedClass);
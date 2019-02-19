import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllDataAction, saveDataAction, startConnection, updateDataAction } from '../../actions';
import { Checkbox, Form, Input, InputNumber, Modal, Tabs } from 'antd';

const InputGroup = Input.Group;
class Settings extends Component {
  state = {
    connections: [],
    connection: null,
    confirmDirty: false,
    autoCompleteResult: [],
    performAuth: true,
    visible: false,
    title: 'Connection Settings - New Connection',
    form: {}
  };

  constructor(props) {
    super(props);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleInput = e => {
    const changes = {};
    changes[e.target.name] = e.target.value;
    this.setState(changes);
  };

  handleReset = (callback) => {
    this.props.form.resetFields();
    callback();
  };

  handleSubmit = (callback) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.toBeUpdated) {
          this.props.updateDataAction({...values, _id: this.props._id.value});
          this.props.getAllDataAction();
        } else {
          this.props.saveDataAction(values);
          this.props.getAllDataAction();
        }
        callback();
      }
    });
  };

  toggleChecked = () => {
    this.setState({ performAuth: !this.state.performAuth });
  };

  render() {
    const TabPane = Tabs.TabPane;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onOk={() => { this.handleSubmit(this.props.hide) }}
        onCancel={() => { this.handleReset(this.props.hide) }}
      >
        <div style={{ margin: 10 }}>
          <Form>
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
          </Form>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connection: state.connectionManagerReducer.connection
  };
};

const WrappedClass = Form.create({
  name: 'settings',
  mapPropsToFields(props) {
    return {
      connectionName: Form.createFormField({
        ...props.connectionName,
        value: props && props.connectionName && props.connectionName.value ? props.connectionName.value : ''
      }),
      host: Form.createFormField({
        ...props.host,
        value: props && props.host && props.host.value ? props.host.value : ''
      }),
      port: Form.createFormField({
        ...props.port,
        value: props && props.port && props.port.value ? props.port.value : ''
      }),
      database: Form.createFormField({
        ...props.database,
        value: props && props.database && props.database.value ? props.database.value : ''
      }),
      username: Form.createFormField({
        ...props.username,
        value: props && props.username && props.username.value ? props.username.value : ''
      }),
      password: Form.createFormField({
        ...props.password,
        value: props && props.password && props.password.value ? props.password.value : ''
      })
    };
  }
})(Settings);

export default connect(mapStateToProps, { startConnection, saveDataAction, getAllDataAction, updateDataAction })(WrappedClass);
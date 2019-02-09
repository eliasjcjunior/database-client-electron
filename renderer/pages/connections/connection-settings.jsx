import React, { Component } from "react";
import { connect } from "react-redux";
import { startConnection, saveDataAction, getAllDataAction } from '../../actions';
import { Button, Checkbox, Form, Input, InputNumber, Select, Tabs } from 'antd'

const InputGroup = Input.Group;
const { Option } = Select;

class Settings extends Component {
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
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleInput(evt) {
    const changes = {};
    changes[evt.target.name] = evt.target.value;
    this.setState(changes);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.saveDataAction(values);
        this.props.getAllDataAction();
      }
    });
  };

  toggleChecked = () => {
    this.setState({ performAuth: !this.state.performAuth });
  }

  render() {
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
                      message: 'An IP adcheckedect.'
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
                    onClick={() => this.toggleChecked}
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
          </Button>
          </Form.Item>
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
import React, { Component } from "react";
import { connect } from "react-redux";
import { startConnection } from '../../actions';
import { Form, Input, InputNumber, Select, Tabs } from 'antd'

const InputGroup = Input.Group;
const { Option } = Select;

class ConnectionSettings extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  constructor(props) {
    super(props);
    this.selectRow = this.selectRow.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

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

  callback(key) {
    console.log(key);
  }

  render() {
    const TabPane = Tabs.TabPane;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const ipPattern = /^\d{1,3}(\.\d{1,3}){3}\/*\d{0,2}$/;
    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Connection" key="1">
          <Form>
            <Form.Item
              label='Name'
            >
              {getFieldDecorator('connectionName', {
                rules: [{
                  required: true, message: 'Please define your connection name.'
                }]
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              label='Address'
            >
              <InputGroup compact>
                {getFieldDecorator('addressNumber', {
                  rules: [{
                    required: true, message: 'An IP address is required to connect.'
                  }]
                })(
                  <InputNumber
                    style={{ width: '80%' }}
                    placeholder='Address'
                  />
                )}
                {getFieldDecorator('portNumber', {
                  rules: [{
                    required: true, message: 'An IP address is required to connect.'
                  }]
                })(
                  <InputNumber
                    style={{ width: '20%' }}
                    defaultValue={3306}
                    min={0}
                    max={99999}
                    placeholder='Port'
                  />
                )}
              </InputGroup>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Authentication" key="2">
          Auth Form
        </TabPane>
      </Tabs>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    //log: state.connectionReducer.data.log
  };
};

const WrappedClass = Form.create({ name: 'conSettings' })(ConnectionSettings);

export default connect(mapStateToProps, { startConnection })(WrappedClass);
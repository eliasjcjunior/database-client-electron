import React, {Component} from "react";
import {connect} from "react-redux";
import {startConnection} from '../../actions';
import {Form, Input, Select, Tabs} from 'antd'

const {Option} = Select;

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
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  selectRow(selectRow, index) {
    const dataSource = this.state.dataSource.map(item => {
      return {
        ...item,
        selected: false
      }
    });
    dataSource[index].selected = true;
    this.setState({selectRow, dataSource});
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
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    return (
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Connection" key="1">
          <Form>
            <Form.Item
              label='Name'
            >
              {getFieldDecorator('connectionName', {
                rules: [{
                  required: true, message: 'Please define your connection name!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Authentication" key="2">Auth Form</TabPane>
      </Tabs>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    log: state.connectionReducer.data.log
  };
};

const WrappedClass = Form.create({ name: 'connectionSettings' })(ConnectionSettings);

export default connect(mapStateToProps, {startConnection})(WrappedClass);
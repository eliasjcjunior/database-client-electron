import React, {Component} from "react";
import {connect} from "react-redux";
import { startConnection } from '../actions';

class Page extends Component {

  state = {
    log: null
  }

  constructor(props) {
    super(props);
    this.props.startConnection();
  }
  
  componentWillReceiveProps(props) {
    this.setState({
      log: props.log
    })
  }

  render() {
    
    return (
      <div>
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
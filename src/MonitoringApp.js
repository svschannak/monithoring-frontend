import React, { Component } from 'react';
import './App.css';
import Editor from './Editor';
import MonitoredItemList from './MonitoredItemList';
import MonitoringStatusTable from './MonitoringStatusTable';

export default class MonitoringApp extends Component {

  constructor(){
    super();

    var editor_config = {
      current_key: '',
      current_url: '',
      current_name: '',
      current_selector: '',
      current_operator: 'exists',
      current_value: '',
      current_results : false
    }

    this.state = {
      editor_active: '',
      editor_config: editor_config
    }
  }

  setStateForForm(field_name, value) {
    /* manipulates the current array for the editor to set the new state */
    var returnObj = this.state.editor_config;
    returnObj[field_name] = value;
    return returnObj;
  };

  change_input_value(field_name, value, type){
    this.setState({
      editor_config: this.setStateForForm(field_name, value)
    });
  }

  api_create_new_monitoring(name, url, selector, operator, value){
    console.log(name, url, selector, operator, value);
    var result = this.props.firebaseApp.database().ref('user/' + this.props.currentUser + "/monitoring/").push({
      name: name,
      url: url,
      selector: selector,
      operator: operator,
      value: value
    });

    this.setState({
      current_key: result.key
    });
  };

  create_monitoring_from_editor(){
    this.api_create_new_monitoring(this.state.editor_config.current_name, this.state.editor_config.current_url, this.state.editor_config.current_selector, this.state.editor_config.current_operator, this.state.editor_config.current_value);
  };

  change_current_editor_data(key, url, name, selector, operator, value, results){
    console.log(results);
    this.setState({
      editor_config: {
        current_key: key,
        current_url: url,
        current_name: name,
        current_selector: selector,
        current_operator: operator,
        current_value: value,
        current_results: results
      }
    })
  }

  handleLogout(e){
    this.props.firebaseApp.auth().signOut();
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          <MonitoredItemList currentUser={this.props.currentUser} firebaseApp={this.props.firebaseApp} changeCurrentEditorData={this.change_current_editor_data.bind(this)} />
          <button className="btn btn-block" onClick={this.handleLogout.bind(this)}>Logout</button>
        </div>
        <div className="col-md-10">
          <Editor editorConfig={this.state.editor_config} changeInputValue={this.change_input_value.bind(this)} createMonitoringFromEditor={this.create_monitoring_from_editor.bind(this)} />
          <MonitoringStatusTable results={this.state.editor_config.current_results}/>
        </div>
      </div>
    );
  }
}

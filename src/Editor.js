import React, { Component } from 'react';

export default class Editor extends Component {

  handleSubmit(e){
    e.preventDefault();
    this.props.createMonitoringFromEditor();
  }

  handleChange(e){
    this.props.changeInputValue(e.target.name, e.target.value, e.target.type);
  }

  render(){
    return(
      <div>
        <h2>Add new item to be monitored</h2>
        <hr/>
        <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label className="col-md-2 control-label">Name</label>
            <div className="col-md-10">
              <input type="text" className="form-control" placeholder="Name" name="current_name" value={this.props.editorConfig.current_name} onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">URL</label>
            <div className="col-md-10">
              <input type="url" className="form-control" placeholder="URL" name="current_url" value={this.props.editorConfig.current_url} onChange={this.handleChange.bind(this)} />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">X-Path</label>
            <div className="col-md-10">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="CSS Selector" name="current_selector" value={this.props.editorConfig.current_selector} onChange={this.handleChange.bind(this)} />
                <div className="input-group-addon"><span className="glyphicon glyphicon-question-sign"></span></div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">Operator</label>
            <div className="col-md-10">
              <select className="form-control" name="current_operator" value={this.props.editorConfig.current_operator} onChange={this.handleChange.bind(this)}>
                <option value="exists">exists</option>
                <option value="equal to">equal to</option>
                <option value="larger than">larger than</option>
                <option value="less than">less than</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">Comparison Value</label>
            <div className="col-md-10">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Comparison Value"  name="current_value" value={this.props.editorConfig.current_value} onChange={this.handleChange.bind(this)} />
                <div className="input-group-addon"><span className="glyphicon glyphicon-question-sign"></span></div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit" className="btn btn-default">Add new Monitored Item</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

}

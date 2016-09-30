import React, { Component } from 'react';

export default class MonitoredItemListItem extends Component{

  handleClick = () => {
    this.props.changeCurrentEditorData(
      this.props.monitoring.key,
      this.props.monitoring.url,
      this.props.monitoring.name,
      this.props.monitoring.selector,
      this.props.monitoring.operator,
      this.props.monitoring.value,
      this.props.monitoring.results
    )
  }

  render(){
    return(
      <li className="list-group-item monitoring-list-item" onClick={this.handleClick}>
      {/*
        <span className="badge">14</span>
        <span className="badge warning">14</span>
      */}
        {this.props.monitoring.name}
      </li>
    )
  }
}

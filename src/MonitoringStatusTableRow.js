import React, { Component } from 'react';
import moment from 'moment';

export default class MonitoringStatusTableRow extends Component {

  render(){
    this.nice_date = moment.unix(this.props.result.timestamp).format("DD.MM.YYYY HH:MM");
    if(this.props.result.status=="ERROR"){
      return(
        <tr className="danger">
          <td>{this.nice_date}</td>
          <td>{this.props.result.status}</td>
          <td>{this.props.result.reason}</td>
          <td><a href={this.props.result.screenshot} className="btn btn-xs btn-primary">View Screenshot</a></td>
        </tr>
      )
    }else{
      return(
        <tr>
          <td>{this.nice_date}</td>
          <td>{this.props.result.status}</td>
          <td>{this.props.result.reason}</td>
          <td><a href={this.props.result.screenshot} className="btn btn-xs btn-primary">View Screenshot</a></td>
        </tr>
      )
    }

  }
}

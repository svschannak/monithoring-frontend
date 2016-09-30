import React, { Component } from 'react';
import MonitoringStatusTableRow from './MonitoringStatusTableRow';

export default class MonitoringStatusTable extends Component {

  render(){

    if(this.props.results){
      this.props.results.map(function(listValue, key){
        console.log(listValue);
      }, this)
      return(
        <div>
        <hr/>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Date of execution</th>
                  <th>Status</th>
                  <th>Error Message</th>
                  <th>Screenshot</th>
                </tr>
              </thead>
              <tbody>
              {this.props.results.map(function(listValue, key){
                return <MonitoringStatusTableRow result={listValue} key={key} />
              }, this)}
              </tbody>
            </table>
          </div>
        </div>
      )
    }else{
      return(
        <div>
        <hr/>
        <h2>No monitoring data.</h2>
        </div>
      )
    }

  }
}

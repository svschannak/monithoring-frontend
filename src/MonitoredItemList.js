import React, { Component } from 'react';
import MonitoredItemListItem from './MonitoredItemListItem';

export default class MonitoredItemList extends Component {

  constructor(){
    super();
    this.state = {
      monitoringList: []
    }
  }

  get_monitoring_array(dataSnapshot){
    var results = dataSnapshot.val().results;
    if(results){
      var result_array = Object.keys(results).map(function (key) { return results[key]; });
    }else{
      var result_array = [];
    }

    return {
      'id': dataSnapshot.key,
      'name': dataSnapshot.val().name,
      'url': dataSnapshot.val().url,
      'selector': dataSnapshot.val().selector,
      'operator': dataSnapshot.val().operator,
      'value': dataSnapshot.val().value,
      'results': result_array
    }
    console.log(dataSnapshot.val().results);
  };

  componentWillMount() {
    var monitoring_list = [];
    this.props.firebaseApp.database().ref('user/' + this.props.currentUser + "/monitoring/").on("child_added", function(dataSnapshot) {
      monitoring_list.unshift(this.get_monitoring_array(dataSnapshot));
      console.log(dataSnapshot);
      this.setState({
        monitoringList: monitoring_list
      });

    }.bind(this));
  }

  render() {
    return (
      <div className="monitoring-list">
        <div className="panel panel-default">
          <div className="panel-body">
            <strong>Active monitorings</strong>
          </div>
          <ul className="list-group">
          {this.state.monitoringList.map(function(listValue){
            return <MonitoredItemListItem monitoring={listValue} key={listValue.id} changeCurrentEditorData={this.props.changeCurrentEditorData.bind(this)} />;
          }, this)}
          </ul>
        </div>
      </div>
    );
  }
}

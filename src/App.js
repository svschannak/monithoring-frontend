import React, { Component } from 'react';
import './App.css';
import './Spinner.css';
import MonitoringApp from './MonitoringApp';
import Login from './Login';
import * as firebase from 'firebase';

export default class App extends Component {

  constructor(){
    super();

    var config = {
      apiKey: "AIzaSyAchPjq_60gL71QD8MG_K3GP6Xslfl76ZI",
      authDomain: "monithoring-7cdd7.firebaseapp.com",
      databaseURL: "https://monithoring-7cdd7.firebaseio.com",
      storageBucket: "",
      messagingSenderId: "473841991873"
    };

    var firebase_init = firebase.initializeApp(config);

    this.state = {
      isLoggedIn: "not set",
      firebaseApp: firebase_init,
      currentUser: '',
      editor_active: ''
    }
  }

  componentWillMount() {

    this.state.firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user){
        console.log(user.getToken());
        this.setState({
          isLoggedIn: true,
          currentUser: user.uid
        });
      }
      else if (!user) {
        this.setState({
          isLoggedIn: false,
          currentUser: ''
        })
      }
    }.bind(this));
  }

  getUserData(){
    var user = this.state.firebaseApp.auth().currentUser;
    if (user) {
      // User is signed in.

      this.setState({
        isLoggedIn: true,
        currentUser: user.uid
      });

      console.log(this.state);
    } else {
      // No user is signed in.
      setTimeout(function(){ this.getUserData(); }.bind(this), 1000);

    }
  }

  componentDidMount(){
    this.getUserData();
  }

  render() {
    if(this.state.isLoggedIn && this.state.currentUser != ''){
        return (
          <MonitoringApp firebaseApp={this.state.firebaseApp} currentUser={this.state.currentUser}/>
        )
      }else if(!this.state.isLoggedIn){
        return(
          <Login firebaseApp={this.state.firebaseApp} currentUser={this.state.currentUser}/>
        )
      }else{
        return(
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        );
      }
  }
}

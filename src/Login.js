import React, { Component } from 'react';

export default class LoginComponent extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleClick(e){
    e.preventDefault();
    this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  handleEmailChange(e) {
   this.setState({email: e.target.value});
  };
  handlePasswordChange(e) {
     this.setState({password: e.target.value});
  };

  render () {

    var stylePanel = {
      'marginTop': '30px'
    }

    var styleInput = {
      'marginBottom': '12px'
    }

    return (
      <div>
        <div className="container" style={stylePanel}>
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default login-panel">
              <div className="panel-heading"><h3 className="panel-title"><strong>Sign in </strong></h3></div>
              <div className="panel-body">
              <form>
                <div className="input-group" style={styleInput}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                    <input type="text" className="form-control login-input" name="username" value={this.state.email} placeholder="email" onChange={this.handleEmailChange.bind(this)} />
                </div>
                <div className="input-group" style={styleInput}>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-asterisk"></i></span>
                    <input type="password" className="form-control login-input" name="password" value={this.state.password} placeholder="password" onChange={this.handlePasswordChange.bind(this)} />
                </div>
                <button className="btn btn-block control-btn" onClick={this.handleClick.bind(this)}>Login</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

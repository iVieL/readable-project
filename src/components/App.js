import React, { Component } from 'react';
import '../css/App.css';
import Login from './login'
import Post from './Post'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'

// websites example using bootstrap: https://react.rocks/tag/Bootstrap
// https://react-bootstrap.github.io/components.html
class App extends Component {

  render() {

    return (
      <div>
        <Switch>
          {/*https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf*/}
          <Route exact path='/' render={ () => (
            <Home />
          )}/>

          <Route path='/filtered/:category' render={ () => (
            <Home />
          )}/>

          <Route path="/login" render={ () => (
            <Login />
          )}/>
          <Route exact path="/newpost" render={ () => (
            <Post new="true"/>
          )}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps( { login } ) {
  return {
    loggedIn: login.loggedIn,
    user: login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

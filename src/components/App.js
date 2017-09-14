import React, { Component } from 'react';
import '../css/App.css';
import Login from './login'
import { Grid, Row, Col, Label } from 'react-bootstrap'
// import * as ReadableAPI from '../api/ReadableAPI'
import Categories from "./Categories";
import PostsList from "./PostsList";
import Post from './Post'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'
import Header from './Header'

// websites example using bootstrap: https://react.rocks/tag/Bootstrap
// https://react-bootstrap.github.io/components.html
class App extends Component {

  render() {

    return (
      <div>
        <Route exact path='/' render={ () => (
          <Grid fluid={true}>

            <Header />

            <Categories />

            <Row>
              <Col xs={1} sm={1} md={1} lg={1} />
              <Col xs={11} sm={11} md={11} lg={11}>
                <h3 className="text-left">
                  <Label bsClass="text-warning">Avaialble post 100/100</Label>
                </h3>
              </Col>
            </Row>

            <PostsList />

          </Grid>
        )}/>
        <Route path="/login" render={ () => (
          <Login />
        )}/>
        <Route exact path="/newpost" render={ () => (
          <Post new="true"/>
        )}/>
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

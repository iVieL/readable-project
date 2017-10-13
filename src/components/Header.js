import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Label } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as cookies from '../utils/cookies'

class Header extends Component {

  showButton = () => {
    return !this.props.hide
  }

  logout = () => {
    cookies.logout()
  }

  render() {
    const { loggedIn, user } = this.props
    return (
      <Row>
        <Col xs={9} sm={9} md={9} lg={9}>
          <h3 className="text-center">
            <Label bsClass="text-primary">Vielinko's Readable Project</Label>
          </h3>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3}>
          {this.showButton() && (
            <Link to="/login" onClick={() => this.logout()} className="btn btn-success">{ loggedIn ?  user: 'Login'}</Link>
          )}
        </Col>
      </Row>

  )
  }
}

function mapStateToProps( { login } ) {
  return {
    loggedIn: login.loggedIn,
    user: login.user
  }
}

export default connect(mapStateToProps)(Header)

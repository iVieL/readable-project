import React, { Component } from 'react'
import { connect } from 'react-redux'
import { session } from '../actions'
import { FormGroup, ControlLabel, FormControl, Row, Col, Button } from 'react-bootstrap'
import Header from './Header'
import serializeform from 'form-serialize'
import * as cookies from '../utils/cookies'


class Login extends Component {
  state = {
    user: '',
    loggedIn: false
  }

  updateUser = (e) => {
    this.setState({
      user: e.target.value
    })
  }

  doLogin = (e) => {
    e.preventDefault();
    const values = serializeform(e.target, {hash: true})

    const {history, url} = this.props
    let loginSubmit = new Promise( (resolve, reject) => {
      cookies.login(values.user)
      this.props.login( { ...values, loggedIn: true} )
      this.setState({user: '', loggedIn: false})
      setTimeout( () => {
        resolve({history})
      }, 250)
    })

    loginSubmit.then( (data) => {
      const { history } = data
      history && history.push(url ? url: '/')
    })

  }


  render() {
    const { user } = this.state

    return (
    <div>
      <Header hide/>
      <Row>
        <Col xs={1} sm={1} md={1} lg={1} />
        <Col xs={10} sm={10} md={10} lg={10}>
          <form onSubmit={this.doLogin}>
            <FormGroup controlId="user">
              <ControlLabel>User</ControlLabel>
              <FormControl
                name="user"
                type="text"
                value={user}
                placeholder="Enter user"
                onChange={this.updateUser.bind(this)}
               />
            </FormGroup>

              <Button type="submit" className="btn btn-default">
                Accept
              </Button>
          </form>
        </Col>
      </Row>
    </div>
  )
  }
}

function mapStateToProps( { login } ) {
  return {
    user: login.user,
    url: login.url,
    loggedIn: login.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (data) => {
      dispatch(session(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)

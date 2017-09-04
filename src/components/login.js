import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { session } from '../actions'
// import { withRouter } from 'react-router'

class Login extends Component {
  render() {

    console.log(this.props);
    return (
    <div>
      <Link to="/" onClick={() => (
        this.props.login( {user: 'Vielinko', loggedIn: true} )
      )}>Back</Link>
    </div>
  )
  }
}

function mapStateToProps( { login } ) {
  return {
    user: login.user,
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

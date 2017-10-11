import React, { Component } from 'react';
import '../css/App.css';
import Login from './login'
import Post from './Post'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './Home'
import { fetchCategories, redirectAfterLogin } from '../actions'

// websites example using bootstrap: https://react.rocks/tag/Bootstrap
// https://react-bootstrap.github.io/components.html
class App extends Component {

  componentDidMount() {
    this.props.filterCategories()
  }

  componentWillUpdate() {
    const { location, loggedIn } = this.props
    if(!loggedIn && location && location.pathname !== '/login') {
      this.props.afterLogin(location.pathname)
    } else {
      if(location.pathname !== '/login') {
        this.props.afterLogin(undefined)
      }
    }
  }

  render() {
    const { loggedIn } = this.props
    //const noRedirect = this.props.location.pathname === '/login'
    return (
      <div>
        <Switch>
          <Route path="/login" render={ ({history}) => (
            <Login history={history}/>
          )}/>

          {!loggedIn && (
            <Redirect to={{
              pathname: '/login',
              state: {from: this.props.location}
            }}
          />
          )}

          {/*https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf*/}
          <Route exact path='/' component={Home}/>

          <Route exact path="/post/new" render={ ({history}) => (
            <Post new history={history}/>
          )}/>

          <Route  path="/post/view/:id" component={ (props) => (
            <Post view history={props.history} {...props}/>
          )}/>

          <Route  path="/post/edit/:id" component={ (props) => (
            <Post edit history={props.history} {...props}/>
          )} onEnter={this.requiereAuth}/>

          <Route path='/:category' component={Home}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps( { login, categories } ) {
  return {
    loggedIn: login.loggedIn,
    user: login.user,
    categories: categories.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filterCategories: () => {
      dispatch(fetchCategories())
    },
    afterLogin: (url) => {
      dispatch(redirectAfterLogin(url))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { Component } from 'react';
import '../css/App.css';
import Login from './login'
import Post from './Post'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import { fetchCategories } from '../actions'

// websites example using bootstrap: https://react.rocks/tag/Bootstrap
// https://react-bootstrap.github.io/components.html
class App extends Component {

  componentDidMount() {
    this.props.filterCategories()
  }

  render() {

    return (
      <div>
        <Switch>
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
          )}/>

          <Route path="/login" render={ () => (
            <Login />
          )}/>

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
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { Component } from 'react';
import '../css/App.css';
import Login from './login'
import { Grid, Row, Col, Button, Label, Table } from 'react-bootstrap'
import * as ReadableAPI from '../api/ReadableAPI'
import { getCategories } from '../actions'
import Categories from "./Categories";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, Link } from 'react-router-dom'

// websites example using bootstrap: https://react.rocks/tag/Bootstrap
// https://react-bootstrap.github.io/components.html
class App extends Component {

  searchCategories = () => {
    ReadableAPI.categories()
    .then( (categories) => {
      this.props.setCategories( { categories } )
    })
  }

  componentDidMount() {
    this.searchCategories()
  }

  render() {
    const { categoryList } = this.props
    return (
      <div>
        <Route exact path='/' render={ () => (
          <Grid fluid={true}>
            <Row>
              <Col xs={9} sm={9} md={9} lg={9}>
                <h3 className="text-center">
                  <Label bsClass="text-primary">Vielinko's Readable Project</Label>
                </h3>
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}>
                <Link to="/login" className="success">Login</Link>
                {/* <Button bsStyle="success">Login</Button> */}
              </Col>
            </Row>

            {/* {categoriesLoaded && <Categories categories={categoryList}/>} */}
            <Categories categories={categoryList}/>

            <Row>
              <Col xs={1} sm={1} md={1} lg={1} />
              <Col xs={11} sm={11} md={11} lg={11}>
                <h3 className="text-left">
                  <Label bsClass="text-warning">Avaialble post 100/100</Label>
                </h3>
              </Col>
            </Row>
            <Row>
              <Col xs={1} sm={1} md={1} lg={1} />
              <Col xs={10} sm={10} md={10} lg={10}>
                <Table bordered striped responsive>
                  <thead>
                    <tr>
                      <th className="col-md-1">Votes</th>
                      <th className="col-md-6">Post Title</th>
                      <th className="col-md-1">User</th>
                      <th className="col-md-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="col-md-1">150</td>
                      <td className="col-md-6">Post example 1</td>
                      <td className="col-md-1">user1</td>
                      <td className="col-md-2">2017-08-21 14:30:55</td>
                    </tr>
                    <tr>
                      <td className="col-md-1">140</td>
                      <td className="col-md-6">Post example 2</td>
                      <td className="col-md-1">user2</td>
                      <td className="col-md-2">2017-08-21 12:30:55</td>
                    </tr>
                    <tr>
                      <td className="col-md-1">100</td>
                      <td className="col-md-6">Post example 3</td>
                      <td className="col-md-1">user3</td>
                      <td className="col-md-2">2017-07-21 12:30:55</td>
                    </tr>
                    <tr>
                      <td className="col-md-1">-1000</td>
                      <td className="col-md-6">Post example N</td>
                      <td className="col-md-1">userN</td>
                      <td className="col-md-2">2017-08-22 03:33:33</td>
                    </tr>
                  </tbody>

                </Table>
                <div>
                  <nav aria-label="Page navigation">
                    <ul className="pagination pagination-sm">
                      <li>
                        <a href="http://localhost:3000" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li><a href="http://localhost:3000">1</a></li>
                      <li><a href="http://localhost:3000">2</a></li>
                      <li><a href="http://localhost:3000">3</a></li>
                      <li><a href="http://localhost:3000">4</a></li>
                      <li><a href="http://localhost:3000">5</a></li>
                      <li>
                        <a href="http://localhost:3000" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Col>
            </Row>

          </Grid>
        )}/>
        <Route path="/login" render={ () => (
          <Login />
        )}/>
      </div>
    );
  }
}

function mapStateToProps( { categories } ) {
  return {
    categoryList: categories.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCategories: (data) => {
      dispatch(getCategories(data))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

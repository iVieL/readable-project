import React, { Component } from 'react';
import '../css/App.css';
import { Grid, Row, Col, Button, Label, Navbar, Nav, NavItem, Table } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={9} sm={9} md={9} lg={9}>
            <h3 className="text-center">
              <Label bsClass="text-primary">Vielinko's Readable Project</Label>
            </h3>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            <Button bsStyle="success">Login</Button>
          </Col>
        </Row>

        <Row>
          <Col xs={1} sm={1} md={1} lg={1}></Col>
          <Col xs={8} sm={8} md={8} lg={8}>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">Categories</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem>Category 1</NavItem>
                  <NavItem>Category 2</NavItem>
                  <NavItem>Category 3</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col xs={1} sm={1} md={1} lg={1}>
            <Button bsStyle="primary">Add Post</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={1} sm={1} md={1} lg={1} />
          <Col xs={11} sm={11} md={11} lg={11}>
            <h3 class="text-left">
              <Label bsClass="text-warning">Avaialble post 100/100</Label>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col xs={1} sm={1} md={1} lg={1} />
          <Col xs={10} sm={10} md={10} lg={10}>
            <Table bordered striped responsive>
              <thead>
                <th className="col-md-1">Votes</th>
                <th className="col-md-6">Post Title</th>
                <th className="col-md-1">User</th>
                <th className="col-md-2">Date</th>
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
                    <a href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li>
                    <a href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </Col>
        </Row>

      </Grid>
    );
  }
}

export default App;

import React, { Component } from 'react'
import { Row, Col, Button, Navbar, Nav, NavItem } from 'react-bootstrap'

class Categories extends Component {

  render() {
    return (
      <Row>
        <Col xs={1} sm={1} md={1} lg={1}></Col>
        <Col xs={8} sm={8} md={8} lg={8}>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="http://localhost:3000">Categories</a>
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
    )
  }
}

export default Categories

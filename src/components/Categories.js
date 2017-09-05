import React, { Component } from 'react'
import { Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'
import { Link } from 'react-router-dom'

class Categories extends Component {

  render() {
    const { categories } = this.props

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
                { Array.isArray(categories) && categories.map( (category) => (
                  <NavItem key={category.name}>{capitalize(category.name)}</NavItem>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
          <Link to="/newpost" className="btn btn-info">Add Post</Link>
        </Col>
      </Row>
    )
  }
}

export default Categories

import React, { Component } from 'react'
import { Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Categories extends Component {

  categorySelected = (selected, name) => {
    return name === selected ? "label label-success": "label label-info"
  }

  render() {
    const { categories, selected } = this.props

    return (
      <Row>
        <Col xs={1} sm={1} md={1} lg={1}/>
        <Col xs={8} sm={8} md={8} lg={8}>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                Categories
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                { Array.isArray(categories) && categories.map( (category) => (
                  <NavItem
                    href={`/${category.path}`}
                    key={category.name}
                    className={this.categorySelected(selected, category.name)}>
                    {capitalize(category.name)}
                  </NavItem>
                ))}
                <NavItem
                  href="/"
                  className={this.categorySelected(selected, undefined)}>
                  All
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
          <Link to="/post/new" className="btn btn-info">Add Post</Link>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories.categories
  }
}

export default connect(mapStateToProps)(Categories)

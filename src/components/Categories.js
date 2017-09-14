import React, { Component } from 'react'
import { Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap'
import { capitalize } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories, changeCategory } from '../actions'
import * as ReadableAPI from '../api/ReadableAPI'

class Categories extends Component {

  categorySelected = (selected, name) => {
    return name === selected ? "label label-success": "label label-info"
  }

  getCategories = () => {
    ReadableAPI.categories()
    .then( (categories) => {
      this.props.filterCategories( { categories } )
    })
  }

  filterPosts = (categoryName) => {
    this.props.changeCategory({ categoryName })
  }

  componentDidMount() {
    this.getCategories()
  }


  render() {
    const { categories, selected } = this.props

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
                  <NavItem
                    onClick={ () => (this.filterPosts(category)) }
                    key={category.name}
                    className={this.categorySelected(selected, category.name)}>
                    {capitalize(category.name)}
                  </NavItem>
                ))}
                <NavItem
                  onClick={this.filterPosts()}
                  className={this.categorySelected(selected, undefined)}>
                  All
                </NavItem>
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

function mapStateToProps({ categories }) {
  console.log('Categories->mapStateToProps');
  return {
    categories: categories.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filterCategories: (data) => {
      dispatch(getCategories(data))
    },
    changeCategory: (data) => {
      dispatch(changeCategory(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)

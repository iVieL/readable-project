import React, { Component } from 'react';
import * as ReadableAPI from '../api/ReadableAPI'
import { connect } from 'react-redux'
import serializeform from 'form-serialize'
import { FormGroup, ControlLabel, FormControl, Row, Col, Button } from 'react-bootstrap'
import { uniqueId } from '../utils/helpers'
import { Link } from 'react-router-dom'
import Header from './Header'


class Post extends Component {
  state = {
    title: '',
    body: '',
    category: ''
  }

  updateTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  updateBody = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  updateCategory = (key) => {
    this.setState({
      category: key
    })
  }

  submitPost = (e) => {
    //todo: validate for loggedIn user, before show component or execute an action?
    e.preventDefault()
    const values = serializeform(e.target, {hash: true})
    const newValues = {
      ...values,
      id: uniqueId(),
      timestamp: Date.now(),
      author: this.props.user
    }

    ReadableAPI.newPost(newValues)
      .then( (res) =>
        console.log(res)
      )
  }

  render() {
    const {title, body} = this.state
    return (
      <div>
        <Header />
        <Row>
          <Col xs={1} sm={1} md={1} lg={1} />
          <Col xs={10} sm={10} md={10} lg={10}>
            <form onSubmit={this.submitPost}>
              <FormGroup controlId="post_category">
                <ControlLabel>Category</ControlLabel>
                <FormControl componentClass="select" name="category">
                  <option value="">Select one</option>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="others">Others</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="post_title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  name="title"
                  type="text"
                  value={title}
                  placeholder="Enter title text"
                  onChange={this.updateTitle.bind(this)}
                 />
              </FormGroup>

              <FormGroup controlId="post_body">
                <ControlLabel>Body</ControlLabel>
                <FormControl
                  name="body"
                  componentClass="textarea"
                  value={body}
                  placeholder="Enter Body text"
                  onChange={this.updateBody}
                 />
              </FormGroup>
              <Button type="submit" className="btn btn-default">Post</Button>
              <Link to="/" className="btn btn-danger">Back</Link>
            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps({ login }) {
  return {
    user: login.user
  }
}

export default connect(mapStateToProps)(Post)

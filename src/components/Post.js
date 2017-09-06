import React, { Component } from 'react';
// import * as ReadableAPI from '../api/ReadableAPI'
import { connect } from 'react-redux'
import serializeform from 'form-serialize'
import { FormGroup, ControlLabel, FormControl, Row, Col, Button } from 'react-bootstrap'

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
    e.preventDefault()
    const values = serializeform(e.target, {hash: true})
    console.log("values: ", values);
  }

  render() {
    const {title, body} = this.state
    return (
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
          </form>
        </Col>
      </Row>
    )
  }
}

export default connect()(Post)

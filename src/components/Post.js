import React, { Component } from 'react';
import * as ReadableAPI from '../api/ReadableAPI'
import { connect } from 'react-redux'
import serializeform from 'form-serialize'
import { FormGroup, ControlLabel, FormControl, Row, Col, Button, Panel, Label } from 'react-bootstrap'
import { uniqueId, capitalize, formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'
import Header from './Header'
import { fetchPost, clearPost } from '../actions'


class Post extends Component {
  state = {
    title: '',
    body: '',
    category: ''
  }

  updateTitle = (e) => {
    console.log('');
    this.setState({
      title: e.target.value
    })
  }

  updateBody = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  updateCategory = (e) => {
    this.setState({
      category: e.target.value
    })
  }

  isNew = () => ( this.props.new )
  isEdit = () => ( this.props.edit )

  submitPost = (e) => {
    //todo: validate for loggedIn user, before show component or execute an action?
    e.preventDefault()
    //todo: based on view type, go to update or new post
    const values = serializeform(e.target, {hash: true})

    if(this.isNew()) {
      const newValues = {
        ...values,
        id: uniqueId(),
        timestamp: Date.now(),
        author: this.props.user
      }

      ReadableAPI.newPost(newValues)
        .then((res) => {
            console.log('new post res: ', res)
            const {history} = this.props
            history && history.push('/')
          }
        )
    } else if(this.isEdit()) {
      const newValues = {
        ...this.props.post,
        ...values
      }
      console.log(newValues)
      ReadableAPI.editPost(newValues)
        .then( (res) => {
          console.log('edit post res: ', res)
          const {history} = this.props
          history && history.push('/')
        })
    }
  }

  sameOwner = () => {
    return this.props.post && this.props.user === this.props.post.author
  }

  componentDidMount() {
    if(this.props.match) {
      const id = this.props.match.params.id
      this.props.retrievePost(id)
      .then( () => {
        const { post } = this.props
        this.setState({
          title: post.title,
          body: post.body,
          category: post.category
        })
      })
    }
  }

  componentWillUnmount() {
    this.props.clearPost()
  }


  canEditInputText = () => {
    return !(this.props.view || this.props.delete)
  }

  showButton = () => {
    return !this.props.view
  }

  getTitle = () => {
    if(this.props.view) {
      return "View Post"
    } else if(this.props.new) {
      return "New Post"
    } else if(this.props.edit) {
      return "Edit Post"
    } else if(this.props.delete) {
      return "Delete Post"
    }
  }

  actionButtonText = () => {
    if(this.props.new) {
      return "Add"
    } else if(this.props.edit) {
      return "Change"
    }
  }

  render() {
    const { categories, post } = this.props
    let {title, body, category} = this.state
    let author = ''
    let votes = 1
    let timestamp = 0
    let id = ''
    if(post) {
      id = post.id
      author = post.author
      votes = post.voteScore
      timestamp = post.timestamp
    }

    return (
      <div>
        <Header />
        <Row>
          <Col xs={1} sm={1} md={1} lg={1} />
          <Col xs={10} sm={10} md={10} lg={10}>
            {this.getTitle()}
          </Col>
        </Row>

        { this.canEditInputText() && (
          <Row>
            <Col xs={1} sm={1} md={1} lg={1} />
            <Col xs={10} sm={10} md={10} lg={10}>
              <form onSubmit={this.submitPost}>
                <FormGroup controlId="post_category">
                  <ControlLabel>Category</ControlLabel>
                  <FormControl value={category}
                               onChange={this.updateCategory.bind(this)}
                               componentClass="select"
                               name="category">
                    <option value="">Select one</option>
                    {categories && categories.map((category) => (
                      <option key={category.path} value={category.path}>{capitalize(category.name)}</option>
                    ))}
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
                {this.showButton() &&
                  <Button type="submit" className="btn btn-default">
                    {this.actionButtonText()}
                  </Button>
                }
                <Link to="/" className="btn btn-danger">Back</Link>
              </form>
            </Col>
          </Row>
        )}
        {!this.canEditInputText() && (
          <Row>
            <Col xs={1} sm={1} md={1} lg={1} />
            <Col xs={10} sm={10} md={10} lg={10}>
              <Panel
                header={
                  <Row>
                    <Col xs={1} sm={1} md={1} lg={1}>
                      <Label className="label label-warning">{votes}</Label>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8}>
                      <b>{title}</b>
                    </Col>
                    <Col xs={1} sm={1} md={1} lg={1}>
                      <Label className="label label-info">[{category}]</Label>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2}>
                      <Label className="label label-default">Author: {author}</Label>
                    </Col>
                  </Row>
               }
               footer={
                 <Row>
                   <Col xs={1} sm={1} md={1} lg={1}>
                     {this.sameOwner() && (<Link to={`/post/edit/${id}`} className="btn btn-warning">Edit</Link>)}
                   </Col>
                   <Col xs={1} sm={1} md={1} lg={1}>
                     {/*todo: shows only if author is logged in*/}
                     {this.sameOwner() && (<Link to="/" className="btn btn-warning">Delete</Link>)}
                   </Col>
                   <Col xs={8} sm={8} md={8} lg={8}>
                     Last update: {formatDate(timestamp)}
                   </Col>
                   <Col xs={2} sm={2} md={2} lg={2}>
                     <Link to="/" className="btn btn-danger">Back</Link>
                   </Col>
                 </Row>
               }>
                {body}
              </Panel>
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

function mapStateToProps({ login, categories, postsReducer }) {
  return {
    user: login.user,
    categories: categories.categories,
    post: postsReducer.post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    retrievePost: (id) => dispatch(fetchPost(id)),
    clearPost: () => dispatch(clearPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)

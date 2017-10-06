import React, { Component } from 'react'
import { Row, Col, Label, Button, Modal } from 'react-bootstrap'
// import { formatDate } from '../utils/helpers'
import { fetchComments } from '../actions'
import { connect } from 'react-redux'
import Comment from './Comment'
import * as ReadableAPI from '../api/ReadableAPI'

class CommentsList extends Component {
  state = {
    deleteModalOpen: false,
    editModalOpen: false,
    currentComment: undefined
  }

  openDeleteModal = (id) => {
    this.setState(() => ({
      deleteModalOpen: true,
      editModalOpen: false,
      currentCommentId: id
    }))
  }

  closeDeleteModal = () => {
    this.setState(() => ({
      deleteModalOpen: false
    }))
  }

  openEditModal = (aComment) => {
    this.setState(() => ({
      deleteModalOpen: false,
      editModalOpen: true,
      currentComment: aComment
    }))
  }

  closeEditModal = () => {
    this.setState(() => ({
      editModalOpen: false
    }))
  }

  editComment = (id, body) => {
    if(id === this.state.currentComment.id) {
      ReadableAPI.editComment(id, {
        id: id,
        timestamp: Date.now(),
        body: body
      })
      .then( () => {
        this.setState({
          deleteModalOpen: false,
          editModalOpen: false,
          currentComment: undefined
        })
      })
      .then( () => {
        this.props.fetchComments(this.props.postId)
      })
    }
  }

  deleteComment = (e) => {
    e.preventDefault()
    ReadableAPI.deleteComment(this.state.currentCommentId)
      .then( () => {
        this.closeDeleteModal()
        this.props.fetchComments(this.props.postId)
      })
  }


  componentDidMount() {
    this.props.fetchComments(this.props.postId)
  }

  render() {
    const { comments, postId } = this.props
    const { editModalOpen, deleteModalOpen, currentComment } = this.state

    console.log('currentComment: ', currentComment)
    console.log('comments', comments)

    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Button
              className="btn btn-success"
              onClick={() => this.openEditModal()}
              >New Comment</Button>
          </Col>
        </Row>
        { comments && comments.map( (comment) => (
          <Row key={comment.id}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Comment
                comment={comment}
                parentId={postId}
                // edit={() => this.openEditModal(comment)}
                onEdit={this.openEditModal}
                onDelete={this.openDeleteModal}
              />
            </Col>
          </Row>
        ))}
        { (!comments || comments.length === 0) && (
          <p>There are no comments! add some!</p>
        )}

      {/*  New/Edit comment */}
      <Modal
        show={editModalOpen}
        onHide={() => this.closeEditModal()}
      >
        <Modal.Header closeButton ><Label className="label label-info">Comment</Label></Modal.Header>
        <Modal.Body>
          <Comment
            comment={currentComment}
            parentId={postId}
            onApply={this.editComment}
            editable
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeEditModal}>Close</Button>
          {/* <Button bsStyle="primary" onClick={this.deletePost}>Delete!</Button> */}
        </Modal.Footer>
      </Modal>

      {/* Delete comment confirmation  */}
      <Modal
        show={deleteModalOpen}
        onHide={() => this.closeDeleteModal()}
      >
        <Modal.Header closeButton ><Label className="label label-warning">Delete Confirmation!</Label></Modal.Header>
        <Modal.Body><span>Are you sure to delete the comment?</span></Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeDeleteModal}>Close</Button>
          <Button bsStyle="primary" onClick={this.deleteComment}>Delete!</Button>
        </Modal.Footer>
      </Modal>


      </div>
    )
  }
}

function mapStateToProps( { commentsReducer } ) {
  return {
    comments: commentsReducer.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (id) => {
      dispatch(fetchComments(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)

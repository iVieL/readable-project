import React, { Component } from 'react'
import { Row, Col, Panel, Label, Button, Modal } from 'react-bootstrap'
import { formatDate } from '../utils/helpers'
import { fetchComments } from '../actions'
import { connect } from 'react-redux'
import Comment from './Comment'

class CommentsList extends Component {
  state = {
    deleteModalOpen: false,
    editModalOpen: false
  }

  openDeleteModal = () => {
    this.setState(() => ({
      deleteModalOpen: true,
      editModalOpen: false
    }))
  }

  closeDeleteModal = () => {
    this.setState(() => ({
      deleteModalOpen: false
    }))
  }

  openEditModal = () => {
    this.setState(() => ({
      deleteModalOpen: false,
      editModalOpen: true
    }))
  }

  closeEditModal = () => {
    this.setState(() => ({
      editModalOpen: false
    }))
  }

  componentDidMount() {
    this.props.fetchComments(this.props.postId)
  }

  render() {
    const { comments, postId } = this.props
    const { editModalOpen, deleteModalOpen} = this.state

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
              <Comment comment={comment} parentId={postId} />
{/*
              <Panel className="panel panel-info"
                header={
                  <Row>
                    <Col xs={2} sm={2} md={2} lg={2}>
                      <Score commentVotes={comment.voteScore} commentId={comment.id} postId={postId}/>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                      <h6>Posted at {formatDate(comment.timestamp)}</h6>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2}/>
                    <Col xs={2} sm={2} md={2} lg={2}>
                      <Label className="label label-default">author: {comment.author}</Label>
                    </Col>
                  </Row>
               }>
                {comment.body}
              </Panel>
*/}
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
          <span>Tetst edit/new</span></Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeEditModal}>Close</Button>
          {/* <Button bsStyle="primary" onClick={this.deletePost}>Delete!</Button> */}
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

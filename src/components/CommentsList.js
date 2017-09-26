import React, { Component } from 'react'
import { Row, Col, Panel, Label } from 'react-bootstrap'
import { formatDate } from '../utils/helpers'
import { fetchComments } from '../actions'
import { connect } from 'react-redux'
import Score from './Score'

class CommentsList extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.postId)
  }

  render() {
    const { comments } = this.props
    console.log('comments: ',this.props.comments)
    return (
      <div>
        { comments && comments.map( (comment) => (
          <Row key={comment.id}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Panel className="panel panel-info"
                header={
                  <Row>
                    <Col xs={2} sm={2} md={2} lg={2}>
                      <Score votes={comment.voteScore} />
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
            </Col>
          </Row>
        ))}
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

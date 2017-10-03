import React, { Component } from 'react'
import { Panel, Row, Col, Label} from 'react-bootstrap'
import { formatDate } from '../utils/helpers'
import Score from './Score'
import { connect } from 'react-redux'

class Comment extends Component {
  resetStateValues = () => {
    return {
      votes: 0,
      id: undefined,
      parentId: undefined,
      timestamp: 0,
      author: '',
      body: ''
    }
  }

  state = this.resetStateValues()


  componentDidMount() {
    const { comment, parentId } = this.props
    if(comment) {
      this.setState({
        votes: comment.voteScore,
        id: comment.id,
        parentId: parentId,
        timestamp: comment.timestamp,
        author: comment.author,
        body: comment.body
      })
    } else {
      this.setState(this.resetStateValues())
    }
  }

  render() {
    const { id, parentId, timestamp, author, body } = this.state
    let { votes } = this.state
    if(this.props.myComment && this.props.myComment.id === id) {
      votes = this.props.myComment.voteScore
    }
    return (
      <Panel className="panel panel-info"
             header={
               <Row>
                 <Col xs={2} sm={2} md={2} lg={2}>
                   <Score commentVotes={votes} commentId={id} postId={parentId}/>
                 </Col>
                 <Col xs={6} sm={6} md={6} lg={6}>
                   <h6>Posted at {formatDate(timestamp)}</h6>
                 </Col>
                 <Col xs={2} sm={2} md={2} lg={2}/>
                 <Col xs={2} sm={2} md={2} lg={2}>
                   <Label className="label label-default">author: {author}</Label>
                 </Col>
               </Row>
             }>
        {body}
      </Panel>
    )
  }
}

function mapStateToProps({ commentsReducer }) {
  return {
    myComment: commentsReducer.myComment
  }
}

export default connect(mapStateToProps)(Comment)
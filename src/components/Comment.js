import React, { Component } from 'react'
import { Panel, Row, Col, Label, Button, FormControl } from 'react-bootstrap'
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

  sameOwner = () => {
    return this.props.comment && this.props.user === this.props.comment.author
  }

  isEditable = () => {
    return this.props.editable || this.props.new
  }

  actionButtonText = () => {
    if(this.props.new) {
      return "Add"
    } else if(this.props.editable) {
      return "Change"
    }
  }

  updateBody = (e) => {
    this.setState({
      body: e.target.value
    })
  }


  submitComment = (e) => {
    e.preventDefault()
    let cleanThings = new Promise( (resolve, reject) => {
      const { id, body } = this.state
      this.setState(this.resetStateValues())
      setTimeout( () => {
        resolve({id, body})
      }, 250)
    })

    cleanThings.then( (data) => {
      this.props.onApply(data.id, data.body)
    })

  }

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
    const { onEdit, onDelete, comment, myComment } = this.props
    let { votes } = this.state
    console.log('state! ', this.state, comment);
    if(myComment && myComment.id === id) {
      votes = myComment.voteScore
    }

    return (
      <div>
        {!this.isEditable() && (
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
                 }
                 footer={
                   <Row>
                     <Col xs={1} sm={1} md={1} lg={1}>
                       {this.sameOwner() && (
                         <Button
                           onClick={ () => onEdit(comment) }
                           className="btn btn-warning">
                           Edit
                         </Button>)}
                     </Col>
                     <Col xs={1} sm={1} md={1} lg={1}>
                       {this.sameOwner() && (
                         <Button
                           onClick={() => onDelete(id)}
                           className="btn btn-warning">
                           Delete
                         </Button>)}
                     </Col>
                   </Row>
                 }>
            {body}
          </Panel>
        )}
        {this.isEditable() && (
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <form onSubmit={this.submitComment}>
                  <FormControl
                    name="body"
                    componentClass="textarea"
                    value={body}
                    placeholder="Enter Body text"
                    onChange={this.updateBody}
                   />
                  <Button type="submit" className="btn btn-default">
                    {this.actionButtonText()}
                  </Button>
              </form>
            </Col>
          </Row>

        )}
      </div>
    )
  }
}

function mapStateToProps({ login, commentsReducer }) {
  return {
    user: login.user,
    myComment: commentsReducer.myComment
  }
}

export default connect(mapStateToProps)(Comment)

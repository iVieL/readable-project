import React, { Component } from 'react'
import { Label } from 'react-bootstrap'
import { votePost, voteComment } from '../actions'
import { connect } from 'react-redux'

class Score extends Component {
  votePost = (option) => {
    const { postId, commentId } = this.props

    if(commentId) { // voteScore a comment
      this.props.updateComment(commentId, option)
    } else { // voteScore a post
      this.props.updatePost(postId, option)
    }
  }

  render() {
    const { postVotes, commentVotes } = this.props
    const votes = commentVotes !== undefined ? commentVotes: postVotes

    return (
      <div >
        <Label className="label label-warning">{votes}</Label>
        <div className="btn-group">
          <button type="button"
                  className="btn btn-link votes btn-block"
                  onClick={() => this.votePost('upVote')}
          >
            <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"/>
          </button>
          <button type="button"
                  className="btn btn-link votes btn-block"
                  onClick={() => this.votePost('downVote')}
          >
            <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"/>
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ postsReducer, commentsReducer }) {
  return {
    postVotes: postsReducer.post ? postsReducer.post.voteScore: 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePost: (postId, option) => dispatch(votePost(option, postId)),
    updateComment: (id, option) => dispatch(voteComment(option, id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Score)

import React, { Component } from 'react'
// import { Row, Table, Col} from 'react-bootstrap'
// import { formatDate } from '../utils/helpers'
import { fetchComments } from '../actions'
import { connect } from 'react-redux'

class CommentsList extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.postId)
  }

  render() {
    console.log('comments: ',this.props.comments)
    return (
      <div>Hola!</div>
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
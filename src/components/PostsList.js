import React, { Component } from 'react'
import { Row, Table, Col} from 'react-bootstrap'
import { formatDate } from '../utils/helpers'
import { filterByCategory } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'


class PostsList extends Component {
  state = {
    sortByVotes: 'N',
    sortByDate: 'N'
  }


  componentDidMount() {
    this.props.allPosts(this.props.selected)
  }

  changeState(votes, dates) {
    this.setState({
      sortByVotes: votes,
      sortByDate: dates
    })
  }

  sortByVotes(e) {
    const { sortByVotes } = this.state
    switch (sortByVotes) {
      case 'voteScore':
        this.changeState('-voteScore', 'N')
        break;
      default:
      this.changeState('voteScore', 'N')
    }
  }

  sortByDates(e) {
    const { sortByDate } = this.state
    switch (sortByDate) {
      case 'timestamp':
        this.changeState('N', '-timestamp')
        break;
      default:
      this.changeState('N', 'timestamp')
    }
  }

  getSortedIcon(sorted) {
    if(sorted !== 'N') {
      if(sorted.charAt(0) === '-') {
        return (
          <span className="glyphicon glyphicon-arrow-up"></span>
        )
      } else {
        return (
          <span className="glyphicon glyphicon-arrow-down"></span>
        )
      }
    } else {
      return ''
    }
  }

  render() {
    const { list } = this.props
    const { sortByVotes, sortByDate } = this.state

    if(list) {
      if(sortByVotes !== 'N') {
        list.sort(sortBy(sortByVotes))
      } else if(sortByDate !== 'N') {
        list.sort(sortBy(sortByDate))
      }
    }

    return (
      <Row>
        <Col xs={1} sm={1} md={1} lg={1} />
        <Col xs={10} sm={10} md={10} lg={10}>
          <Table bordered striped responsive>
            <thead>
              <tr>
                <th className="col-md-1 handsUp" onClick={ () => this.sortByVotes() }>Votes {this.getSortedIcon(sortByVotes)}</th>
                <th className="col-md-6">Post Title</th>
                <th className="col-md-1">User</th>
                <th className="col-md-2 handsUp" onClick={ () => this.sortByDates()}>Date {this.getSortedIcon(sortByDate)}</th>
              </tr>
            </thead>
            <tbody>
              { list && list.map((post) => (
                <tr key={post.id}>
                  <td className="col-md-1">{post.voteScore}</td>
                  <td className="col-md-6">
                    <Link to={`/post/view/${post.id}`} >{post.title}</Link>
                  </td>
                  <td className="col-md-1">{post.author}</td>
                  <td className="col-md-2">{formatDate(post.timestamp)}</td>
                </tr>

              ))}
            </tbody>

          </Table>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps( { postsReducer } ) {
  return {
    list: postsReducer.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    allPosts: (category) => {
      dispatch(filterByCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)

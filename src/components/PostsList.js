import React, { Component } from 'react'
import { Row, Table, Col} from 'react-bootstrap'
import { formatDate } from '../utils/helpers'
import { filterByCategory } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'


class PostsList extends Component {


  componentDidMount() {
    this.props.allPosts(this.props.selected)
  }

  render() {
    const { list } = this.props
    if(list) {
      list.sort(sortBy('-voteScore'))
    }
    return (
      <Row>
        <Col xs={1} sm={1} md={1} lg={1} />
        <Col xs={10} sm={10} md={10} lg={10}>
          <Table bordered striped responsive>
            <thead>
              <tr>
                <th className="col-md-1">Votes</th>
                <th className="col-md-6">Post Title</th>
                <th className="col-md-1">User</th>
                <th className="col-md-2">Date</th>
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
{/*
          <div>
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm">
                <li>
                  <a href="http://localhost:3000" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li><a href="http://localhost:3000">1</a></li>
                <li><a href="http://localhost:3000">2</a></li>
                <li><a href="http://localhost:3000">3</a></li>
                <li><a href="http://localhost:3000">4</a></li>
                <li><a href="http://localhost:3000">5</a></li>
                <li>
                  <a href="http://localhost:3000" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
*/}
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

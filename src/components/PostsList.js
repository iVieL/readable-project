import React, { Component } from 'react'
import { Row, Table, Col} from 'react-bootstrap'
import { formatDate } from '../utils/helpers'
import { posts } from '../actions'
import { connect } from 'react-redux'
import * as ReadableAPI from '../api/ReadableAPI'

class PostsList extends Component {

  filterByCategory = (categoryName) => {
    categoryName = 'react'
    console.log('selected: ', categoryName);
    if(categoryName) {
      ReadableAPI.postsByCategory(categoryName)
      .then( (posts) => {
        console.log("posts: ", posts)
        this.props.allPosts( { posts, filter: categoryName } )
      })

    } else {
      ReadableAPI.getAll()
      .then( (posts) => {
        console.log("posts: ", posts)
        this.props.allPosts( { posts, filter: undefined })
      })
    }

  }

  componentDidMount() {
    this.filterByCategory()
  }

  render() {
    const { list } = this.props
    console.log(this.props);
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
                  <td className="col-md-6">{post.title}</td>
                  <td className="col-md-1">{post.author}</td>
                  <td className="col-md-2">{formatDate(post.timestamp)}</td>
                </tr>

              ))}
            </tbody>

          </Table>
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
        </Col>
      </Row>
    )
  }
}

function mapStateToProps( { postsReducer } ) {
  console.log('PostsList->mapStateToProps');
  console.log('post reducer: ', postsReducer)
  return {
    list: postsReducer.posts,
    category: postsReducer.filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    allPosts: (data) => {
      dispatch(posts(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)

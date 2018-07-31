import React, {Component} from 'react'
import {Row, Table, Col} from 'react-bootstrap'
import {formatDate} from '../utils/helpers'
import {filterByCategory, updateSortCriteria} from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class PostsList extends Component {


    componentDidMount() {
        const {sortByVotes, sortByDate} = this.props;
        this.props.allPosts(this.props.selected, sortByVotes, sortByDate);
    }

    sortByVotes(e) {
        const {sortByVotes, list} = this.props;
        switch (sortByVotes) {
            case 'voteScore':
                this.props.updateSort('-voteScore', 'N', list);
                break;
            default:
                this.props.updateSort('voteScore', 'N', list)
        }
    }

    sortByDates(e) {
        const {sortByDate, list} = this.props;
        switch (sortByDate) {
            case 'timestamp':
                this.props.updateSort('N', '-timestamp', list);
                break;
            default:
                this.props.updateSort('N', 'timestamp', list)
        }
    }

    static getSortedIcon(sorted) {
        if (sorted !== 'N' && sorted) {
            if (sorted.charAt(0) === '-') {
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
        const {list, sortByVotes, sortByDate} = this.props;

        return (
            <Row>
                <Col xs={1} sm={1} md={1} lg={1}/>
                <Col xs={10} sm={10} md={10} lg={10}>
                    <Table bordered striped responsive>
                        <thead>
                        <tr>
                            <th className="col-md-1 handsUp"
                                onClick={() => this.sortByVotes()}>Votes {PostsList.getSortedIcon(sortByVotes)}</th>
                            <th className="col-md-6">Post Title</th>
                            <th className="col-md-1">User</th>
                            <th className="col-md-2 handsUp"
                                onClick={() => this.sortByDates()}>Date {PostsList.getSortedIcon(sortByDate)}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list && list.map((post) => (
                            <tr key={post.id}>
                                <td className="col-md-1">{post.voteScore}</td>
                                <td className="col-md-6">
                                    <Link to={`/post/view/${post.id}`}>{post.title}</Link>
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

function mapStateToProps({postsReducer}) {
    return {
        list: postsReducer.posts,
        sortByVotes: postsReducer.sortByVotes,
        sortByDate: postsReducer.sortByDate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        allPosts: (category, sortByVotes, sortByDate) => {
            dispatch(filterByCategory(category, sortByVotes, sortByDate))
        },
        updateSort: (sortByVotes, sortByDate, posts) => {
            dispatch(updateSortCriteria(sortByVotes, sortByDate, posts))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)

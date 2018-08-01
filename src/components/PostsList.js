import React, {Component} from 'react';
import {Row, Table, Col, Button, Modal, Label} from 'react-bootstrap';
import {formatDate} from '../utils/helpers';
import {filterByCategory, updateSortCriteria} from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Score from './Score';
import serializeform from "form-serialize";
import * as ReadableAPI from "../api/ReadableAPI";


class PostsList extends Component {
    state = {
        deleteModalOpen: false,
        post: undefined
    };


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

    updateScore = (post, current) => {
        return (post && post.id === current.id)
            ? post.voteScore
            : current.voteScore;
    };

    openDeleteModal = (post) => {
        this.setState(() => ({
            deleteModalOpen: true,
            post
        }))
    };

    closeDeleteModal = () => {
        this.setState(() => ({
            deleteModalOpen: false,
            post: undefined
        }))
    };

    deletePost = (e) => {
        e.preventDefault();
        const { post: _post } = this.state;
        const values = serializeform(e.target, {hash: true});
        const post = {
            ..._post,
            ...values
        };

        ReadableAPI.deletePost(post)
            .then(() => {
                const {history} = this.props;
                history && history.push('/')
            })
    };


    render() {
        const {_post, list, sortByVotes, sortByDate} = this.props;
        const {deleteModalOpen} = this.state;

        return (
            <Row>
                <Col xs={1} sm={1} md={1} lg={1}/>
                <Col xs={10} sm={10} md={10} lg={10}>
                    <Table bordered striped responsive>
                        <thead>
                        <tr>
                            <th className="col-md-1 handsUp"
                                onClick={() => this.sortByVotes()}>Votes {PostsList.getSortedIcon(sortByVotes)}</th>
                            <th className="col-md-4">Post Title</th>
                            <th className="col-md-2">Actions</th>
                            <th className="col-md-1">User</th>
                            <th className="col-md-2 handsUp"
                                onClick={() => this.sortByDates()}>Date {PostsList.getSortedIcon(sortByDate)}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list && list.map((post) => (
                            <tr key={post.id}>
                                <td className="col-md-1">
                                    <Score customPostVotes={this.updateScore(_post, post)} postId={post.id}/>
                                </td>
                                <td className="col-md-4">
                                    <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                                </td>
                                <td className="col-md-2">
                                    <Link to={`/post/edit/${post.id}`}
                                          className="btn btn-warning">Edit</Link>
                                    <Button onClick={() => this.openDeleteModal(post)}
                                    className="btn btn-danger">Delete</Button>
                                </td>
                                <td className="col-md-1">{post.author}</td>
                                <td className="col-md-2">{formatDate(post.timestamp)}</td>
                            </tr>

                        ))}
                        </tbody>

                    </Table>
                    <Modal
                        show={deleteModalOpen}
                        onHide={() => this.closeDeleteModal()}>
                        <Modal.Header closeButton>
                            <Label className="label label-warning">Delete Confirmation!</Label>
                        </Modal.Header>
                        <Modal.Body><span>Are you sure to delete the post?</span></Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeDeleteModal}>Close</Button>
                            <Button bsStyle="primary" onClick={this.deletePost}>Delete!</Button>
                        </Modal.Footer>
                    </Modal>

                </Col>
            </Row>
        )
    }
}

function mapStateToProps({postsReducer}) {
    return {
        list: postsReducer.posts,
        _post: postsReducer.post,
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

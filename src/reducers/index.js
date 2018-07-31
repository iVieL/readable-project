import {combineReducers} from 'redux'
import {
    GET_CATEGORIES,
    LOGIN,
    REDIRECT_TO,
    POSTS,
    GET_POST,
    CLEAR_POST,
    POST_COMMENTS,
    GET_COMMENT,
    UPDATE_SORT_CRITERIA
} from '../actions'

function categories(state = {}, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            const {categories} = action
            return {
                ...state,
                categories: categories
            }
        default:
            return state
    }
}

function login(state = {loggedIn: false}, action) {
    const {type, user, loggedIn, url} = action
    switch (type) {
        case LOGIN:
            return {
                ...state,
                user: user,
                loggedIn: loggedIn
            }
        case REDIRECT_TO:
            return {
                ...state,
                url: url
            }
        default:
            return state
    }
}

function postsReducer(state = {sortByVotes: 'N', sortByDate: 'N'}, action) {
    const {type, posts, filter, post, sortByVotes, sortByDate} = action;
    switch (type) {
        case POSTS:
            return {
                ...state,
                posts,
                filter,
                sortByVotes,
                sortByDate
            };
        case UPDATE_SORT_CRITERIA:
            return {
                ...state,
                sortByVotes,
                sortByDate
            };
        case GET_POST:
            return {
                ...state,
                post: post
            };
        case CLEAR_POST:
            return {
                ...state,
                post: post
            };
        default:
            return state
    }
}

function commentsReducer(state = {}, action) {
    const {type, id, comments, comment} = action
    switch (type) {
        case POST_COMMENTS:
            return {
                ...state,
                id,
                comments
            }
        case GET_COMMENT:
            return {
                ...state,
                comments: [...state.comments.map((c) => {
                    if (c.id === comment.id) {
                        c.voteScore = comment.voteScore
                    }
                    return c
                })],
                myComment: comment
            }
        default:
            return state
    }
}

export default combineReducers({
    categories,
    postsReducer,
    login,
    commentsReducer
})

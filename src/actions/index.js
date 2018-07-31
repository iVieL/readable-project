import * as ReadableAPI from '../api/ReadableAPI'
import sortBy from "sort-by";

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const LOGIN = 'LOGIN';
export const REDIRECT_TO = 'REDIRECT_TO';
export const POSTS = 'POSTS';
export const GET_POST = 'GET_POST';
export const CLEAR_POST = 'CLEAR_POST';
export const POST_COMMENTS = 'POST_COMMENTS';
export const GET_COMMENT = 'GET_COMMENT';
export const UPDATE_SORT_CRITERIA = 'UPDATE_SORT_CRITERIA';

export function getCategories({categories}) {
    return {
        type: GET_CATEGORIES,
        categories: categories
    }
}

export const fetchCategories = () => {
    return (dispatch) => {
        ReadableAPI.categories()
            .then((categories) => {
                dispatch(getCategories({categories}))
            })
    }
}

export function session({user, loggedIn}) {
    return {
        type: LOGIN,
        user: user,
        loggedIn: loggedIn
    }
}

export function redirectAfterLogin(url) {
    return {
        type: REDIRECT_TO,
        url: url
    }
}

export function postsAction({posts, filterCategory, sortByVotes, sortByDate}) {
    return {
        type: POSTS,
        posts: posts,
        filter: filterCategory,
        sortByVotes,
        sortByDate
    }
}

export function updateSortCriteria(sortByVotes, sortByDate, posts) {
    return {
        type: UPDATE_SORT_CRITERIA,
        sortByVotes,
        sortByDate,
        posts: sortPosts(posts, sortByVotes, sortByDate)
    }
}

export function getPost(post) {
    return {
        type: GET_POST,
        post: post
    }
}

export function clearPost() {
    return {
        type: GET_POST,
        post: undefined
    }
}

export const fetchPost = (id) => (dispatch) => {
    return ReadableAPI.getPost(id)
        .then((post) => {
            dispatch(getPost(post))
        })
}

export const votePost = (option, postId) => (dispatch) => {
    return ReadableAPI.votePost(postId, option)
        .then((post) => dispatch(getPost(post)))
}

const sortPosts = (posts, sortByVotes, sortByDate) => {
    if (posts) {
        if (sortByVotes !== 'N' && sortByVotes) {
            posts.sort(sortBy(sortByVotes));
        } else if (sortByDate !== 'N' && sortByDate) {
            posts.sort(sortBy(sortByDate))
        }
    }
    return posts;
};

export const filterByCategory = (categoryName, sortByVotes, sortByDate) => (dispatch) => {
    if (categoryName) {
        ReadableAPI.postsByCategory(categoryName)
            .then((posts) => {
                const sortedPosts = sortPosts(posts, sortByVotes, sortByDate);
                dispatch(postsAction({posts: sortedPosts, filter: categoryName, sortByVotes, sortByDate}))
            })

    } else {
        ReadableAPI.getAll()
            .then((posts) => {
                const sortedPosts = sortPosts(posts, sortByVotes, sortByDate);
                dispatch(postsAction({posts: sortedPosts, filter: undefined, sortByVotes, sortByDate}))
            })
    }

};

export function postCommnetsAction({id, comments}) {
    return {
        type: POST_COMMENTS,
        id: id,
        comments: comments
    }
}

export const fetchComments = (id) => (dispatch) => {
    ReadableAPI.postComments(id)
        .then((comments) => {
            dispatch(postCommnetsAction({id, comments}))
        })
}

export function getComment(comment) {
    return {
        type: GET_COMMENT,
        comment
    }
}

export const voteComment = (option, commentId) => (dispatch) => {
    return ReadableAPI.voteComment(commentId, option)
        .then((comment) => {
            dispatch(getComment(comment))
        })
}


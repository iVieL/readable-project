import { combineReducers } from 'redux'
import {
  GET_CATEGORIES,
  LOGIN,
  POSTS,
  GET_POST,
  CLEAR_POST,
  POST_COMMENTS
} from '../actions'

function categories(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      const { categories } = action
      return {
        ...state,
        categories: categories
      }
    default:
      return state
  }
}

function login(state = {user: 'Vielinko', loggedIn: true}, action) {
  const {type, user, loggedIn} = action
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: user,
        loggedIn: loggedIn
      }
    default:
      return state
  }
}

function postsReducer(state = {}, action) {
  const {type, posts, filter, post } = action
  switch (type) {
    case POSTS:
      return {
        ...state,
        posts,
        filter
      }
    case GET_POST:
      return {
        ...state,
        post
      }
    case CLEAR_POST:
      return {
        ...state,
        post: post
      }
    default:
      return state
  }
}

function commentsReducer(state = {}, action) {
  const { type, id, comments } = action
  switch (type) {
    case POST_COMMENTS:
      return {
        ...state,
        id,
        comments
      }
    default:
      return state
  }
}

export default combineReducers( {
  categories,
  postsReducer,
  login,
  commentsReducer
} )

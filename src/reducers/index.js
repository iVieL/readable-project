import { combineReducers } from 'redux'
import {
  GET_CATEGORIES,
  LOGIN,
  POSTS
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

function login(state = {}, action) {
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
  const {type, posts} = action
  switch (type) {
    case POSTS:
      return {
        ...state,
        posts
      }
    default:
    return state
  }
}

export default combineReducers( {
  categories,
  postsReducer,
  login
} )

import { combineReducers } from 'redux'
import {
  GET_CATEGORIES
} from '../actions'

function categories(state = {}, action) {
  console.log("reducer->categories", state, action);
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

export default combineReducers( {
  categories
} )

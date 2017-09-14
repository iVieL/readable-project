export const GET_CATEGORIES = 'GET_CATEGORIES'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const LOGIN = 'LOGIN'
export const POSTS = 'POSTS'

export function getCategories( { categories } ) {
  return {
    type: GET_CATEGORIES,
    categories: categories
  }
}

export function session( { user, loggedIn }) {
  return {
    type: LOGIN,
    user: user,
    loggedIn: loggedIn
  }
}

export function changeCategory({ categoryName }) {
  return {
    type: CHANGE_CATEGORY,
    filter: categoryName
  }
}

export function posts( { posts, filterCategory } ) {
  return {
    type: POSTS,
    posts: posts,
    filter: filterCategory
  }
}

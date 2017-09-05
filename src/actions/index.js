export const GET_CATEGORIES = 'GET_CATEGORIES'
export const LOGIN = 'LOGIN'
export const POSTS = 'POSTS'
//export const POSTS_BY_CATEGORY = 'POSTS_BY_CATEGORY'

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

export function posts( posts ) {
  return {
    type: POSTS,
    posts: posts
  }
}
